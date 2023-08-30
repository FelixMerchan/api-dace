const { Router } = require('express');
const router = Router();

const { getAgencias, getAgenciasByID, getAgenciasByCity, createAgencias, updateAgencias, deleteAgencias } = require('../controllers/agencias.controller');

const { getInteracciones, getInteraccionesByID, getInteraccionesByUser, getInteraccionesByAgencia, getInteraccionesByCanal, getInteraccionesByTema, createInteracciones, updateInteracciones, deleteInteracciones } = require('../controllers/interacciones.controller');

const { getTemas, getTemasByID, createTemas, updateTemas, deleteTemas } = require('../controllers/temas.controller');

const { getCanales, getCanalByID, createCanal, updateCanal, deleteCanal } = require('../controllers/canal.controller');

const { getMotivos, getMotivosByID, getMotivosByCategoria, createMotivos, updateMotivos, deleteMotivos } = require('../controllers/motivos.controller');

const { getUsuarios, getUsuariosByID, getUsuariosByCed, createUsuarios, updateUsuarios, deleteUsuarios } = require('../controllers/usuarios.controller');

const { getClientes, getClientesByID, getClientesByCedula, createClientes, updateClientes, deleteClientes } = require('../controllers/clientes.controller');

const authMiddleware = require('../authMiddleware');

// requerimos los endpoint que se encuentran en ciudades.routes
router.use(require('./ciudades.routes'));

//rutas de endpoint para agencias
router.get('/agencias', authMiddleware, getAgencias);
router.get('/agencias/:id', authMiddleware, getAgenciasByID);
router.get('/agenciasByCity/:id', authMiddleware, getAgenciasByCity);
router.post('/agencias', authMiddleware, createAgencias);
router.put('/agencias', authMiddleware, updateAgencias);
router.delete('/agencias/:id', authMiddleware, deleteAgencias);

//rutas de endpoint para interacciones
router.get('/interacciones', authMiddleware, getInteracciones);
router.get('/interacciones/:id', authMiddleware, getInteraccionesByID);
router.get('/interaccionesByUser/:id', authMiddleware, getInteraccionesByUser);
router.get('/interaccionesByAgencia/:id', authMiddleware, getInteraccionesByAgencia);
router.get('/interaccionesByCanal/:id', authMiddleware, getInteraccionesByCanal);
router.get('/interaccionesByTema/:id', authMiddleware, getInteraccionesByTema);
router.post('/interacciones', authMiddleware, createInteracciones);
router.put('/interacciones', authMiddleware, updateInteracciones);
router.delete('/interacciones/:id', authMiddleware, deleteInteracciones);

//rutas de enpoint para temas
router.get('/temas', authMiddleware, getTemas);
router.get('/temas/:id', authMiddleware, getTemasByID);
router.post('/temas', authMiddleware, createTemas);
router.put('/temas', authMiddleware, updateTemas);
router.delete('/temas/:id', authMiddleware, deleteTemas);

//rutas de enpoint para canales
router.get('/canales', authMiddleware, getCanales);
router.get('/canales/:id', authMiddleware, getCanalByID);
router.post('/canales', authMiddleware, createCanal);
router.put('/canales', authMiddleware, updateCanal);
router.delete('/canales/:id', authMiddleware, deleteCanal);

//rutas de endpoint para motivo
router.get('/motivos', authMiddleware, getMotivos);
router.get('/motivos/:id', authMiddleware, getMotivosByID);
router.get('/motivosByCategoria/:id', authMiddleware, getMotivosByCategoria);
router.post('/motivos', authMiddleware, createMotivos);
router.put('/motivos', authMiddleware, updateMotivos);
router.delete('/motivos/:id', authMiddleware, deleteMotivos);

//rutas de endpoint para usuarios
router.get('/usuarios', authMiddleware, getUsuarios);
router.get('/usuarios/:id', authMiddleware, getUsuariosByID);
router.get('/usuariosByCed/:id', authMiddleware, getUsuariosByCed);
router.post('/usuarios', createUsuarios);
router.put('/usuarios', authMiddleware, updateUsuarios);
router.delete('/usuarios/:id', authMiddleware, deleteUsuarios);

// rutas de endpoint para clientes
router.get('/clientes', authMiddleware, getClientes);
router.get('/clientes/:id', authMiddleware, getClientesByID);
router.get('/clientes/cedula/:cedula', authMiddleware, getClientesByCedula);
router.post('/clientes', authMiddleware, createClientes);
router.put('/clientes', authMiddleware, updateClientes);
router.delete('/clientes/:id', authMiddleware, deleteClientes);

router.use(require('./auth.routes'));

module.exports = router;