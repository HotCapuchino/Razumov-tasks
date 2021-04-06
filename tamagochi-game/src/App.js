import './App.scss';
import StatsBlock from './components/StatsBlock/StatsBlock';
import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';
import Logger from './components/Logger/Logger';
import reducer from './store/reducer';
import {petStat} from './store/state';
import { useReducer, useEffect } from 'react';

function App() {

  const [state, dispatch] = useReducer(reducer, petStat);
  useEffect(() => {
    let intervalID = setInterval(() => {
      dispatch({type: 'time-passes'});
      if (state.health.level <= 0) {
        clearInterval(intervalID);
      }
    }, 2000);
    return () => {
      clearInterval(intervalID);
    }
  }, []);

  return (
    <div className="App">
      <h1>Mini Game</h1>
      <div className="App__commandsAndControls">
        <StatsBlock />
        <ButtonsBlock />
      </div>
      <Logger />
    </div>
  );
}

export default App;
