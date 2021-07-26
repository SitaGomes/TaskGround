import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import {HomePage} from "./Pages/HomePage"
import {Dashboard} from "./Pages/Dashboard"
import {TasksRoom} from "./Pages/TasksRoom" 

import { ProtectedRoute } from "./Routes/ProtectedRoute"

import { useAuth } from "./Hooks/useAuth"

function App() {

  const {isAuth} = useAuth()
  
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <ProtectedRoute exact path="/rooms" component={Dashboard} isAuth={isAuth}/>
          <ProtectedRoute path="/rooms/:id" component={TasksRoom} isAuth={isAuth}/>
        </Switch>
      </Router>      
  );
}

export default App;
