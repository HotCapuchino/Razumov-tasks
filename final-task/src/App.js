import React, { useEffect } from 'react';
import './App.css';
import Main from './components/Main/Main';
import {users} from './store/Users/Users';

let userNumber = React.createContext(Math.ceil(Math.random() * 12));

function App() {
  useEffect(() => {
    users.fetchUsers();
  }, []);

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
export {userNumber};