import './App.css';
import StatsBlock from './components/StatsBlock/StatsBlock';
import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';
import reducer from './store/reducer';
import {petStat} from './store/state';
import { useReducer, useEffect } from 'react';

function App() {

  const [state, dispatch] = useReducer(reducer, petStat);
  useEffect(() => {
    let intervalID = setInterval(() => {
      dispatch({type: 'time-passes'});
      console.log(state);
      if (state.health.level === 0) {
        clearInterval(intervalID);
        alert('game is over!');
      }
    }, 5000);
    return () => {
      clearInterval(intervalID);
    }
  }, [state.health.level])

  return (
    <div className="App">
      <div className="App__commandsAndControls">
        <StatsBlock />
        <ButtonsBlock />
      </div>
    </div>
  );
}

export default App;
