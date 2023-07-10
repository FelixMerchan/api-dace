const { Pool } = require('pg');

const pool = new Pool({
    host: '35.239.172.154',
    user: 'rootdace',
    password: 'dace1234',
    database: 'callcenter',
    port: '5432'
});

const getClientes = async(req, res) => {

}

const getClientesByID = async(req, res) => {

}

const getClientesByCedula  = async(req, res) => {
    console.log("object");    
    
}