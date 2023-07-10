const { Pool } = require('pg');

const pool = new Pool({
    host: '35.239.172.154',
    user: 'rootdace',
    password: 'dace1234',
    database: 'callcenter',
    port: '5432'
});

//endpoint para devolver todas los usuarios
const getUsuarios = async(req, res) => {
    pool.query('select id_usuario, cedula_usu, nombre_usu, email_usu, user, password from usuarios', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver los usuarios por un ID determinado
const getUsuariosByID = async(req, res) => {
    const { id } = req.params;

    const query = `select id_usuario, cedula_usu, nombre_usu, email_usu, user, password from usuarios`;
    const values = [id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar' });
        }
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro no encontrado' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver los usuarios por cedula, nombre, user
const getUsuariosByCed = async(req, res) => {
    const busqueda = req.params.id;

    const query = `select id_usuario, cedula_usu, nombre_usu, email_usu, user, password from usuarios where (cedula_usu ilike '%${busqueda}%' OR nombre_usu ilike '%${busqueda}%' OR user ilike '%${busqueda}%')`;

    pool.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar' });
        }
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro no encontrado' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para crear un usuario
const createUsuarios = async(req, res) => {
    const { cedula_usua, nombre_usua, email_usua, user_usua, password_usua } = req.body;

    const query = 'INSERT INTO usuarios (cedula_usu, nombre_usu, email_usu, user, password) VALUES ($1, $2,$3,$4,$5)';
    const values = [cedula_usua, nombre_usua, email_usua, user_usua, password_usua];

    pool.query(query, values, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'usuario added'
            });
        }
    });
};

//endpoint para modificar un usuario
const updateUsuarios = async(req, res) => {
    const { id_usuario, cedula_usua, nombre_usua, email_usua, user_usua, password_usua } = req.body;

    const query = 'UPDATE usuarios SET cedula_usu = $2, nombre_usu = $3,email_usu = $4, user = $5,password = $6 WHERE id_usuario = $1';
    const values = [id_usuario, cedula_usua, nombre_usua, email_usua, user_usua, password_usua];

    pool.query(query, values, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'usuario updated'
            });
        }
    });
};

//endpoint para eliminar un usuario
const deleteUsuarios = async(req, res) => {
    const { id } = req.params;

    // Realizar la lógica de eliminación del usuario según el ID proporcionado
    const query = 'DELETE FROM usuarios WHERE id_usuario = $1';
    const values = [id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el usuario' });
        } else if (result.rowCount === 0) {
            res.status(404).json({ error: 'Usuario no encontrado' });
        } else {
            res.json({ message: 'Usuario eliminado correctamente' });
        }
    });
};

module.exports = {
    getUsuarios,
    getUsuariosByID,
    getUsuariosByCed,
    createUsuarios,
    updateUsuarios,
    deleteUsuarios
};