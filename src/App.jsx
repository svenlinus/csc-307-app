// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";
import "./App.css";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  function removeOneCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    deletetUser(updated)
      .then(() => setCharacters(updated));
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    return promise;
  }

  function deletetUser(updated) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updated),
    });
    return promise;
  }

  function updateList(person) { 
    postUser(person)
      .then(response => response.json())
      .then((val) => setCharacters([...characters, val]))
      .catch((error) => {
        console.log(error);
      })
  }
  
  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;