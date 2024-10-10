import React, { useEffect, useState } from 'react';
import { Layout, LegacyCard } from "@shopify/polaris";

export function OrderGraphs() {
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, collectionResponse] = await Promise.all([
          fetch("/api/products/all", { method: "GET", headers: { "Content-Type": "application/json" } }),
          fetch("/api/custom_collections/all", { method: "GET", headers: { "Content-Type": "application/json" } })
        ]);

        const productsData = await productResponse.json();
        const collectionsData = await collectionResponse.json();

        setProducts(productsData.data || []);
        setCollections(collectionsData.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const totalProducts = products.length;
  const draftProducts = products.filter(product => product.status === "draft").length;
  const totalCollections = collections.length;

  return (
    <Layout>
      <Layout.Section oneHalf>
        <LegacyCard title="Total Products" sectioned>
          <p>{totalProducts || "No data available for products."}</p>
        </LegacyCard>
      </Layout.Section>
      <Layout.Section oneThird>
        <LegacyCard title="Draft Products" sectioned>
          <p>{draftProducts || "No data available for draft products."}</p>
        </LegacyCard>
      </Layout.Section>
      <Layout.Section oneThird>
        <LegacyCard title="Total Collections" sectioned>
          <p>{totalCollections || "No data available for collections."}</p>
        </LegacyCard>
      </Layout.Section>
    </Layout>
  );
}
