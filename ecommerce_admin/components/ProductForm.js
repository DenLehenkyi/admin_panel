import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function ProductForm({
  _id,
  productName: existingProductName,
  description: existingDescription,
  price: exisitingPrice,
  images,
}) {
  const [productName, setProductName] = useState(existingProductName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(exisitingPrice || "");
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveNewProduct(ev) {
    ev.preventDefault();
    const data = { productName, description, price };
    if (_id) {
      await axios.put("/api/products", { ...data, _id });
    } else {
      await axios.post("/api/products", data);
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
  }
  async function uploadImages(ev) {
    const files = ev.target?.files;
    if (files?.length > 0) {
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      await fetch("/api/upload", {
        method: "POST",
        body: data,
      });
    }
  }

  return (
    <form onSubmit={saveNewProduct}>
      <label>Назва товару</label>
      <input
        type="text"
        placeholder="Введіть назву товару"
        value={productName}
        onChange={(ev) => setProductName(ev.target.value)}
      />
      <label>Фото</label>
      <div className="mt-2 mb-2">
        <label className="w-32 h-32 cursor-pointer border flex flex-col items-center justify-center text-sm gap-1 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>
          <div>Upload</div>
          <input type="file" onChange={uploadImages} className="hidden" />
        </label>

        {!images?.length && <div>Не було додано фото для цього матеріалу.</div>}
      </div>

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
