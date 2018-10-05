import React from 'react';
import Person from './components/Person';
import personService from './services/persons';
import Notification from './components/Notification';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    persons: [
    ],
      newName: '',
      newNro: '',
      error: ''
    }
  }
  componentDidMount() {
   personService
    .getAll()
    .then(response => {
      this.setState({persons: response.data})
    })
  }
  addPerson = (event) => {
    
    event.preventDefault()
   
    const personObject = {
      name: this.state.newName,
      number: this.state.newNro
    }
    const nimet = this.state.persons.map(person => person.name)
    if(nimet.includes(personObject.name)) {
      alert('Nimi on jo luettelossa')
    } else {
      personService
        .create(personObject)
        .then(response=> {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNro: ''
          })
        })
    }
    this.setState({error: 'Lisätty nimi '+personObject.name+' numerolla ' + personObject.number})
    setTimeout(() => {
      this.setState({error: null})
    }, 2000)
    }
    handleNroChange = (event)=> {
      this.setState({ newNro: event.target.value })
    }
  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  onDelete = (id) => {
    console.log('Poistettu: ',id)

    const personsid = id

    personService
      .remove(personsid)
      .then(() => {
        const persons =
          this.state.persons.filter(
            p => p.id !== personsid)
        this.setState({ persons: persons })
      })
  }
  
  render() {
    const rivit = () => this.state.persons.map(person => <Person key={person.id} person={person} onDelete={this.onDelete}/>)
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notification message={this.state.error}/>
        <form onSubmit={this.addPerson}>
        nimi: <input
            value={this.state.newName}
            onChange={this.handleNameChange}
          />
          <div>
          numero: <input 
          value={this.state.newNro}
            onChange={this.handleNroChange}
          />
          </div>
          <button type="submit">lisää</button>
        </form>
        <h2>Numerot</h2>
        <ul>
        {rivit()}
      </ul>
      </div>
    )
  }
}
export default App
