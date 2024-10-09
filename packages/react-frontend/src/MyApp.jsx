import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

// const characters = [
//   {
//     name: "Charlie",
//     job: "Janitor"
//   },
//   {
//     name: "Mac",
//     job: "Bouncer"
//   },
//   {
//     name: "Dee",
//     job: "Aspring actress"
//   },
//   {
//     name: "Dennis",
//     job: "Bartender"
//   }
// ];

function MyApp() {

  const [characters, setCharacters] = useState([]);

  function fetchUsers(){
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }
  useEffect(() => {
    fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {console.log(error)});
  }, [] );

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
  // function fetchUsersID(){
  //   const promise = fetch("http://localhost:8000/users/:id");
  //   return promise;
  // }
  // useEffect(() => {
  //   fetchUsersID()
  //           .then((res) => res.json())
  //           .then((json) => setCharacters(json["users_list"]))
  //           .catch((error) => {console.log(error)});
  // })

  function deleteCharacter(index) {
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    setCharacters(updated);
  }

  function removeOneCharacter(id) {
    console.log(id);
    const promise = fetch(`Http://localhost:8000/users/${id}`, {
      method: "DELETE",
    });
    return promise
  }

  function updateList(person) {
    postUser(person)
          .then((response) => {
            if (response.status == 201){
              setCharacters([...characters, person]);
            }
            else{
              console.log("Enter name and job.")
            }
          })
          .catch((error) => {
            console.log(error);
          })
  }

  function handleDelete(index, id){
    removeOneCharacter(id)
          .then((response) => {
            if (response.status === 204){
              deleteCharacter(index);
            }
            else{
              console.log("User not found.")
            }
          })
          .catch((error) => {
            console.log(error);
          })
  }

    return (
      <div className="container">
        <Table 
        characterData={characters}
        removeCharacter={handleDelete}
        />
        <Form handleSubmit={updateList} />
      </div>
    );

  }
  
  export default MyApp;