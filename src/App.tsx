import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {TasksRoom} from "./Pages/TasksRoom" 
import {HomePage} from "./Pages/HomePage"

import { ProtectedRoute } from "./ProtectedRoute"

import { useAuth } from "./Hooks/useAuth"

function App() {

  const {isAuth, user} = useAuth()

  console.log(isAuth)
  
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <ProtectedRoute path="/rooms" component={TasksRoom} isAuth={isAuth}/>
        </Switch>
      </Router>      
  );
}

export default App;
