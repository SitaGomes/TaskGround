import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import {TasksRoom} from "./Pages/TasksRoom" 
import {HomePage} from "./Pages/HomePage"

import {AuthContextProvider as AuthProvider} from "./Context/AuthContext"


function App() {
  return (
    <AuthProvider>

      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/rooms" component={TasksRoom}/>
        </Switch>
      </Router>
      
    </AuthProvider>
  );
}

export default App;
