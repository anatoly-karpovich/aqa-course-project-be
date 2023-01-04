
import swaggerjJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import  pkg  from '../package.json' assert { type: "json" }

const { version } = pkg

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sales Portal API',
            version: version
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ]
        // components: {
        //     secutirySchemas: {
        //         bearerAuth: {
        //             type: 'http',
        //             scheme: 'bearer',
        //             bearerFormat: 'JWT'
        //         }
        //     }
        // },
        // security: [
        //     {
        //         bearerAuth: []
        //     }
        // ]
    },
    apis: ['./routers/*.router.js']
}

const swaggerSpec = swaggerjJsdoc(options)

function swaggerDocs(app, port) {
//Swagger Page
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

//Docs in JSON format
app.get('doc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})
}

export default swaggerDocs;