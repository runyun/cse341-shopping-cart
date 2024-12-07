const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('dotenv').config();

// route
const baseRoute = require('./routes/base-route');
app.use('/base', baseRoute);

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger-output.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
