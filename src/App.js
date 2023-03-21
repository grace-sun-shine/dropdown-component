import './App.css';
import Dropdown from './components/Dropdown';

function App() {
  const options = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard'];

  return (
    <div className='App'>
      <h1>Hive Frontend Engineer Challenge</h1>
      <div className="display">
        <h2>Multiple Selection Dropdown</h2>
        <Dropdown options={options} multiple={true} onSelect={(selected) => console.log(selected)}/>
        <h2>Single Selection Dropdown</h2>
        <Dropdown options={options} multiple={false} onSelect={(selected) => console.log(selected)}/>
      </div>
    </div>
  );
}

export default App;
