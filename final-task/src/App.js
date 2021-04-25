import { useEffect } from 'react';
import './App.css';
import Main from './components/Main/Main';
import {useAPI} from './customHooks/useAPI';
import {users} from './store/Users/Users';

function App() {
  const api = useAPI();
  useEffect(() => {
    users.fetchUsers();
    console.log(Math.round(Math.random() * 5));
  }, [users.users]);
  
  
  function displayUsers() {
    for (const user of users.users) {
      console.log(user);
    }
  }

  return (
    <div className="App">
      <Main/>
      {displayUsers()}
    </div>
  );
}

export default App;
