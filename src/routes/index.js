const { Router } = require ('express');
const router = Router();

const { getCiudades,  createCiudades, getCiudadesByID, getCiudadesByCity, updateCiudades, deleteCiudades } = require('../controllers/ciudades.controller');

const { getAgencias, getAgenciasByID, getAgenciasByCity, createAgencias, updateAgencias, deleteAgencias } = require('../controllers/agencias.controller');

const { getInteracciones, getInteraccionesByID, getInteraccionesByUser, getInteraccionesByAgencia, getInteraccionesByCanal, getInteraccionesByTema, createInteracciones, updateInteracciones, deleteInteracciones } = require('../controllers/interacciones.controller');

const  authMiddleware  = require('../authMiddleware');

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

module.exports = router;