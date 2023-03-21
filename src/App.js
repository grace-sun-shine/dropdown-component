import './App.css';
import Dropdown from './components/Dropdown';

function App() {
  // const options = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'twenty'];

  // write a function to generate random names with given length
  const generateRandomNames = (length) => {
    const names = [];
    for (let i = 0; i < length; i++) {
      names.push(`Name ${i}`);
    }
    return names;
  }

  const options = generateRandomNames(10);

  return (
    <div className='App'>
      <h1>Hive Frontend Engineer Challenge</h1>
      <div className="display">
        <h2>Multiple Selection Dropdown</h2>
        <Dropdown options={options} multiple={true} onSelect={(selectedItems) => console.log(selectedItems)}/>
        <h2>Single Selection Dropdown</h2>
        <Dropdown options={options} multiple={false} onSelect={(selectedItem) => console.log(selectedItem)}/>
      </div>
    </div>
  );
}

export default App;
