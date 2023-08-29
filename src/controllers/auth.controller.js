const { response } = require("express");
const bcrypt = require('bcryptjs');
const pool = require("../database/db");
const { generarJWT } = require("../helpers/jwt");

const login = async(req, res = response) => {
  const {username, password } = req.body;

  try {
    
    const { rows } = await pool.query("SELECT * FROM usuarios;");
    const existeUsuario = rows.find( e => e.user === username );

    console.log("Encontrado: ", existeUsuario );

    if (!existeUsuario ) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado"
      });
    }

    // Verificar la contraseña
    const validPassword = bcrypt.compareSync( password, existeUsuario.password);
    if( !validPassword ){
      return res.status(400).json({
        success: false,
        message: 'Credenciales invidalidas'
      });
    }

    console.log( existeUsuario.id_usuario);

    // GENERAMOS EL TOKEN - JWT
    const token = await generarJWT( existeUsuario.id_usuario );

    res.json({
      success: true,
      token
    });

  } catch (err) {
    console.log( err );
    res.status(500).json({
      success: false,
      message: err.message
    });
    
  }
};

const renewToken = async(req, res=response) => {

};

module.exports = {
  login,
  renewToken
}