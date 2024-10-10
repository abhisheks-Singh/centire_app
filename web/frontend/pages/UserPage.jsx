import React, { useEffect, useState } from 'react';
import './UserPage.css'; // Import the CSS file for styling

export function UserPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/all", {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data.data); // Set the data array from the response
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="user-page">
      <h1>Order Page</h1>
      {error && <p className="error-message">Error fetching orders: {error}</p>}
      {orders.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Currency</th>
              <th>Created At</th>
              <th>Total Spent</th>
              <th>Orders Count</th>
              <th>Country</th>
              <th>Verified Email</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.currency}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>{order.total_spent}</td>
                <td>{order.orders_count}</td>
                <td>{order.default_address?.country || "N/A"}</td>
                <td>{order.verified_email ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No orders available.</p>
      )}
    </div>
  );
}
