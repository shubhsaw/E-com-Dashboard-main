import React, { useEffect, useState } from "react";
import styles from "./UpdateProduct.module.css";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params=useParams();
  const navigate= useNavigate();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    company: "",
    desc: "",
    rating: ""
  });
  useEffect(() => {
    fetchProductDetails();
  }, []);

  function fetchProductDetails() {
    fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      }); 
  }

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Updated Product:", product);
    alert("Product Updated ");
  };

  async function updateproductFunc(){
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method: 'put',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    // console.log(result);
    navigate('/Products');
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        
        <div className={styles.field}>
          <label className={styles.label}>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Company Name:</label>
          <input
            type="text"
            name="company"
            value={product.company}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description:</label>
          <textarea
            name="desc"
            value={product.desc}
            onChange={handleChange}
            className={styles.textarea}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Rating:</label>
          <input
            type="number"
            min="1"
            max="5"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.btn} onClick={updateproductFunc}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
