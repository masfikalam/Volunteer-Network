import React, {useState, createContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import MyRegs from './components/MyRegs/MyRegs';
import Admin from './components/Admin/Admin';
import Topbar from './components/Topbar/Topbar';
import Login from './components/Login/Login';
import PrivateRoute from './components/Login/PrivateRoute';
export const UserContext = createContext();

function App() {
  const defaultUser = {
    signed: false,
    name: '',
    email: '',
    photo: '',
    message: ''
  }
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <Router>
        <Topbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <PrivateRoute path="/my-registrations">
            <MyRegs />
          </PrivateRoute>
          <PrivateRoute path="/register/:eventName">
            <Register />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
