import './App.css';
import StatsBlock from './components/StatsBlock/StatsBlock';
import ButtonsBlock from './components/ButtonsBlock/ButtonsBlock';

function App() {
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
