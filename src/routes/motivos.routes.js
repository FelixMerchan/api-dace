const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const {getMotivos,getMotivosByID,getMotivosByCategoria,createMotivos,updateMotivos,deleteMotivos } = require('../controllers/motivos.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    motivos:
 *      type: object
 *      properties:
 *        id_motivo:
 *          type: integer
 *          description: id del motivo
 *        categoria_moti:
 *          type: string
 *          description: categoria del motivo
 *        descripcion_moti:
 *          type: string
 *          description: descripcion del motivo
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para motivos
/**
 * @swagger
 * paths:
 *  /motivos:
 *    get:
 *      summary: Encontrar todas las motivos
 *      description: Devuelve todas las motivos
 *      tags: 
 *        - motivos
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
 *                  $ref: '#/components/schemas/motivos'
 *        500:
 *          description: Error
 */
router.get('/motivos', authMiddleware, getMotivos);

/**
 * @swagger
 *  /motivos/{id}:
 *    get: 
 *      summary: Encontrar motivo por Id
 *      description: Devuelve un solo motivo
 *      tags:
 *        - motivos
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de motivo a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/motivos'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/motivos/:id', authMiddleware, getMotivosByID);

/**
 * @swagger
 *  /motivos/category/{name}:
 *    get: 
 *      summary: Encontrar motivo por el nombre de categoria
 *      description: Devuelve un solo motivo
 *      tags:
 *        - motivos
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: name
 *          schema:
 *            type: string
 *          required: true
 *          description: nombre de categoria a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/motivos'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/motivos/category/:name', authMiddleware, getMotivosByCategoria);

/**
 * @swagger
 *  /motivos:
 *    post: 
 *      summary: Agregar un nuevo motivo
 *      description: Añade un nuevo motivo
 *      tags:
 *        - motivos
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear un nuevo motivo
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  categoria_moti:
 *                      type: string
 *                      description: categoria del motivo
 *                  descripcion_moti:
 *                      type: string
 *                      description: descripcion del motivo
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/motivos', authMiddleware, createMotivos);

/**
 * @swagger
 *  /motivos:
 *    put: 
 *      summary: Actualizar un motivo existente
 *      description: Actualizar un motivo existente por ID
 *      tags:
 *        - motivos
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar un motivo existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/motivos'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: motivo no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/motivos', authMiddleware, updateMotivos);

/**
 * @swagger
 *  /motivos:
 *    delete: 
 *      summary: Eliminar un motivo existente
 *      description: Eliminar un motivo existente por ID
 *      tags:
 *        - motivos
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de motivo a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: motivo no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/motivos/:id', authMiddleware, deleteMotivos);

module.exports = router;