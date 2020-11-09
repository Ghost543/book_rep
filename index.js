const express=require('express')

const routes = require('./routes/routes')
const inRoute = require('./routes/index')

const app = express()

const port = process.env.port || 3000

app.use(express.json())

app.use('/api/books',routes)
app.use('/',inRoute)

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})