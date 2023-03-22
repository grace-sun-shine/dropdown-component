# Frontend Engineer Challenge

This project contains the dropdown component. 

Here is the instruction on how to run my project:

1.  Run `npm install` to install the packages
2.  Run `npm start` to start the application, which displayed some usages of the dropdown component
3. `src/App.js` displayed some usage of the dropdown component
4. `src/components/Dropdown.js` includes the code of the dropdown component

## Dropdown Component:

The component supports both single selected option and multi selected options. The component also support large lists rendering. 

### Basic Usage:
```js
import Dropdown from './components/Dropdown';

const option1 = ['Oliver Hansen', 'Van Henry', 'April Tucker', 'Ralph Hubbard'];

<Dropdown
    options={option1}
    isMulti={true}
    onSelect={(selectedItems) => console.log(selectedItems)}
    />
```
### Props:

The Dropdown component accepts the following props:

| Prop        | Type            | Default            | Description                                         |
|-------------|-----------------|--------------------|-----------------------------------------------------|
| options     | array           | []                 | dropdown options                                    |
| isMulti    | bool            | false              | `true` for multi-select, `false`  for single-select |
| onSelect    | function        | func               | callback function                                   |
| value       | array or string | multiple ? '' :[]  | initial selected value(s)                           |
| placeholder | string          | 'Select option(s)' | placeholder text                                    |
| search      | bool            | false              | `true` to enable search function                    |

