import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, []);

  function fetchOrders() {
    axios
      .get("/api/orders")
      .then((response) => {
        setAllOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }

  function fetchProducts() {
    axios
      .get("/api/products")
      .then((response) => {
        setAllProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  return (
    <Layout>
      <h1 className="text-gray-800 mb-4 text-lg">Всі замовлення</h1>
      <table className="basic">
        <thead>
          <tr>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">№</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Order ID</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Дата створення</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Загальна ціна</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Статус</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">Назва товару</th>
            <th className="text-sm text-gray-600 uppercase border-b border-gray-200 px-4 py-2">User ID</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order, index) => (
            <tr key={order._id}>
              <td className="px-4 py-1 border border-gray-200">{index + 1}</td>
              <td className="px-4 py-1 border border-gray-200">{order._id}</td>
              <td className="px-4 py-1 border border-gray-200">{order.createdAt}</td>
              <td className="px-4 py-1 border border-gray-200">{order.totalPrice}</td>
              <td className="px-4 py-1 border border-gray-200">{order.status}</td>
              <td className="px-4 py-1 border border-gray-200">
                {order.products.map((productId) => {
                  const product = allProducts.find(
                    (product) => product._id === productId
                  );
                  return product ? product.productName : "Unknown Product";
                })}
              </td>
              <td className="px-4 py-1 border border-gray-200">{order.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-gray-800 mt-4">Загальна кількість замовлень: {allOrders.length}</h2>
    </Layout>
  );
}
