import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {TasksRoom} from "./Pages/TasksRoom" 
import {HomePage} from "./Pages/HomePage"

import { ProtectedRoute } from "./Routes/ProtectedRoute"

import { useAuth } from "./Hooks/useAuth"

function App() {

  const {isAuth} = useAuth()
  
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
