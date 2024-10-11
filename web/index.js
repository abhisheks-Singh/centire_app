// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import PrivacyWebhookHandlers from "./privacy.js";

const PORT = parseInt( 
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);
app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: PrivacyWebhookHandlers })
);

// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(express.json());

app.get("/api/products/all", async (_req, res) => {
  const allProducts = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(allProducts);
});

// app.get("/api/products/all", async (_req, res) => {
//   const allProducts = await shopify.api.rest.Product.all({
//     session: res.locals.shopify.session,
//   });
//   res.status(200).send(allProducts);
// });

app.get("/api/products/count", async (_req, res) => {
  const productsCount = await shopify.api.rest.Product.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(productsCount);
})

app.get("/api/shop/all", async (_req, res) => {
  const store_data = await shopify.api.rest.Shop.all({
    session: res.locals.shopify.session,
  });
  res.status(200).send(store_data);
}) 

app.get("/api/custom_collections/all", async (_req, res) => {
  try {
    const collections_Data = await shopify.api.rest.CustomCollection.all({
      session: res.locals.shopify.session,
    });
    res.status(200).send(collections_Data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch collections' });
  }
});


// get customers data 
app.get("/api/customers", async (_req, res) => {
  try {
    const customers_data = await shopify.api.rest.Customers.all({ 
      session: res.locals.shopify.session,
    });
    res.status(200).send(customers_data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch customers' }); 
  }
});

// get Orders data 
app.get("/api/orders/all", async (_req, res) => {
  try {
    const orders_data = await shopify.api.rest.Customer.all({ 
      session: res.locals.shopify.session,
    });
    res.status(200).send(orders_data);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch customers' }); 
  }
});




app.get("/api/products/count", async (_req, res) => {
  const client = new shopify.api.clients.Graphql({
    session: res.locals.shopify.session,
  });

  const countData = await client.request(`
    query shopifyProductCount {
      productsCount {
        count
      }
    }
  `);

  res.status(200).send({ count: countData.data.productsCount.count });
});

app.post("/api/products", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});

app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(
      readFileSync(join(STATIC_PATH, "index.html"))
        .toString()
        .replace("%VITE_SHOPIFY_API_KEY%", process.env.SHOPIFY_API_KEY || "")
    );
});

app.listen(PORT);
