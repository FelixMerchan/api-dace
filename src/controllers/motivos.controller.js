const pool = require('../database/db');

//endpoint para devolver todas los motivos
const getMotivos = async(req, res) => {
    pool.query('select id_motivo, categoria_moti, descripcion_moti from motivos', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver los motivos por un ID determinado
const getMotivosByID = async(req, res) => {
    const { id } = req.params;

    const query = `select id_motivo, categoria_moti, descripcion_moti from motivos WHERE id_motivo=$1;`;
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

//endpoint para devolver los motivos por categoria
const getMotivosByCategoria = async(req, res) => {
    const busqueda = req.params.name;

    const query = `select id_motivo, categoria_moti, descripcion_moti from motivos where (categoria_moti ilike '%${busqueda}%')`;

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

//endpoint para crear un motivo
const createMotivos = async(req, res) => {
    const { categoria_moti, descripcion_moti } = req.body;

    const query = 'INSERT INTO motivos (categoria_moti, descripcion_moti) VALUES ($1, $2)';
    const values = [categoria_moti, descripcion_moti];

    pool.query(query, values, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'Motivo agregado correctamente'
            });
        }
    });
};

//endpoint para modificar un motivo
const updateMotivos = async(req, res) => {
    const { id_motivo, categoria_moti, descripcion_moti } = req.body;

    const query = 'UPDATE motivos SET categoria_moti = $2, descripcion_moti = $3 WHERE id_motivo = $1';
    const values = [id_motivo, categoria_moti, descripcion_moti];

    pool.query(query, values, (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'Motivo modificado correctamente'
            });
        }
    });
};

//endpoint para eliminar un motivo
const deleteMotivos = async(req, res) => {
    const { id } = req.params;

    // Realizar la lógica de eliminación del motivo según el ID proporcionado
    const query = 'DELETE FROM motivos WHERE id_motivo = $1';
    const values = [id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el motivo' });
        } else if (result.rowCount === 0) {
            res.status(404).json({ error: 'Motivo no encontrado' });
        } else {
            res.json({ message: 'Motivo eliminado correctamente' });
        }
    });
};

module.exports = {
    getMotivos,
    getMotivosByID,
    getMotivosByCategoria,
    createMotivos,
    updateMotivos,
    deleteMotivos
};