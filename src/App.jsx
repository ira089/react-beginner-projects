import React, { useState, useEffect } from "react";
import "./index.scss";
import Collection from "./Collection";

function App() {
  const cats = [
    { name: "Все" },
    { name: "Море" },
    { name: "Горы" },
    { name: "Архитектура" },
    { name: "Города" },
  ];
  const [collections, setCollections] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://6737b5d84eb22e24fca5ffb0.mockapi.io/api/v1/fotos?${
        categoryId ? `category=${categoryId}` : ""
      }`
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert(`error while receiving data`);
      })
      .finally(() => setIsLoading(false));
  }, [categoryId]);

  const handleChange = ({ target }) => {
    setSearchValue(target.value.trim());
  };

  const elementCats = cats.map((obj, index) => (
    <li
      onClick={() => setCategoryId(index)}
      className={categoryId === index ? "active" : ""}
      key={obj.name}
    >
      {obj.name}
    </li>
  ));

  const element = collections
    .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
    .map((obj, index) => (
      <Collection key={index} name={obj.name} images={obj.photos} />
    ));

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">{elementCats}</ul>
        <input
          value={searchValue}
          onChange={handleChange}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">{isLoading ? <h2>Loading...</h2> : element}</div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
