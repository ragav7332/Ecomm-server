const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const { Registeration, Login } = require("./controllers/RegisterController")


const PORT = process.env.PORT || 5000


app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

connectDB();

app.use('/api/items', require("./routes/items"))
app.use('/api/payment', cors(), require("./routes/payment"))

app.post('/api/register', Registeration);
app.post('/api/login', Login);

app.listen(PORT, console.log("Server is running on port ", PORT))