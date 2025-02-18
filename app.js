import express from 'express';
import {} from 'dotenv/config';
import routes from './routes/routes.js';
import connectDB from './db/connect.js';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())
app.use('/', routes)

const PORT = process.env.PORT || 5000

app.get('*', (req,res) => {
    res.sendFile(path.resolve('public/index.html'))
})

const init = async() => {
    try {
        await connectDB(process.env.DB)
        console.log("*****database connected******")
        app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
    } catch (error) {
       console.log(error) 
    }
}
init()