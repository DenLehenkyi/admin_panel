import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

export default function ProductForm({
    _id,
    productName:existingProductName, 
    description:existingDescription,
    price:exisitingPrice,
}
) 
{
  const [productName, setProductName] = useState(existingProductName || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [price, setPrice] = useState(exisitingPrice || '');
  const [goToProducts, setGoToProducts] = useState(false);
  const router = useRouter();

  async function saveNewProduct(ev) {
    ev.preventDefault();
    const data = { productName, description, price };
    if(_id){
        await axios.put("/api/products", {...data,_id})
    }
    else{

    await axios.post("/api/products", data);

    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push("/products");
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
