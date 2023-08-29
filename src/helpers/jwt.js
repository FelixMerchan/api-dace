const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');

const generarJWT = (uid) => {
  return new Promise( (resolve, reject) => {
    const payload = {
      uid
    };

    jwt.sign( payload, secretKey, {
      expiresIn: '12h'
    }, (err, token) => {
      if(err){
        console.error( err );
        reject('No se pudo generar el JWT');
      } else {
        resolve( token );
      }
    });
  });
}

module.exports = {
  generarJWT
}