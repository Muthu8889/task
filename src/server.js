import { createServer } from "miragejs";

let users = [
  { id: 1, lastName: "Snow", firstName: "Jon" },
  { id: 2, lastName: "Lannister", firstName: "Cersei" },
  { id: 3, lastName: "Lannister", firstName: "Jaime" },
  { id: 4, lastName: "Stark", firstName: "Arya" },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys" },
  { id: 6, lastName: "Melisandre", firstName: null },
  { id: 7, lastName: "Clifford", firstName: "Ferrara" },
  { id: 8, lastName: "Frances", firstName: "Rossini" },
  { id: 9, lastName: "Roxie", firstName: "Harvey" },
];

let task = [
  {
    id: 1,
    userId: 1,
    lastName: "Snow",
    firstName: "Jon",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 2,
    userId: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 3,
    userId: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 4,
    userId: 4,
    lastName: "Stark",
    firstName: "Arya",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 5,
    userId: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 6,
    userId: 6,
    lastName: "Melisandre",
    firstName: null,
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
  {
    id: 7,
    userId: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    taskName: "Task 1",
    taskDesc: "Task Desc 2",
  },
];

createServer({
  routes() {
    this.namespace = "api";
    this.get("/users", () => {
      return {
        users: users,
      };
    });
    this.post("/addUser", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      users.push(attrs);
      return {
        users: users,
        message: "Saved Sucessfully",
      };
    });
    this.post("/editUser", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      users = attrs;
      return {
        users: users,
        message: "Saved Sucessfully",
      };
    });
    this.get("/task", () => {
      return {
        task: task,
      };
    });
    this.post("/addTask", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      task.push(attrs);
      return {
        task: task,
        message: "Saved Sucessfully",
      };
    });
    this.post("/editTask", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      task = attrs;
      return {
        task: task,
        message: "Saved Sucessfully",
      };
    });
    this.post("/deleteTask", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      let newTask = task.filter((el) => {
        return !attrs.find((element) => {
          return element.id === el.id;
        });
      });
      return {
        task: newTask,
        message: "Deleted Sucessfully",
      };
    });
  },
});
