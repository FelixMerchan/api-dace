const pool = require('../database/db');

//endpoint para devolver todas las agencias
const getAgencias = async(req, res) => {
     pool.query('select id_agencia, nombre_age, telefono_age, direccion_age, nombre_ciu from agencias, ciudades where agencias.id_ciudad = ciudades.id_ciudad',(err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver las agencias por un ID determinado
const getAgenciasByID = async(req, res) => {
    const {id} = req.params;

    const query = `select id_agencia, nombre_age, telefono_age, direccion_age, nombre_ciu from agencias, ciudades where agencias.id_ciudad = ciudades.id_ciudad and id_agencia = $1`;
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

//endpoint para devolver las agencias por nombre de ciudad o por provincia
const getAgenciasByCity = async(req, res) => {
    const busqueda = req.params.name;

    const query = `select id_agencia, nombre_age, telefono_age, direccion_age, nombre_ciu from agencias, ciudades where (nombre_ciu ilike '%${busqueda}%' or provincia ilike '%${busqueda}%') and agencias.id_ciudad = ciudades.id_ciudad`;

    pool.query(query,  (err, result)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al buscar' });
        } if (result.rows.length === 0) {
            res.status(404).json({ error: 'Registro no encontrado' });
        } else {
            res.json(result.rows);
        }
    });  
};

//endpoint para crear una agencia
const createAgencias = async(req, res) => {
    const { nombre_age, telefono_age, direccion_age, id_ciudad } = req.body;

    const query = 'INSERT INTO agencias (nombre_age, telefono_age, direccion_age, id_ciudad) VALUES ($1, $2, $3, $4)';
    const values = [nombre_age, telefono_age, direccion_age, id_ciudad];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'Agencia agregada correctamente'
            });
        }
    }); 
};

//endpoint para modificar una agencia
const updateAgencias= async(req, res) => {
    const { id_agencia, nombre_age, telefono_age, direccion_age, id_ciudad } = req.body;

    const query = 'UPDATE agencias SET nombre_age = $2, telefono_age = $3, direccion_age = $4, id_ciudad = $5  WHERE id_agencia = $1';
    const values = [id_agencia, nombre_age, telefono_age, direccion_age, id_ciudad];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'Agencia modificada correctamente'
            });
        }
    }); 
};

//endpoint para eliminar una agencia
const deleteAgencias = async(req, res) => {
    const {id} = req.params;
  // Realizar la lógica de eliminación de la agencia según el ID proporcionado
  const query = 'DELETE FROM agencias WHERE id_agencia = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar la agencia' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Agencia no encontrada' });
    } else {
      res.json({ message: 'Agencia eliminada correctamente ' });
    }
  }); 
};

module.exports = { 
    getAgencias,
    getAgenciasByID,
    getAgenciasByCity,
    createAgencias,
    updateAgencias,
    deleteAgencias
}; 