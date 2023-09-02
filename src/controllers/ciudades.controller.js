const pool = require('../database/db');

//endpoint para devolver todas las ciudades
const getCiudades = async(req, res) => {
     pool.query('select * from ciudades',(err, result) => {
        if (err) {
          console.error(err.stack);
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver las ciudades por un ID determinado
const getCiudadesByID = async(req, res) => {
    const {id} = req.params;

    const query = `select * from ciudades where id_ciudad = $1`;
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

//endpoint para devolver las ciudades por nombre o por provincia
const getCiudadesByCity = async(req, res) => {
    const busqueda = req.params.name;

    const query = `select * from ciudades where nombre_ciu ilike '%${busqueda}%' or provincia ilike '%${busqueda}%'`;

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

//endpoint para crear una ciudad
const createCiudades = async(req, res) => {
    const { nombre_ciu, provincia } = req.body;

    const query = 'INSERT INTO ciudades (nombre_ciu, provincia) VALUES ($1, $2)';
    const values = [nombre_ciu, provincia];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'Ciudad agregada correctamente'
            });
        }
    }); 
};

//endpoint para modificar una ciudad
const updateCiudades = async(req, res) => {
    const { id_ciudad, nombre_ciu, provincia } = req.body;

    const query = 'UPDATE ciudades SET nombre_ciu = $2, provincia = $3 WHERE id_ciudad = $1';
    const values = [id_ciudad, nombre_ciu, provincia];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'Ciudad modificada correctamente'
            });
        }
    }); 
};

//endpoint para eliminar una ciudad
const deleteCiudades = async(req, res) => {
    const { id } = req.params;

  // Realizar la lógica de eliminación de la ciudad según el ID proporcionado
  const query = 'DELETE FROM ciudades WHERE id_ciudad = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar la ciudad' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Ciudad no encontrada' });
    } else {
      res.json({ message: 'Ciudad eliminada correctamente' });
    }
  }); 
};

module.exports = { 
    getCiudades,
    getCiudadesByID,
    getCiudadesByCity,
    createCiudades,
    updateCiudades,
    deleteCiudades
}; 