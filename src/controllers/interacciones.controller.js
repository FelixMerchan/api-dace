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
    const query = `SELECT id_interaccion, fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, 
	                i.id_cliente, apellido_cli, nombre_cli, i.id_usuario, nombre_usu, i.id_agencia, nombre_age, 
	                i.id_canal, nombre_can, i.id_tema, nombre_tema FROM interacciones i
                    INNER JOIN usuarios u ON i.id_usuario = u.id_usuario INNER JOIN agencias a ON i.id_agencia = a.id_agencia
                    INNER JOIN canal n ON i.id_canal = n.id_canal INNER JOIN temas t ON i.id_tema = t.id_tema
                    INNER JOIN clientes o ON i.id_cliente = o.id_cliente;`;

    try {
        const { rows: interacciones} = await pool.query(query);

        const promesaInteracciones = interacciones.map( async(interaccion) => {
            const { id_interaccion } = interaccion;

            const { rows: motivos } = await pool.query(`SELECT d.id_motivo, m.categoria_moti 
                                                        FROM det_interaccion_motivo d INNER JOIN motivos m ON d.id_motivo = m.id_motivo 
                                                        WHERE id_interaccion = $1`, [id_interaccion]);
            interaccion.motivos = motivos;

            return interaccion;
        });

        const interaccinesConMotivos = await Promise.all(promesaInteracciones);
        
        return res.status(200).json( interaccinesConMotivos );

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al buscar' });
    }
    
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
    const { fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_agencia, id_canal, id_tema, id_cliente, motivos } = req.body;
    let { uid: id_usuario } = req.user;

    try {
        
        const query = 'INSERT INTO interacciones (fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_usuario, id_agencia, id_canal, id_tema, id_cliente) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [fecha, cant_mensaje, nombre_graba, observacion, duracion_llamada, id_usuario, id_agencia, id_canal, id_tema, id_cliente];

        const result = await pool.query(query, values);
        const interaccion = result.rows[0];

        // GUARDAR MOTIVO
        for (const motivo of motivos) {
            const queryMotivo = 'INSERT INTO det_interaccion_motivo (id_interaccion, id_motivo) VALUES($1, $2);';
            const valuesMotivo = [interaccion.id_interaccion, motivo.id_motivo];
            await pool.query(queryMotivo, valuesMotivo);
        }

        interaccion.motivos = motivos;

        return res.status(200).json({
            interaccion,
            message: 'interaccion added'
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ 
            error: 'Error al insertar' 
        });
    }
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