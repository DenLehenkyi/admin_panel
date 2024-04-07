import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
export default function ProductForm() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function createProduct(ev) {
    ev.preventDefault();
    const data = { productName, description, price };
    axios.post("/api/products", data);
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  return (
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
  );
}
