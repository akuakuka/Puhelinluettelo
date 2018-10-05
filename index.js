const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

let persons = [
    {name:"Arto Hellas",
number: "040-123456",
id: 1},
{name:"Martti Tienari",
number: "040-123456",
id: 2},
{name:"Arto Järvinen",
number: "040-123456",
id: 3},
{name:"Lea Kutvonen",
number: "040-123456",
id: 4}
]
const generateId = () => {
    const maxId = persons.length > 0 ? persons.map(n => n.id).sort((a,b) => a - b).reverse()[0] : 1
    return maxId + 1
  }
app.get('/info', (req, res) => {

const date = new Date()
const viesti = 'puhelinluettelossa on '+ persons.length+ ' henkilöä hetkellä: ' + date
res.send(viesti)
})
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id )
    if ( person ) {
        response.json(person)
       // morgan.token('type', function (req, res) { return req.headers['content-type'] })
      } else {
        response.status(404).end()
      }
  })
  app.delete('/api/persons/:id', (request, response) => {
      console.log('DELETE IDLLÄ: ', request.params)
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
      
    const body = request.body
    console.log(body)
    if (body.name === undefined) {
        return response.status(400).json({error: 'content missing'})
      }
      const nimet = persons.map(person => person.name)
      if (nimet.includes(body.name)) {
        return response.status(400).json({error: 'Nimi on jo listalla'})
      }
    const person = {
      name: body.name,
      number: body.number,
      id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
  })
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})