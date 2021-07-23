import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {TasksRoom} from "./Pages/TasksRoom" 


function App() {
  return (
      <Router>
        <Switch>
          <Route path="/rooms/:room/tasks/:task" component={TasksRoom}/>
        </Switch>
      </Router>
  );
}

export default App;
