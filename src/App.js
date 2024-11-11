import React, { useState, useEffect } from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [invites, setInvites] = useState([]);

  useEffect(() => {
    fetch(`https://reqres.in/api/users`)
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("error user");
      })
      .finally(() => setLoading(false));
  }, []);

  const onChangeSearchValue = (evt) => {
    setSearchValue(evt.target.value);
  };

  return (
    <div className="App">
      <Users
        items={users}
        isLoading={isLoading}
        searchValue={searchValue}
        onChangeSearchValue={onChangeSearchValue}
      />
      {/* <Success /> */}
    </div>
  );
}

export default App;
