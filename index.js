require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use('/api/v1', routes)

app.use((req, res) => { 
    res.status(404).json({
        status: false,
        message: "Seems you are not in our planet"
    })
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
 })

