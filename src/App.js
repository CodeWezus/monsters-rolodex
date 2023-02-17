//import { Component } from 'react';
import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list';
import SearchBox from './components/search-box/search-box';
import './App.css';

const App = () => {
  // useState gives us back two values. [value, setValue]
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  // useEffect can be used to create side effects. useEffect will execute a function if the data in the dependency array changes.
  useEffect(() =>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    })

    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    // Set the state using the variable created in useState().
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters"
          className="monsters-searchbox"
        />
        <CardList monsters={filteredMonsters} />
      </div>
  )
}
// class App extends Component {
//   constructor(){
//     // Tells the constructor to call Component, which App extends.
//     super();
//     // State allows us to dynamically change our HTML components based on the values held in it's state.
//     this.state = {
//       // An array of monster names
//       monsters: [],
//       // A search string
//       searchField: ''
//     };
//   }
  
//   // componentDidMount is used to ensure a component is properly rendered onto the page,
//   // here I use it to make an api request which ensures that the app state has the required user data for the H1 components.
//   componentDidMount(){
//     console.log('componentDidMount');
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(() => {
//         return {monsters: users};
//       }
//       ));
//   }

//   // A qucik optimization so that render doesn't create a new anonymous function at each render
//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(() => {
//       return {searchField};
//     });
//   }

//   render(){
//     // Pull off the state and onSearchChange into variables to clean up this.state and this from code.
//     const {monsters, searchField} = this.state;
//     const {onSearchChange} = this;
//     // The monsters are filtered outside of the onChange. Filter the original list of monsters based on searchField.
//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="Search Monsters"
//           className="monsters-searchbox"
//         />
//         <CardList monsters={filteredMonsters} />
//       </div>
//     );
//   }
// }

export default App;
