const express = require('express')
const app = express()

const PORT = 3030


app.get('/users', (req, res) => {
    res.send('<h1>shit</h1>')
})

app.listen(PORT, () => { console.log(`Starting server on port ${PORT}`) })
