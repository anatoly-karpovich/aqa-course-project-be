import express from "express";
import mongoose from "mongoose";
import router from "./routers/router.js"
import productsRouter from "./routers/products.router.js";
import customerRouter from "./routers/customer.router.js";
import orderRouter from "./routers/order.router.js";
import authRouter from "./routers/auth.router.js";
import fileUpload from "express-fileupload";
import swaggerDocs from './utils/swagger.js'
// import swaggerjJsdoc from 'swagger-jsdoc'
// import swaggerUi from 'swagger-ui-express'
// import  pkg  from './package.json' assert { type: "json" }

// const { version } = pkg


const DB_URL = `mongodb+srv://user:user@cluster0.j9uiirp.mongodb.net/?retryWrites=true&w=majority`

const PORT = process.env.PORT || 5000;

// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Sales Portal API',
//             version: version
//         },
//         servers: [
//             {
//                 url: "http://localhost:5000"
//             }
//         ]
//     },
//     apis: ['./routers/*.router.js']
// }

// const swaggerSpecs = swaggerjJsdoc(options)




const app = express()

const BASE_URL = process.env.ENVIRONMENT || 'http://127.0.0.1:5502'

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', BASE_URL);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use('/api', router)
app.use('/api', productsRouter)
app.use('/api', authRouter)
app.use('/api', customerRouter)
app.use('/api', orderRouter)


async function startApp() {
    try {
        await mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log('Server started on port ' + PORT)
        })
        swaggerDocs(app, PORT)
        
    } catch(e) {
        console.log(e)
    }
}
startApp()