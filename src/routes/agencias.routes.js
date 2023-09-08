const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const { getAgencias,getAgenciasByID,getAgenciasByCity,createAgencias,updateAgencias,deleteAgencias } = require('../controllers/agencias.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    agencias:
 *      type: object
 *      properties:
 *        id_agencia:
 *          type: integer
 *          description: id de la agencia
 *        nombre_age:
 *          type: string
 *          description: nombre de la agencia
 *        telefono_age:
 *          type: string
 *          description: telefono de la agencia
 *        direccion_age:
 *          type: string
 *          description: direccion de la agencia
 *        id_ciudad:
 *          type: integer
 *          description: id de la ciudad
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para agencias
/**
 * @swagger
 * paths:
 *  /agencias:
 *    get:
 *      summary: Encontrar todas las agencias
 *      description: Devuelve todas las agencias
 *      tags: 
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: '#/components/schemas/agencias'
 *        500:
 *          description: Error
 */
router.get('/agencias', authMiddleware, getAgencias);

/**
 * @swagger
 *  /agencias/{id}:
 *    get: 
 *      summary: Encontrar agencia por Id
 *      description: Devuelve una sola agencia
 *      tags:
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de agencia a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/agencias'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/agencias/:id', authMiddleware, getAgenciasByID);

/**
 * @swagger
 *  /agencias/city/{name}:
 *    get: 
 *      summary: Encontrar agencia por el nombre de la ciudad
 *      description: Devuelve una sola agencia
 *      tags:
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: nombre de ciudad a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/agencias'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/agencias/city/:name', authMiddleware, getAgenciasByCity);

/**
 * @swagger
 *  /agencias:
 *    post: 
 *      summary: Agregar una nueva agencia
 *      description: Añade una nueva agencia
 *      tags:
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear una nueva agencia
 *        required: true
 *        content:
 *          applitacion/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre_age:
 *                  type: string
 *                  description: nombre de la agencia
 *                telefono_age:
 *                  type: string
 *                  description: telefono de la agencia
 *                direccion_age:
 *                  type: string
 *                  description: direccion de la agencia
 *                id_ciudad:
 *                  type: integer
 *                  description: id de la ciudad 
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        406:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/agencias', authMiddleware, createAgencias);

/**
 * @swagger
 *  /agencias:
 *    put: 
 *      summary: Actualizar una agencia existente
 *      description: Actualizar una agencia existente por ID
 *      tags:
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar una agencia existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/agencias'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: agencia no encontrada
 *        406:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/agencias', authMiddleware, updateAgencias);

/**
 * @swagger
 *  /agencias:
 *    delete: 
 *      summary: Eliminar una agencia existente
 *      description: Eliminar una agencia existente por ID
 *      tags:
 *        - agencias
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de agencia a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: agencia no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/agencias/:id', authMiddleware, deleteAgencias);

module.exports = router;