const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = process.env.PORT || 5000
app.use(express.json({extended: true}))
app.use('/image',express.static(`${__dirname}/uploads`))
app.use('/api/auth',require('./routes/auth.route'))
app.use('/api/dashbrod',require('./routes/dashbrod.route'))
app.use('/api/offers',require('./routes/offers.route'))
app.use('/api/questions',require('./routes/questions.route'))


async function start(){
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.3rehsax.mongodb.net/?retryWrites=true&w=majority',{
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })

        app.listen(PORT,()=>{
            console.log(`Server run: ${PORT}`)
        })

    } catch (error) {
        console.error(error)
    }
}

start()