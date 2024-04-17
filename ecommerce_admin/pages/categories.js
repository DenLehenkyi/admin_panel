import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';
import Link from "next/link";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [categoryName, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCategory, setParentCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [editedSubCategory, setEditedSubCategory] = useState(null);
  const [subCategoryName, setSubName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubCategories();
  }, []);


  function fetchCategories() {
    axios
      .get("/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  function fetchSubCategories() {
    axios
      .get("/api/subcategories")
      .then((response) => {
        setSubCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subcategories:", error);
      });
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      categoryName
    };
    if (editedCategory) {
      data._id = editedCategory._id;
      await axios.put('/api/categories', data);
      setEditedCategory(null);
    } else {
      await axios.post('/api/categories', data);
    }
    setName('');
    fetchCategories();
  }

  async function saveSubCategory(ev) {
    ev.preventDefault();
    const data = {
      subCategoryName,
      parentCategory,
    };
    if (editedSubCategory) {
      data._id = editedSubCategory._id;
      await axios.put('/api/subcategories', data);
      setEditedSubCategory(null);
    } else {
      await axios.post('/api/subcategories', data);
    }
    setSubName('');
    setParentCategory('');
    fetchSubCategories();
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.categoryName);
  }

  function editSubCategory(subcategory) {
    setEditedSubCategory(subcategory);
    setSubName(subcategory.subCategoryName);
  }

  function deleteCategory(category) {
    swal.fire({
      title: 'Ви впевнені?',
      text: `Що ви хочете видалити категорію -  ${category.categoryName}?`,
      showCancelButton: true,
      cancelButtonText: 'Скасувати',
      confirmButtonText: 'Так, Видалити!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { _id } = category;
        await axios.delete('/api/categories?_id=' + _id);
        fetchCategories();
      }
    });
  }

  function deleteSubCategory(subcategory) {
    swal.fire({
      title: 'Ви впевнені?',
      text: `Що ви хочете видалити категорію -  ${subcategory.subCategoryName}?`,
      showCancelButton: true,
      cancelButtonText: 'Скасувати',
      confirmButtonText: 'Так, Видалити!',
      confirmButtonColor: '#d55',
      reverseButtons: true,
    }).then(async result => {
      if (result.isConfirmed) {
        const { _id } = subcategory;
        await axios.delete('/api/subcategories?_id=' + _id);
        fetchSubCategories();
      }
    });
  }

  return (
    <Layout>
      <h1>Категорії</h1>
      <label>
        {editedCategory ?
          `Редагувати категорії ${editedCategory.categoryName}` :
          'Створити нову категорію'}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Назва категорії"}
            onChange={(ev) => setName(ev.target.value)}
            value={categoryName}
          ></input>

        </div>
        
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
              }}
              className="btn-default">Скасувати</button>
          )}
          <button type="submit"
            className="btn-primary py-1">
            Зберегти
          </button>
        </div>
      </form>
      <table className="basic mt-4">
  <thead>
    <tr>
      <td >Категорії</td>
      <td>Дії</td>
    </tr>
  </thead>
  <tbody>
    {categories.length > 0 &&
      categories.map((category) => (
        <tr key={category._id}>
          <td style={{ width: '20px' }}>{category.categoryName}</td>
          <td style={{ width: '20px' }}>
            <button
              onClick={() => editCategory(category)}
              className="btn-default mr-3"
            >
              Редагувати
            </button>
            <button
              onClick={() => deleteCategory(category)}
              className="btn-red"
            >
              Видалити
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>
<br></br>
<h1>Підкатегорії</h1>
      <label>
        {editedSubCategory ?
          `Редагувати категорії ${editedSubCategory.subCategoryName}` :
          'Створити нову підкатегорію'}
      </label>
      <form onSubmit={saveSubCategory}>
        <div className="flex-column gap-1">
          <input
            type="text"
            placeholder={"Назва підкатегорії"}
            onChange={(ev) => setSubName(ev.target.value)}
            value={subCategoryName}
          ></input>
          <br></br>


          <select 
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >

            <option value=''  disabled hidden>Вибрати основну категорію</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
          </select>


          
        </div>
        
        <div className="flex gap-1">
          {editedSubCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedSubCategory(null);
                setSubName('');
              }}
              className="btn-default">Скасувати</button>
          )}
          <button type="submit"
            className="btn-primary py-1">
            Зберегти
          </button>
        </div>
      </form>


      {!editedCategory && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Підкатегорія</td>
              <td>Основна категорія</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {subcategories.length > 0 &&
              subcategories.map((subcategory) => (
                <tr key={subcategory._id}>
                  <td>{subcategory.subCategoryName}</td>
                  <td>{subcategory?.parentCategory?.categoryName}</td>
                  <td>
                    <button
                      onClick={() => editSubCategory(subcategory)}
                      className="btn-default mr-3"
                    >
                      Редагувати
                    </button>
                    <button
                      onClick={() => deleteSubCategory(subcategory)}
                      className="btn-red"
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal}></Categories>
));
