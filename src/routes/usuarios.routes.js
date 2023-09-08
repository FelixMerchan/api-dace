const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const { getUsuarios,getUsuariosByID,getUsuariosByCed,createUsuarios,updateUsuarios,deleteUsuarios } = require('../controllers/usuarios.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    usuarios:
 *      type: object
 *      properties:
 *        id_usuario:
 *          type: integer
 *          description: id de los usuarios
 *        cedula_usu:
 *          type: string
 *          description: cedula de los usuarios
 *        nombre_usu:
 *          type: string
 *          description: nombre de los usuarios
 *        email_usu:
 *          type: string
 *          description: email de los usuarios
 *        user:
 *          type: string
 *          description: usuario
 *        password:
 *          type: string
 *          description: contraseña de los usuarios
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para usuarios
/**
 * @swagger
 * paths:
 *  /usuarios:
 *    get:
 *      summary: Encontrar todas los usuarios
 *      description: Devuelve todas los usuarios
 *      tags: 
 *        - usuarios
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
 *                  $ref: '#/components/schemas/usuarios'
 *        500:
 *          description: Error
 */
router.get('/usuarios', authMiddleware, getUsuarios);

/**
 * @swagger
 *  /usuarios/{id}:
 *    get: 
 *      summary: Encontrar usuarios por Id
 *      description: Devuelve un solo usuarios
 *      tags:
 *        - usuarios
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de usuarios a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/usuarios'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/usuarios/:id', authMiddleware, getUsuariosByID);

/**
 * @swagger
 *  /usuarios/cedula/{ced}:
 *    get: 
 *      summary: Encontrar usuarios por la cedula
 *      description: Devuelve un solo usuario
 *      tags:
 *        - usuarios
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: ced
 *          schema:
 *            type: string
 *          required: true
 *          description: cedula a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/usuarios'
 *        404:
 *          description: Registro no encontrado
 *        500:
 *          description: Error
 *          
 */
router.get('/usuarios/cedula/:ced', authMiddleware, getUsuariosByCed);

/**
 * @swagger
 *  /usuarios:
 *    post: 
 *      summary: Agregar un nuevo usuario
 *      description: Añade un nuevo usuario
 *      tags:
 *        - usuarios
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear un nuevo usuario
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  cedula_usu:
 *                      type: string
 *                      description: cedula de los usuarios
 *                  nombre_usu:
 *                      type: string
 *                      description: nombre de los usuarios
 *                  email_usu:
 *                      type: string
 *                      description: email de los usuarios
 *                  user:
 *                      type: string
 *                      description: usuario
 *                  password:
 *                      type: string
 *                      description: contraseña de los usuarios
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/usuarios', authMiddleware, createUsuarios);

/**
 * @swagger
 *  /usuarios:
 *    put: 
 *      summary: Actualizar un usuario existente
 *      description: Actualizar un usuario existente por ID
 *      tags:
 *        - usuarios
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar un usuario existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/usuarios'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: usuarios no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/usuarios', authMiddleware, updateUsuarios);

/**
 * @swagger
 *  /usuarios:
 *    delete: 
 *      summary: Eliminar un usuario existente
 *      description: Eliminar un usuario existente por ID
 *      tags:
 *        - usuarios
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de usuario a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: usuarios no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/usuarios/:id', authMiddleware, deleteUsuarios);

module.exports = router;