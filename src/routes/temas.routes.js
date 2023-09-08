const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const {getTemas,getTemasByID,createTemas,updateTemas,deleteTemas } = require('../controllers/temas.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    temas:
 *      type: object
 *      properties:
 *        id_tema:
 *          type: integer
 *          description: id del tema
 *        nombre_tema:
 *          type: string
 *          description: nombre del tema
 *        descripcion_tema:
 *          type: string
 *          description: descripcion del tema
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para temas
/**
 * @swagger
 * paths:
 *  /temas:
 *    get:
 *      summary: Encontrar todos los temas
 *      description: Devuelve todos los temas
 *      tags: 
 *        - temas
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
 *                  $ref: '#/components/schemas/temas'
 *        500:
 *          description: Error
 */
router.get('/temas', authMiddleware, getTemas);

/**
 * @swagger
 *  /temas/{id}:
 *    get: 
 *      summary: Encontrar tema por Id
 *      description: Devuelve un solo tema
 *      tags:
 *        - temas
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de tema a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/temas'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/temas/:id', authMiddleware, getTemasByID);
/**
 * @swagger
 *  /temas:
 *    post: 
 *      summary: Agregar un nuevo tema
 *      description: Añade un nuevo tema
 *      tags:
 *        - temas
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear un nuevo tema
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  nombre_tema:
 *                      type: string
 *                      description: nombre del tema
 *                  descripcion_tema:
 *                      type: string
 *                      description: descripcion del tema
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/temas', authMiddleware, createTemas);

/**
 * @swagger
 *  /temas:
 *    put: 
 *      summary: Actualizar un tema existente
 *      description: Actualizar un tema existente por ID
 *      tags:
 *        - temas
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar un tema existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/temas'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: tema no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/temas', authMiddleware, updateTemas);

/**
 * @swagger
 *  /temas:
 *    delete: 
 *      summary: Eliminar un tema existente
 *      description: Eliminar un tema existente por ID
 *      tags:
 *        - temas
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de tema a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: tema no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/temas/:id', authMiddleware, deleteTemas);

module.exports = router;