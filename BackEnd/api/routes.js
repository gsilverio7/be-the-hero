const express = require('express');

const SessionController = require('../src/controllers/SessionController');
const OngController = require('../src/controllers/OngController');
const IncidentController = require('../src/controllers/IncidentController');
const ProfileController = require('../src/controllers/ProfileController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); //Login de ONGs

routes.post('/ongs', OngController.create); //Cadastrar novas ONGs
routes.get('/ongs', OngController.index); //Listagem de ONGs

routes.post('/incidents', IncidentController.create); //Cadastrar novos Incidentes
routes.get('/incidents', IncidentController.index); //Listagem de Incidentes
routes.delete('/incidents/:id', IncidentController.delete);//Apagar Incidentes

routes.get('/profile', ProfileController.index); //Listagem de Incidentes de uma ONG específica

module.exports = routes;