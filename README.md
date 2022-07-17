## React Datatable Library with sort, search & pagination
### Features
- Select amount of entries per page
- Search functionality with suggestions and highlighting of matches in table
- Sort table by original model property, with optional reverse order
- Mock data list to play around

<p align="center">
    <img src="./public/img/Screenshot 2022-01-08 at 18.35.22.png">
</p>

### Stack
- ReactJs ( >= 17.0.0 )
- Styled Components

### Dependencies


---
### Installation
`npm i react-datatable-search-pagination`

---
### Customization
---
- ENTRIES OPTION: array of number
    - How many entries per page to display
    - if not defined will default to [15, 30, 50]

- TABLEHEAD: array of strings
    - The properties of the objects from your data array you want to use in the datatable header
    - if not defined will default to mock objects properties:
[ 'firstName', 'lastName', 'dob', 'startDate', 'street', 'city', 'state', 'zipcode', 'department']


- DATASRC: array of objects : The data to feed the datatable
    - if not defined will default to mockdata json to feed the datatable
    - if your data object model contains properties that are objects themselves, the default behavior is currently to use the first property of this object
    => example :  
    ```bash
    my data object:
    {   
        address : 'abcd street 876',
        state: { name: 'xy', abbreviation: 'z' } ===> datatable will only display the state name
    } 
    ```
    
- More customization to come
    - Date formatting: currently defaults to 'MM/DD/YY'
    - Tests
    - Styling

---
### USE
```bash
import { Datatable } from  'react-datatable-search-pagination' 

function App() {

// CUSTOM VALUES EXAMPLE
const mytableHead = [ 'name', 'show', 'motto', ]
const mydataSrc = [
    {
        name: 'peter griffin',
        show: 'family guy',
        motto: 'bird is the word'
    },
    {
        name: 'saul goodman',
        show: 'better call saul',
        motto: 'its all good, man'
    },
    {
        name: 'bojack horseman',
        show: 'bojack horseman',
        motto: 'help me, help you!'
    }
]
 

return (
    <div className="App">
        <Datatable
            tableHead={mytableHead}
            dataSrc={mydataSrc}
        />
    </div>
);
}
export default App;
```




