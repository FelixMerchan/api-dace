require('dotenv').config();
const path = require('path');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Metadata info about our API
const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'DACE API',
      version: '1.0.0'
    },
    servers: [
      {
        url: `http://${process.env.HOST_APP}:${process.env.PORT_APP}`
      }
    ]
  },
  apis: [`${path.join(__dirname, "../routes/*.routes.js")}`]
}

// Docs en JSON formt
const swaggerSpec = swaggerJSDoc( options );

// Function to setup our docs
const swaggerDocs = (app) => {
const swaggerSpec = swaggerJSDoc( options );
  app.use('/v1/docs', swaggerUi.serve, swaggerUi.setup( swaggerSpec ) );
  app.get('/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send( swaggerSpec );
  })
  console.log(`Version 1 Docs are available at http://${process.env.HOST_APP}:${process.env.PORT_APP}/v1/docs`);
};

module.exports = { swaggerDocs } ;