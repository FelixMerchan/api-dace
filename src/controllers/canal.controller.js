const pool = require('../database/db');

//endpoint para devolver todas los canales
const getCanales = async(req, res) => {
     pool.query('select * from canal where id_canal = id_canal',(err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver los canales por un ID determinado
const getCanalByID = async(req, res) => {
    const {id} = req.params;

    const query = `select * from canal where id_canal = $1`;
    const values = [id];

    pool.query(query, values,  (err, result)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar' });
        } if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro no encontrado' });
        } else {
            res.json(result.rows  );
        }
    });    
};

//endpoint para crear un canal
const createCanal = async(req, res) => {
    const { nombre_can, descripcion_can, extension_can } = req.body;

    const query = 'INSERT INTO canal (nombre_can, descripcion_can, extension_can) VALUES ($1, $2, $3)';
    const values = [nombre_can, descripcion_can, extension_can];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'Canal agregado correctamente'
            });
        }
    }); 
};

//endpoint para modificar un canal
const updateCanal= async(req, res) => {
    const { nombre_can, descripcion_can, extension_can, id_canal} = req.body;

    const query = 'UPDATE canal SET nombre_can = $1, descripcion_can = $2, extension_can=$3  WHERE id_canal = $4';
    const values = [nombre_can, descripcion_can, extension_can, id_canal];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message:  'Canal modificado correctamente'
            });
        }
    }); 
};

//endpoint para eliminar un canal
const deleteCanal = async(req, res) => {
    const { id } = req.params;

  // Realizar la lógica de eliminación del canal según el ID proporcionado
  const query = 'DELETE FROM canal WHERE id_canal = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar la canal' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Canal no encontrado' });
    } else {
      res.json({ message: 'Canal eliminado correctamente' });
    }
  }); 
};

module.exports = { 
    getCanales,
    getCanalByID,
    createCanal,
    updateCanal,
    deleteCanal
}; 