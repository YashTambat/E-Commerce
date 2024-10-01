import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.warn("params : ", params);
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn("params in getproduct details : ", params);
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${params.id}`,
      {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const updateProduct = async () => {
    console.warn(name, price, company, category);
    let result = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/product/${params.id}`,
      {
        method: "Put",
        body: JSON.stringify({ name, price, company, category }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      }
    );
    result = await result.json();
    console.warn("udpated result = ", result);
    navigate("/");
  };

  return (
    <div className="product">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        placeholder="enter product name"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
        placeholder="enter product price"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
        placeholder="enter product category"
      />

      <input
        type="text"
        className="inputBox"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
        placeholder="enter product company"
      />

      <button type="button" onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};
export default UpdateProduct;
