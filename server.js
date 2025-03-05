// const express = require("express")
// const app = express()


// const router = require('./router/auth-router')

// app.use('/api/auth', router)


// // app.get("/" , (req,res) => {
// //   res.status(200).send("welcome")
// // })
// // app.get("/register" , (req,res) => {
// //   res.status(200).send("welcome to register")
// // })

// const PORT = 5000

// app.listen(PORT, ()=> {
//     console.log(`Server is running on port ${PORT}`)
// })


// // module.exports = router;
require('dotenv').config();
const express = require("express");
const app = express();
const connectDb = require('./utils/db')

const router = require('./router/auth-router');
const errorMiddleware = require('./middlewares/error-middleware');



// Middleware to parse JSON requests
app.use(express.json());

app.use('/api/auth', router);


app.use(errorMiddleware)

const PORT = 5000; 

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})

