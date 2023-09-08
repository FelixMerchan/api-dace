const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const { getInteracciones,getInteraccionesByID,getInteraccionesByUser,getInteraccionesByAgencia,getInteraccionesByCanal,getInteraccionesByTema,createInteracciones,updateInteracciones,deleteInteracciones} = require('../controllers/interacciones.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    interacciones:
 *      type: object
 *      properties:
 *        id_interaccion:
 *          type: integer
 *          description: id de las interacciones
 *        fecha:
 *          type: time
 *          description: fecha de las interacciones
 *        cant_mensaje:
 *          type: integer
 *          description: cantidad de mensajes de las interacciones
 *        nombre_graba:
 *          type: string
 *          description: nombre de la grabación de las interacciones
 *        observacion:
 *          type: string
 *          description: observacion de las interacciones
 *        duracion_llamada:
 *          type: time
 *          description: duracion de la llamada de las interacciones
 *        id_usuario:
 *          type: integer
 *          description: ide del usuario de las interacciones
 *        id_agencia:
 *          type: integer
 *          description: id de la agencia de las interacciones
 *        id_canal:
 *          type: integer
 *          description: ide del canal de las interacciones
 *        id_tema:
 *          type: integer
 *          description: id del tema de las interacciones
 *        id_cliente:
 *          type: integer
 *          description: id del cliente de las interacciones
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para interacciones
/**
 * @swagger
 * paths:
 *  /interacciones:
 *    get:
 *      summary: Encontrar todas los interacciones
 *      description: Devuelve todas los interacciones
 *      tags: 
 *        - interacciones
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
 *                  $ref: '#/components/schemas/interacciones'
 *        500:
 *          description: Error
 */
router.get('/interacciones', authMiddleware, getInteracciones);

/**
 * @swagger
 *  /interacciones/{id}:
 *    get: 
 *      summary: Encontrar interacciones por Id
 *      description: Devuelve una sola interaccion
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de interacciones a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/interacciones'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error          
 */
router.get('/interacciones/:id', authMiddleware, getInteraccionesByID);

/**
 * @swagger
 *  /interacciones/usuario/{user}:
 *    get: 
 *      summary: Encontrar interacciones por usuario
 *      description: Devuelve un solo usuario
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: user
 *          schema:
 *            type: string
 *          required: true
 *          description: usuario a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/interacciones'
 *          
 */
router.get('/interacciones/usuario/:user', authMiddleware, getInteraccionesByUser);

/**
 * @swagger
 *  /interacciones/agencia/{agen}:
 *    get: 
 *      summary: Encontrar interacciones por agencia
 *      description: Devuelve una sola agencia
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: agen
 *          schema:
 *            type: string
 *          required: true
 *          description: agencia a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/interacciones'
 *          
 */
router.get('/interacciones/agencia/:agen', authMiddleware, getInteraccionesByAgencia);

/**
 * @swagger
 *  /interacciones/canal/{can}:
 *    get: 
 *      summary: Encontrar interacciones por canal
 *      description: Devuelve un solo canal
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: can
 *          schema:
 *            type: string
 *          required: true
 *          description: canal a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/interacciones'
 *          
 */
router.get('/interacciones/canal/:can', authMiddleware, getInteraccionesByCanal);

/**
 * @swagger
 *  /interacciones/tema/{tem}:
 *    get: 
 *      summary: Encontrar interacciones por tema
 *      description: Devuelve un solo tema
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: tem
 *          schema:
 *            type: string
 *          required: true
 *          description: tema a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/interacciones'
 *          
 */
router.get('/interacciones/tema/:tem', authMiddleware, getInteraccionesByTema);

/**
 * @swagger
 *  /interacciones:
 *    post: 
 *      summary: Agregar una nueva interaccion
 *      description: Añade una nueva interaccion
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear una nueva interaccion
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *        fecha:
 *          type: time
 *          description: fecha de las interacciones
 *        cant_mensaje:
 *          type: integer
 *          description: cantidad de mensajes de las interacciones
 *        nombre_graba:
 *          type: string
 *          description: nombre de la grabación de las interacciones
 *        observacion:
 *          type: string
 *          description: observación de las interacciones
 *        duracion_llamada:
 *          type: time
 *          description: duración de la llamada de las interacciones
 *        id_usuario:
 *          type: integer
 *          description: ide del usuario de las interacciones
 *        id_agencia:
 *          type: integer
 *          description: id de la agencia de las interacciones
 *        id_canal:
 *          type: integer
 *          description: ide del canal de las interacciones
 *        id_tema:
 *          type: integer
 *          description: id del tema de las interacciones
 *        id_cliente:
 *          type: integer
 *          description: id del cliente de las interacciones
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/interacciones', authMiddleware, createInteracciones);

/**
 * @swagger
 *  /interacciones:
 *    put: 
 *      summary: Actualizar una interaccion existente
 *      description: Actualizar una interaccion existente por ID
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar una interaccion existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/interacciones'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: interacciones no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/interacciones', authMiddleware, updateInteracciones);

/**
 * @swagger
 *  /interacciones:
 *    delete: 
 *      summary: Eliminar una interaccion existente
 *      description: Eliminar una interaccion existente por ID
 *      tags:
 *        - interacciones
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de interacción a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: interacciones no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/interacciones/:id', authMiddleware, deleteInteracciones);

module.exports = router;