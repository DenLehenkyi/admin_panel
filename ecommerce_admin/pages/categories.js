import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import { withSwal } from 'react-sweetalert2';

import Link from "next/link";

function Categories({swal}) {
  const [editedCategory, setEditedCategory] = useState(null);

  const [categoryName, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetchCategories();
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
  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
        categoryName, 
        parentCategory, 
        properties:properties.map(p => ({
          name:p.name, 
          values:p.values.split(','),
        }))
    }
    if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put('/api/categories', data);
        setEditedCategory(null);
      } else {
        await axios.post('/api/categories', data);
      }
      setName('');
      setParentCategory('');
     
      fetchCategories();
    }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.categoryName);
    setParentCategory(category.parentCategory?._id)
    setProperties(
      category.properties.map(({name,values}) => ({
      name,
      values:values.join(',')
    }))
    );
  }
  function deleteCategory(category){
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
        const {_id} = category;
        await axios.delete('/api/categories?_id='+_id);
        fetchCategories();
      }
    });
  }
  function addProperty() {
    setProperties(prev => {
      return [...prev, {name:'',values:''}];
    });
  }
  function handlePropertyNameChange(index,property,newName) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  }
  function handlePropertyValuesChange(index,property,newValues) {
    setProperties(prev => {
      const properties = [...prev];
      properties[index].values = newValues;
      return properties;
    });
  }
  function removeProperty(indexToRemove) {
    setProperties(prev => {
      return [...prev].filter((p,pIndex) => {
        return pIndex !== indexToRemove;
      });
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
        <select
        
          onChange={(ev) => setParentCategory(ev.target.value)}
          value={parentCategory}
        >
          <option value={''}>Немає основної категорії</option>
          {categories.length > 0 &&
            categories.map((category) => (
              // eslint-disable-next-line react/jsx-key
              <option key={category._id} value={category._id}>{category.categoryName}</option>
            ))}
        </select>

        </div>
        <div className="mb-4">
            <label className="block">Властивості</label>
            <button 
            onClick={addProperty}
            type="button" 
            className="btn-default text-sm"
            
            >
            Додати нову властивість
            </button>
            {properties.length > 0 && properties.map((property, index) => (
    // eslint-disable-next-line react/jsx-key
    <div className="flex gap-1" key={index}>
        {/* <input type="text" placeholder="Формат файлу"></input> */}

        <select 
          value={property.name}
          className="mb-0"
          onChange={ev => handlePropertyNameChange(index, property, ev.target.value)}
        >
            <option>
                Презентація (.pptx)
            </option>
            <option>
                Word документ (.docx)
            </option>
            <option>
                PDF документ (.pdf)
            </option>
        </select>
       
        <button
          onClick={() => removeProperty(index)}
          type="button"
          className="btn-red"
        >
          Видалити властивість
        </button>
    </div>
))}

        </div>
        <div>
            
        </div>
        <div className="flex gap-1">
        {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName('');
                setParentCategory('');
                setProperties([]);
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
          {categories.length > 0 &&
            categories.map((category) => (
              // eslint-disable-next-line react/jsx-key
              <tr>
                <td>{category.categoryName}</td>
                <td>{category?.parentCategory?.categoryName}</td>
                <td>
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
      
      )}
          </Layout>
  );
}

export default withSwal(({swal}, ref) => (
    <Categories swal={swal}></Categories>
))
