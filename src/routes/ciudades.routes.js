const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const { getCiudades, createCiudades, getCiudadesByID, getCiudadesByCity, updateCiudades, deleteCiudades } = require('../controllers/ciudades.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    ciudades:
 *      type: object
 *      properties:
 *        id_ciudad:
 *          type: integer
 *          description: id de la ciudad
 *        nombre_ciu:
 *          type: string
 *          description: nombre de la ciudad
 *        provincia:
 *          type: string
 *          description: nombre de la provincia
 * 
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para ciudades
/**
 * @swagger
 * paths:
 *  /ciudades:
 *    get:
 *      summary: Encontrar todas las ciudades
 *      description: Devuelve todas las ciudades
 *      tags: 
 *        - Ciudades
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
 *                  $ref: '#/components/schemas/ciudades'
 */
router.get('/ciudades', authMiddleware, getCiudades);

/**
 * @swagger
 *  /ciudades/{id}:
 *    get: 
 *      summary: Encontrar ciudad por Id
 *      description: Devuelve una sola ciudad
 *      tags:
 *        - Ciudades
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de ciudad a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/ciudades'
 *          
 */
router.get('/ciudades/:id', authMiddleware, getCiudadesByID);

/**
 * @swagger
 *  /ciudades/city/{name}:
 *    get: 
 *      summary: Encontrar ciudad por el nombre de la ciudad o provincia
 *      description: Devuelve una sola ciudad
 *      tags:
 *        - Ciudades
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: nombre de ciudad o provincia a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/ciudades'
 *          
 */
router.get('/ciudades/city/:name', authMiddleware, getCiudadesByCity);

/**
 * @swagger
 *  /ciudades:
 *    post: 
 *      summary: Agregar una nueva ciudad
 *      description: Añade una nueva ciudad
 *      tags:
 *        - Ciudades
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear una nueva ciudad
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                nombre_ciu:
 *                  type: string
 *                  description: nombre de la ciudad
 *                provincia:
 *                  type: string
 *                  description: nombre de la provincia
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/ciudades', authMiddleware, createCiudades);

/**
 * @swagger
 *  /ciudades:
 *    put: 
 *      summary: Actualizar una ciudad existente
 *      description: Actualizar una ciudad existente por ID
 *      tags:
 *        - Ciudades
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar una ciudad existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/ciudades'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: Ciudad no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/ciudades', authMiddleware, updateCiudades);

/**
 * @swagger
 *  /ciudades:
 *    delete: 
 *      summary: Eliminar una ciudad existente
 *      description: Eliminar una ciudad existente por ID
 *      tags:
 *        - Ciudades
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de ciudad a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: Ciudad no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/ciudades/:id', authMiddleware, deleteCiudades);

module.exports = router;