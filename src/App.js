import './App.css';
import Dropdown from './components/Dropdown';

function App() {
  const option1 = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard', 'Omar Alexander', 'Carlos Abbott', 'Miriam Wagner', 'Bradley Wilkerson', 'Virginia Andrews', 'Kelly Snyder'];
  const option2 = ['Twenty', "Twenty one", "Twenty one and a half and a half and a half"]
  const defaultOption1 = [option1[0], option1[2]];
  // write a function to generate random names with given length
  const generateRandomNames = (length) => {
    const names = [];
    for (let i = 0; i < length; i++) {
      names.push(`Name ${i}`);
    }
    return names;
  }

  const options = generateRandomNames(100);

  return (
    <div className='container'>
      <h1>Hive Frontend Engineer Challenge</h1>
      <h2>Dropdown component</h2>
      <div className="display">
        <h2>Basic:</h2>
        <div className="row">
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={option1}
              multiple={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
            />
          </div>
          <div className='column'>
            <h3>Single Selection</h3>
            <Dropdown
              options={options}
              multiple={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
            />
          </div>
        </div>
      </div>

      <div className="display">
        <h2>Basic with placeholder and value:</h2>
        <div className="row">
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={option1}
              multiple={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
              value={defaultOption1}
              placeholder="Select some names"
            />
          </div>
          <div className='column'>
            <h3>Single Selection</h3>
            <Dropdown
              options={option2}
              multiple={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
              value={option2[1]}
              placeholder="Age"
            />
          </div>
        </div>
      </div>

      <div className="display">
        <h2>Search:</h2>
        <div className="row">
          <div className='column'>
            <h3>Multiple Selection</h3>
            <Dropdown
              options={option1}
              multiple={true}
              onSelect={(selectedItems) => console.log(selectedItems)}
              search={true}
            />
          </div>
          <div className='column'>
            <h3>Single Selection</h3>
            <Dropdown
              options={options}
              multiple={false}
              onSelect={(selectedItem) => console.log(selectedItem)}
              search = {true}
            />
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
