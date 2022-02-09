const exp = require('express')
const cors = require('cors')


const app = exp()


app.use(exp.json())
app.use(cors())


app.use('/api', require('./routes/api'))
app.use('/api', require('./routes/api'))
app.use('/api', require('./routes/api'))


app.listen(1000 , () => console.log("server run on port 1000😆") )