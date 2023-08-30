require('dotenv').config();
const express = require('express');
const app = express();

const host = process.env.HOST_APP;
const port = process.env.PORT_APP || 3030;

// swagger
const { swaggerDocs: V1SwaggerDocs } = require('./v1/swagger');

// middelwares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use(require('./routes/index'));

app.listen(port, () => {
  
  console.log(`Server up http://${host}:${port}`);

  // swagger
  V1SwaggerDocs(app);
  
});
