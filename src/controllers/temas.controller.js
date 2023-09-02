const pool = require('../database/db');
//endpoint para devolver todas las temas
const getTemas = async(req, res) => {
     pool.query('select * from temas', (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error al buscar' });
        } else {
            res.json(result.rows);
        }
    });
};

//endpoint para devolver las temas por un ID determinado
const getTemasByID = async(req, res) => {
    const {id} = req.params;

    const query = `select * from temas where id_tema = $1`;
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


//endpoint para crear un tema
const createTemas = async(req, res) => {
    const { nombre_tema, descrip_tema } = req.body;

    const query = 'INSERT INTO temas (nombre_tema, descrip_tema) VALUES ($1, $2)';
    const values = [nombre_tema, descrip_tema];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'Tema added'
            });
        }
    }); 
};

//endpoint para modificar un Tema
const updateTemas= async(req, res) => {
    const {nombre_tema, descrip_tema, id_tema } = req.body;

    const query = 'UPDATE temas SET nombre_tema = $1, descrip_tema = $2  WHERE id_tema = $3';
    const values = [nombre_tema, descrip_tema, id_tema];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'Tema updated'
            });
        }
    }); 
};

//endpoint para eliminar un tema 
const deleteTemas = async(req, res) => {
    const { id } = req.params;

  // Realizar la lógica de eliminación de tema según el ID proporcionado
  const query = 'DELETE FROM temas WHERE id_tema = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar Tema' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Tema no encontrada' });
    } else {
      res.json({ message: 'Tema eliminado correctamente' });
    }
  }); 
};

module.exports = { 
    getTemas,
    getTemasByID,
    createTemas,
    updateTemas,
    deleteTemas
}; 