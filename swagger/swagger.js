const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Shopping Cart',
        description: '',
        contact: {
            name: "API Support",
            url: "https://www.example.com/support",
            email: "support@example.com"
        },
    },
    // host: 'localhost:3000',
    host: 'cse341-shopping-cart.onrender.com',
    schemes: ['https', 'http']
    // schemes: ['http', 'https']
};

const outputFile = './swagger-output.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);