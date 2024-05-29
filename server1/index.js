const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())
//app.use(morgan('tiny'))
//app.use(morgan('tiny'))
morgan.token('objectBody', function getObjBody (req,res){
  return JSON.stringify(req.body)
})

app.use(morgan(':method :url :response-time :objectBody'))

let persons = 
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
    
  })

app.get('/api/persons/:id',(request,response) =>{

const id = Number(request.params.id)
//console.log("this is request", request)
//console.log("this is request params",request.params)
//console.log("this is request params id",request.params.id)
//if id is found, show, if not, send 404 not found
const person = persons.find(p=> p.id === id)
if(person){
    response.json(person)
}else{
    response.status(404).end()
}
})

const generateId = () => {
    const maxId =  persons.length>0? Math.max(...persons.map(p => p.id)):0;
    return maxId+1;
}

//POST
app.post('/api/persons',(request, response)=>{

const body = request.body

  if (body.name === "") {
    return response.status(400).json({ 
      error: 'name is missing' 
    })}
    else if(body.number === ""){
        return response.status(400).json({ 
            error: 'number is missing' 
          })

    }
    const searchPerson = persons.find(person => person.name === body.name)
    if(searchPerson != undefined){
        if(searchPerson.name === body.name){

            return response.status(400).json({ 
                error: 'name already exists' 
              })
    
        }
    }
    

   const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
      }

persons = persons.concat(person)
console.log(person)
console.log(persons)
response.json(person)
})

//DELETE
app.delete('/api/persons/:id',(request,response) =>{

    const id = Number(request.params.id)
    persons = persons.filter(p=> p.id !== id)
    console.log("deleted endpoint", persons)
    response.status(204).end()
    })

  app.get('/info', (request, response) => {
    response.send(`
    <h2>Phonebook has info for ${persons.length} people</h2>
    <br>
    ${Date().toLocaleString()}
    `)
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })