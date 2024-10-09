import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

app.use(cors());

app.use(express.json());

const addUser = (user) => {
  users["users_list"].push(user);
  let genID = Math.floor(Math.random() * 100000);
  user["id"] = "" + genID.toString();
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  if (userToAdd.name == "" && userToAdd.job == ""){
    res.status(204).send("Enter name and job.")
  }
  else{
    addUser(userToAdd);
    res.status(201).send(userToAdd);
  }
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserByJob = (job) => {
  return users["users_list"].filter(
  (user) => user["job"] === job
  );
}

const queryUser = (qryName, qryJob) => {
  return users["users_list"].filter(
    (user) => user["name"] === qryName && user["job"] === qryJob
  );
}

app.get("/users", (req, res) => {
  const {name, job} = req.query;
  if (name != undefined && job == undefined){
    let result = findUserByName(name);
    res.send(result);
  }
  if (name == undefined && job != undefined){
    let result = findUserByJob(job);
    res.send(result);
  }
  if (name != undefined && job != undefined){
    const findUser = queryUser(name, job);
    if (findUser) {
      let result = queryUser(name, job);
      result = { users_list: result };
      res.send(result);}
  } 
  else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let userToDelete = findUserById(id)
  if (userToDelete === undefined){
    res.status(404).send("User not found.")
  }
  let index = users["users_list"].indexOf(userToDelete)
  if ( index != -1){
    users["users_list"].splice(index, 1)
    res.status(204)
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});
