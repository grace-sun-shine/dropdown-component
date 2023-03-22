import './App.css';
import Dropdown from './components/Dropdown';

function App() {
  const option1 = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard'];
  const option2 = ['Twenty', "Twenty one", "Twenty one and a half"]

  const generateRandomNames = (length) => {
    const names = [];
    for (let i = 0; i < length; i++) {
      names.push(`Name${i}`);
    }
    return names;
  }

  const options = generateRandomNames(100000);

  return (
    <div className='container'>
      <h1>Hive Frontend Engineer Challenge</h1>
      <h2>Dropdown component</h2>
      <div className="display">
        <h2>Basic:</h2>
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={option1}
              isMulti={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
            />
            <h3>Single Selection</h3>
            <Dropdown
              options={option2}
              isMulti={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
            />
            </div>
        </div>

      <div className="display">
        <h2>Search:</h2>
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={option1}
              isMulti={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
              search={true}
              placeholder='Select names'
            />
            <h3>Single Selection</h3>
            <Dropdown
              options={option2}
              isMulti={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
              search = {true}
              placeholder='Age'
            />
          </div>
      </div>

      <div className="display">
        <h2>Search with large list(100k items):</h2>
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={options}
              isMulti={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
              search={true}
            />
            <h3>Single Selection</h3>
            <Dropdown
              options={options}
              isMulti={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
              search = {true}
            />
          </div>
      </div>

    </div>
  );
}

export default App;
