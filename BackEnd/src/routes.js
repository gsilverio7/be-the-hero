const express = require('express');
const cors = require("cors");

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');

const corsOptionsWeb = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
    // Permite acesso apenas do domínio especificado. 
    // Na fase de desenvolvimento, pode ficar vazio, permitindo acesso de
    // qualquer aplicação front-end. 
}; 
const corsOptionsMobile = {
    exposedHeaders: 'x-total-count'
    // Permite que o aplicativo mobile tenha acesso a esse header da resposta da api.
}; 


const routes = express.Router();

routes.post('/sessions', cors(corsOptionsWeb), SessionController.create); //Login de ONGs
routes.post('/ongs', cors(corsOptionsWeb), OngController.create); //Cadastrar novas ONGs
routes.get('/ongs', cors(corsOptionsWeb), OngController.index); //Listagem de ONGs
routes.post('/incidents', cors(corsOptionsWeb), IncidentController.create); //Cadastrar novos Incidentes
routes.get('/incidents', cors(corsOptionsMobile), IncidentController.index); //Listagem de Incidentes
routes.delete('/incidents/:id', cors(corsOptionsWeb), IncidentController.delete);//Apagar Incidentes
routes.get('/profile', cors(corsOptionsWeb), ProfileController.index); //Listagem de Incidentes de uma ONG específica

module.exports = routes;