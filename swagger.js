const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Contacts API",
        description: "This is the Contacts API"
    },
    // render: https://cse341-api.onrender.com
    // local: localhost:3000
    host: "cse341-api.onrender.com",
    schemes: ["https"]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate the swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);