require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 3100
const {sequelize} = require('./models')
const userRoutes = require('./routes/user')
const adminRoutes = require('./routes/admin')

app.use(bodyParser.json())
app.use('/api/v1', userRoutes)
app.use('/api/v1/admin', adminRoutes)

app.use((req, res) => { 
    res.status(404).json({
        status: false,
        message: "not found",
    })
})
sequelize.authenticate().then(app.listen(port, () => {
    console.log(`Server running on port ${port}`)
 }))


