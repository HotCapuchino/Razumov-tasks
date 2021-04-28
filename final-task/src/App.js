import { useEffect } from 'react';
import './App.css';
import Main from './components/Main/Main';
// import {useAPI} from './customHooks/useAPI';
import {users} from './store/Users/Users';

function App() {
  useEffect(() => {
    users.fetchUsers();
    // console.log(Math.round(Math.random() * 5));
  }, []);

  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
