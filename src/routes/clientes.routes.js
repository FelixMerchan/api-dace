const { Router } = require('express');
const router = Router();

const authMiddleware = require('../authMiddleware');

const { getClientes,getClientesByID,getClientesByCedula,createClientes,updateClientes,deleteClientes } = require('../controllers/clientes.controller');

/**
 * @swagger
 * components:
 *  schemas:
 *    clientes:
 *      type: object
 *      properties:
 *        id_cliente:
 *          type: integer
 *          description: id de los clientes
 *        cedula_cli:
 *          type: string
 *          description: cedula de los clientes
 *        nombre_cli:
 *          type: string
 *          description: nombre de los clientes
 *        apellido_cli:
 *          type: string
 *          description: apellido de los clientes
 *        telefono_cli:
 *          type: string
 *          description: telefono de los clientes
 *        socio_cli:
 *          type: boolean
 *          description: si es o no un socio
 *        nacimiento_cli:
 *          type: date
 *          description: fecha de nacimiento de los clientes
 *        id_ciudad:
 *          type: integer
 *          description: id de la ciudad de los clientes
 *        nick_redes:
 *          type: string
 *          description: consultar
 *  securitySchemes:
 *    BearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 */

//rutas de endpoint para clientes
/**
 * @swagger
 * paths:
 *  /clientes:
 *    get:
 *      summary: Encontrar todos los clientes
 *      description: Devuelve todos los clientes
 *      tags: 
 *        - clientes
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
 *                  $ref: '#/components/schemas/clientes'
 */
router.get('/clientes', authMiddleware, getClientes);

/**
 * @swagger
 *  /clientes/{id}:
 *    get: 
 *      summary: Encontrar clientes por Id
 *      description: Devuelve un solo cliente
 *      tags:
 *        - clientes
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de clientes a devolver
 *      responses:
 *        200:
 *          description: Operación exitosa
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/clientes'
 *          
 */
router.get('/clientes/:id', authMiddleware, getClientesByID);

/**
 * @swagger
 *  /clientes/cedula/{ced}:
 *    get: 
 *      summary: Encontrar clientes por la cedula
 *      description: Devuelve un solo cliente
 *      tags:
 *        - clientes
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
 *                $ref: '#/components/schemas/clientes'
 *          
 */
router.get('/clientes/cedula/:cedula', authMiddleware, getClientesByCedula);

/**
 * @swagger
 *  /clientes:
 *    post: 
 *      summary: Agregar un nuevo cliente
 *      description: Añade un nuevo cliente
 *      tags:
 *        - clientes
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Crear un nuevo cliente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  cedula_cli:
 *                      type: string
 *                      description: cedula de los clientes
 *                  nombre_cli:
 *                      type: string
 *                      description: nombre de los clientes
 *                  apellido_cli:
 *                      type: string
 *                      description: apellido de los clientes
 *                  telefono_cli:
 *                      type: string
 *                      description: telefono de los clientes
 *                  socio_cli:
 *                      type: boolean
 *                      description: si es o no un socio
 *                  nacimiento_cli:
 *                      type: date
 *                      description: fecha de nacimiento de los clientes
 *                  id_ciudad:
 *                      type: integer
 *                      description: id de la ciudad de los clientes
 *                  nick_redes:
 *                      type: string
 *                      description: consultar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        405:
 *          description: Entrada no válida
 *        500:
 *          description: Error
 *          
 */
router.post('/clientes', authMiddleware, createClientes);

/**
 * @swagger
 *  /clientes:
 *    put: 
 *      summary: Actualizar un cliente existente
 *      description: Actualizar un cliente existente por ID
 *      tags:
 *        - clientes
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *        description: Actualizar un cliente existente
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              $ref: '#/components/schemas/clientes'
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: clientes no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.put('/clientes', authMiddleware, updateClientes);

/**
 * @swagger
 *  /clientes:
 *    delete: 
 *      summary: Eliminar un cliente existente
 *      description: Eliminar un cliente existente por ID
 *      tags:
 *        - clientes
 *      security:
 *        - BearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: integer
 *            format: int64
 *          required: true
 *          description: id de cliente a eliminar
 *      responses:
 *        200:
 *          description: Operación exitosa
 *        400:
 *          description: ID proporcionado no válido
 *        404:
 *          description: clientes no encontrada
 *        405:
 *          description: Excepción de validación
 *        500:
 *          description: Error
 *          
 */
router.delete('/clientes/:id', authMiddleware, deleteClientes);

module.exports = router;