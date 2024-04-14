import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./Spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
  _id,
  productName: existingProductName,
  description: existingDescription,
  price: exisitingPrice,
  images: existingImages,
  category: existingCategory,
  pages: existingPages,
  file: existingFile,
}) {
  const [productName, setProductName] = useState(existingProductName || "");
  const [description, setDescription] = useState(existingDescription || "");

  const [category, setCategory] = useState(existingCategory || "");

  const [price, setPrice] = useState(exisitingPrice || "");
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(existingFile || []);

  const [pages, setPages] = useState(existingPages || 0);

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  async function saveNewProduct(ev) {
    ev.preventDefault();
    const data = {
      productName,
      description,
      price,
      images,
      category,
      file,
      pages,
    };
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
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("/api/upload", data);
      setImages((oldImages) => {
        return [...oldImages, ...res.data.links];
      });
      setIsUploading(false);
    }
  }
  
  async function uploadFiles(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      let uploadedFiles = [];
      for (let i = 0; i < files.length; i++) {
        const data = new FormData();
        data.append("file", files[i]);
        const res = await axios.post("/api/upload", data);
        uploadedFiles.push({ name: files[i].name, url: res.data.links[0] });
      }
      setFile((oldFiles) => [...oldFiles, ...uploadedFiles]);
    }
  }
  
  
  function updateImagesOrder(images) {
    setImages(images);
  }
  function removeImage(index) {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
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
      <label>Додати категорію</label>
      <select value={category} onChange={(ev) => setCategory(ev.target.value)}>
        <option value="">Виберіть категорію</option>
        {categories.length > 0 &&
          categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.categoryName}
            </option>
          ))}
      </select>

      {/* Показуємо вибрану категорію */}
      {category && (
        <div>
          <label>
            Вибрана категорія:{" "}
            <b>
              {categories.find((cat) => cat._id === category)?.categoryName}
            </b>
          </label>
        </div>
      )}

      <div>
        <label>
          Введіть кількість <b>(cторінок / слайдів)</b>
        </label>
        <input
          type="number"
          placeholder="Введіть кількість сторінок /  слайдів"
          value={pages}
          onChange={(ev) => setPages(ev.target.value)}
        ></input>
      </div>
      <div className="flex gap-1 flex-col">
        <label>Завантажити файл</label>
        <input type="file" onChange={uploadFiles} />
        {/* Відобразити список імен файлів */}
        {file.length > 0 ? (
          <div>
            <label>Вибрані файли:</label>
            <ul>
              {file.map((uploadedFile, index) => (
                <li key={index}>{uploadedFile.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>Файл не вибрано</div>
        )}
      </div>
      <label>Фото</label>
      <div className="mt-2 mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          className="flex flex-wrap"
          setList={updateImagesOrder}
        >
          {images?.length > 0 &&
            images.map((link, index) => (
              <div key={link} className="inline-block h-24 relative">
                <img src={link} alt="" className="rounded-lg" />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full "
                  onClick={() => removeImage(index)}
                >
                  X
                </button>
              </div>
            ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner>Завантажуємо..</Spinner>
          </div>
        )}
        <label className="w-32 h-32 cursor-pointer border flex flex-col items-center justify-center text-sm gap-1 rounded-lg bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
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
