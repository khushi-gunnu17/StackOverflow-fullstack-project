import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import userroutes from './routes/user.js'
import questionroutes from "./routes/Question.js"
import answerroutes from "./routes/Answer.js"




const app = express()


// It loads environment variables from a .env file into process.env.
dotenv.config()



// setting up middlewares
app.use(express.json({limit : "30mb", extended : true}))
app.use(express.urlencoded({limit : "30mb", extended : true}))
app.use(cors())     // Enable cors for all routes



// Uses the userroutes for handling requests to various endpoints.
app.use("/user", userroutes)
app.use("/questions", questionroutes)
app.use("/answers", answerroutes)


// sending response to the home route
app.get('/', (req, res) => {
    res.send("Codequest")
})


const PORT = process.env.PORT || 5000
const database_url = process.env.MONGODB_URL

// {useNewUrlParser : true, useUnifiedTopology : true} = given inside this function
mongoose.connect(database_url)
.then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`);}))
.catch((err) => console.log(err.message))