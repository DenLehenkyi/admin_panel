import Layout from "@/components/Layout";
import axios from "axios";
import React, { useState } from "react";

export default function NewProduct() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { productName, description, price };
    axios.post('/api/products', data);
  }

  return (
    <Layout>
      <form onSubmit={createProduct}>
        <h1>Додати новий товар</h1>
        <label>Назва товару</label>
        <input
          type="text"
          placeholder="Введіть назву товару"
          value={productName}
          onChange={(ev) => setProductName(ev.target.value)}
        />
        <label>Опис</label>
        <textarea
          placeholder="Введіть опис"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <label>Ціна</label>
        <input
          type="number"
          placeholder="Введіть ціну"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Зберегти товар
        </button>
      </form>
    </Layout>
  );
}
