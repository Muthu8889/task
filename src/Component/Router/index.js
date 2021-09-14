import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import AddUser from "../../Page/User/AddUser";
import UserList from "../../Page/User/UserList";
import CreateTask from "../../Page/Task/CreateTask";
import TaskList from "../../Page/Task/TaskList";
import SideNav from "../Navbar";

const AppRouter = () => {
  return (
    <div style={style}>
      <Router>
        <SideNav />
        <Switch>
          <Route path="/" exact component={UserList} />
          <Route path="/add-user" exact component={AddUser} />
          <Route path="/create-task" exact component={CreateTask} />
          <Route path="/task-list" exact component={TaskList} />
        </Switch>
      </Router>
    </div>
  );
};

const style = {
  marginTop: "20px",
};

export default AppRouter;
