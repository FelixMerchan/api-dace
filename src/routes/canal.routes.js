const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const {getCanales,getCanalByID,createCanal,updateCanal,deleteCanal } = require('../controllers/canal.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    canal:
 *      type: object
 *      properties:
 *        id_canal:
 *          type: integer
 *          description: id del canal
 *        nombre_can:
 *          type: string
 *          description: nombre del canal
 *        descripcion_can:
 *          type: string
 *          description: descripcion del canal
 *        extension_can:
 *          type: string
 *          description: extension del canal
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para canal
/**
 * @swagger
 * paths:
 *  /canal:
 *    get:
 *      summary: Encontrar todos los canal
 *      description: Devuelve todos los canal
 *      tags: 
 *        - canal
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
 *                  $ref: '#/components/schemas/canal'
 *        500:
 *          description: Error
 */
router.get('/canal', authMiddleware, getCanales);

/**
 * @swagger
 *  /canal/{id}:
 *    get: 
 *      summary: Encontrar canal por Id
 *      description: Devuelve un solo canal
 *      tags:
 *        - canal
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de canal a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/canal'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/canal/:id', authMiddleware, getCanalByID);

/**
 * @swagger
 *  /canal:
 *    post: 
 *      summary: Agregar un nuevo canal
 *      description: Añade un nuevo canal
 *      tags:
 *        - canal
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear un nuevo canal
 *        required: true
 *        content:
 *          applitacion/json:
 *            schema:
 *              type: object
 *              properties:
 *                  nombre_can:
 *                      type: string
 *                      description: nombre del canal
 *                  descripcion_can:
 *                      type: string
 *                      description: descripcion del canal
 *                  extension_can:
 *                      type: string
 *                      description: extension del canal
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        406:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/canal', authMiddleware, createCanal);

/**
 * @swagger
 *  /canal:
 *    put: 
 *      summary: Actualizar un canal existente
 *      description: Actualizar un canal existente por ID
 *      tags:
 *        - canal
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar un canal existente
 *        required: true
 *        content:
 *          applitacion/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/canal'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: canal no encontrada
 *        406:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/canal', authMiddleware, updateCanal);

/**
 * @swagger
 *  /canal:
 *    delete: 
 *      summary: Eliminar un canal existente
 *      description: Eliminar un canal existente por ID
 *      tags:
 *        - canal
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de canal a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: canal no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/canal/:id', authMiddleware, deleteCanal);

module.exports = router;