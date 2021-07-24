import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {TasksRoom} from "./Pages/TasksRoom" 
import {HomePage} from "./Pages/HomePage"
import {ManageRooms} from "./Pages/ManageRooms"


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/rooms" component={ManageRooms} />
          <Route path="/rooms/:room/tasks" component={TasksRoom}/>
        </Switch>
      </Router>
  );
}

export default App;
