import React, { useEffect } from 'react';
import './App.css';
import Main from './components/Main/Main';
import LoginPage from './components/LoginPage/LoginPage';
import {users} from './store/Users/Users';
import {Redirect, Switch, Route} from 'react-router-dom';
import {LoginContextProvider, UserContextProvider} from './customHooks/useLogin'; 
import WarningModal from './components/WarningModal/WarningModal';

function App() {
  useEffect(() => {
    users.fetchUsers();
  }, []);

  return (
    <LoginContextProvider>
      <UserContextProvider>
        <div className="App">
          <Switch>
            <Route path='/toDo' component={Main}/>
            <Route path='/login' component={LoginPage}/>
            <Redirect from='/' to='/login'/>
          </Switch>
          <WarningModal/>
        </div>
      </UserContextProvider>
    </LoginContextProvider>
  );
}

export default App;