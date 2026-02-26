import dns from 'dns'; 

dns.setServers(['1.1.1.1', '8.8.8.8']);


import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

import pizzaRouter from './routes/pizzaRoutes';
dotenv.config();

const app: Application = express();

app.use (bodyParser.json());

mongoose.connect(process.env.DB, {})
.then((response) => console.log('Connected to MongoDB'))
.catch((error) => console.log(`Connection Failed: ${error}`));

app.listen(4000, () => { console.log(`Express API running on port 4000`) });


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Pizza API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js']   
};
const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });
    res.send(html);
});

app.use('/api/v1/pizza', pizzaRouter);