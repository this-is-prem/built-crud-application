import express from 'express'
const app = express()
const port = 3000

app.use(express.json())
let teaData = []
let newId = 1
// add a new tea 
app.post('/hello', (req, res) => {
    const { name, price } = req.body
    const newTea = { id: newId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})

// get tea by id
app.get('/hello/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("tea not found")

    }
    res.status(200).send(tea)
})
// update tea 
app.put('/hello/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("tea not found")

    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})
// delete tea
app.delete('/hello/:id', (req, res) => {
    const index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (index === -1) {
        res.status(404).send('tea not found')

    }
    teaData.slice(index, 1)
    return res.status(204).send('deleted')
})


app.listen(port, () => {
    console.log('server is listening');

})