
const { Router } = require('express');
const router = Router();

const { getCiudades, createCiudades, getCiudadesByID, getCiudadesByCity, updateCiudades, deleteCiudades } = require('../controllers/ciudades.controller');

const { getAgencias, getAgenciasByID, getAgenciasByCity, createAgencias, updateAgencias, deleteAgencias } = require('../controllers/agencias.controller');

const { getInteracciones, getInteraccionesByID, getInteraccionesByUser, getInteraccionesByAgencia, getInteraccionesByCanal, getInteraccionesByTema, createInteracciones, updateInteracciones, deleteInteracciones } = require('../controllers/interacciones.controller');

const { getTemas, getTemasByID, createTemas, updateTemas, deleteTemas } = require('../controllers/temas.controller');

const { getCanales, getCanalByID, createCanal, updateCanal, deleteCanal } = require('../controllers/canal.controller');

const { getMotivos, getMotivosByID, getMotivosByCategoria, createMotivos, updateMotivos, deleteMotivos } = require('../controllers/motivos.controller');

const { getUsuarios, getUsuariosByID, getUsuariosByCed, createUsuarios, updateUsuarios, deleteUsuarios } = require('../controllers/usuarios.controller');

const { getClientes, getClientesByID, getClientesByCedula, createClientes, updateClientes, deleteClientes } = require('../controllers/clientes.controller');

const authMiddleware = require('../authMiddleware');

//rutas de endpoint para ciudades
router.get('/ciudades', getCiudades);
router.get('/ciudades/:id', getCiudadesByID);
router.get('/ciudadesByCity/:id', getCiudadesByCity);
router.post('/ciudades', createCiudades);
router.put('/ciudades', updateCiudades);
router.delete('/ciudades/:id', deleteCiudades);

//rutas de endpoint para agencias
router.get('/agencias', getAgencias);
router.get('/agencias/:id', getAgenciasByID);
router.get('/agenciasByCity/:id', getAgenciasByCity);
router.post('/agencias', createAgencias);
router.put('/agencias', updateAgencias);
router.delete('/agencias/:id', deleteAgencias);

//rutas de endpoint para interacciones
router.get('/interacciones', getInteracciones);
router.get('/interacciones/:id', getInteraccionesByID);
router.get('/interaccionesByUser/:id', getInteraccionesByUser);
router.get('/interaccionesByAgencia/:id', getInteraccionesByAgencia);
router.get('/interaccionesByCanal/:id', getInteraccionesByCanal);
router.get('/interaccionesByTema/:id', getInteraccionesByTema);
router.post('/interacciones', createInteracciones);
router.put('/interacciones', updateInteracciones);
router.delete('/interacciones/:id', deleteInteracciones);

//rutas de enpoint para temas
router.get('/temas', getTemas);
router.get('/temas/:id', getTemasByID);
router.post('/temas', createTemas);
router.put('/temas', updateTemas);
router.delete('/temas/:id', deleteTemas);


//rutas de enpoint para canales
router.get('/canales', getCanales);
router.get('/canal/:id', getCanalByID);
router.post('/canales', createCanal);
router.put('/canales', updateCanal);
router.delete('/canales/:id', deleteCanal);

//rutas de endpoint para motivo
router.get('/motivos', getMotivos);
router.get('/motivos/:id', getMotivosByID);
router.get('/motivosByCategoria/:id', getMotivosByCategoria);
router.post('/motivos', createMotivos);
router.put('/motivos', updateMotivos);
router.delete('/motivos/:id', deleteMotivos);

//rutas de endpoint para usuarios
router.get('/usuarios', getUsuarios);
router.get('/usuarios/:id', getUsuariosByID);
router.get('/usuariosByCed/:id', getUsuariosByCed);
router.post('/usuarios', createUsuarios);
router.put('/usuarios', updateUsuarios);
router.delete('/usuarios/:id', deleteUsuarios);

// rutas de endpoint para clientes
router.get('/clientes', getClientes);
router.get('/clientes/:id', authMiddleware, getClientesByID);
router.get('/clientes/cedula/:cedula', authMiddleware, getClientesByCedula);
router.post('/clientes', authMiddleware, createClientes);
router.put('/clientes/:id', authMiddleware, updateClientes);
router.delete('/clientes/:id', authMiddleware, deleteClientes);

module.exports = router;