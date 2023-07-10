const { Pool } = require('pg');

const pool = new Pool({
    host: '35.239.172.154',
    user: 'rootdace',
    password: 'dace1234',
    database: 'callcenter',
    port: '5432'
});

//endpoint para devolver todas las Interacciones
const getInteracciones = async(req, res) => {
    pool.query('select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where interacciones.id_usuario = usuarios.id_usuario, interacciones.id_agencia = agencias.id_agencia, interacciones.id_canal = canal.id_canal, interacciones.id_tema = temas.id_tema',(err, result) => {
       if (err) {
           res.status(500).json({ error: 'Error al buscar' });
       } else {
           res.json(result.rows);
       }
   });
};

//endpoint para devolver las interacciones por un ID determinado
const getInteraccionesByID = async(req, res) => {
    const {id} = req.params;

    const query = `select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where interacciones.id_usuario = usuarios.id_usuario, interacciones.id_agencia = agencias.id_agencia, interacciones.id_canal = canal.id_canal, interacciones.id_tema = temas.id_tema and id_interaccion = $1`;
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




//endpoint para devolver las interacciones por nombre de usuario o por cedula de usuario
const getInteraccionesByUser = async(req, res) => {
    const busqueda = req.params.id;

    const query = `select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where (cedula_usu ilike '%${busqueda}%' or nombre_usu ilike '%${busqueda}%') and interacciones.id_usuario = usuarios.id_usuario`;

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


//endpoint para devolver las interacciones por nombre de agencia
const getInteraccionesByAgencia = async(req, res) => {
    const busqueda = req.params.id;

    const query = `select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where (nombre_age ilike '%${busqueda}%') and interacciones.id_agencia = agencias.id_agencia`;

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

//endpoint para devolver las interacciones por nombre de canal
const getInteraccionesByCanal = async(req, res) => {
    const busqueda = req.params.id;

    const query = `select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where (nombre_can ilike '%${busqueda}%') and interacciones.id_canal = canal.id_canal`;

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

//endpoint para devolver las interacciones por nombre de tema
const getInteraccionesByTema = async(req, res) => {
    const busqueda = req.params.id;

    const query = `select id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, nombre_usu, nombre_age, nombre_can, nombre_tema from interacciones, usuarios, agencias, canal, temas where (nombre_tema ilike '%${busqueda}%') and interacciones.id_tema = temas.id_tema`;

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

//endpoint para crear una interaccion
const createInteracciones = async(req, res) => {
    const { fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_usuario, id_agencia, id_canal, id_tema } = req.body;

    const query = 'INSERT INTO interacciones (fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_usuario, id_agencia, id_canal, id_tema) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
    const values = [fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada,  id_usuario, id_agencia, id_canal, id_tema];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al insertar' });
        } else {
            res.json({
                message: 'interaccion added'
            });
        }
    }); 
};

//endpoint para modificar una interaccion
const updateInteracciones= async(req, res) => {
    const { id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_usuario, id_agencia, id_canal, id_tema } = req.body;

    const query = 'UPDATE interacciones SET fecha = $2, cant_mensaje = $3, nombre_graba = $4, observacion = $5, duracion_llamada = $6, id_usuario = $7, id_agencia = $8, id_canal = $9, id_tema = $10 WHERE id_interaccion = $1';
    const values = [id_agencia, nombre_age, telefono_age, direccion_age, id_ciudad];

    pool.query(query, values,  (err)=>{
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al actualizar' });
        } else {
            res.json({
                message: 'interaccion updated'
            });
        }
    }); 
};

//endpoint para eliminar una interaccion
const deleteInteracciones = async(req, res) => {
    const { id } = req.params;

  // Realizar la lógica de eliminación de la interaccion según el ID proporcionado
  const query = 'DELETE FROM interacciones WHERE id_interaccion = $1';
  const values = [id];

  pool.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar la interaccion' });
    } else if (result.rowCount === 0) {
      res.status(404).json({ error: 'Interaccion no encontrada' });
    } else {
      res.json({ message: 'Interaccion eliminada correctamente' });
    }
  }); 
};

module.exports = { 
    getInteracciones,
    getInteraccionesByID,
    getInteraccionesByUser,
    getInteraccionesByAgencia,
    getInteraccionesByCanal,
    getInteraccionesByTema,
    createInteracciones,
    updateInteracciones,
    deleteInteracciones
}; 