const express = require('express');
const mysql = require('mysql');

const app = express();

const conexionBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'carros'
});

app.use(express.json());

app.get('/', (req,res)=>{
  res.send('Bienvenido a la venta de vehiculos')
});
app.get('/vehiculos', (req,res)=>{
    const sql = 'SELECT * from tabla'

    conexionBD.query(sql,(err, result) =>{
        if(err) throw err;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('no hay datos')
        }
    })
});
app.get('/vehiculos/:id', (req,res) => {
    const id = req.params.id
    const sql =`SELECT * FROM tabla WHERE idtabla = ${id}`

    conexionBD.query(sql, (err,result) => {
        if(err) throw err;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('error en traer dato')
        }
    } )
});
app.post('/crear-vehiculo', (req,res) => {
    const sql = 'INSERT INTO tabla SET ?'
    const crearVehiculo = {
        idtabla : req.body.idtabla,
        nombre : req.body.nombre,
        fecha_fabricacion : req.body.fecha_fabricacion ,
        valor : req.body.valor,
        cantidad : req.body.cantidad
    }
    conexionBD.query(sql,crearVehiculo, err => {
        if(err) throw err
        res.send('Vehiculo añadido con exito!')
    })
});
app.put('/actualizar-vehiculo/:id', (req,res) => {
    const id = req.params.id
    const {nombre,fecha_fabricacion,valor,cantidad} = req.body
    const sql = `UPDATE tabla SET nombre = '${nombre}', fecha_fabricacion = '${fecha_fabricacion}', valor ='${valor}', cantidad = '${cantidad}' WHERE idtabla = ${id}`
    conexionBD.query(sql, err => {
        if(err) throw err
    })
    res.send('el vehiculo fue actualizado con exito!')
});


app.listen(3000, () =>{
    console.log('Corriendo en puerto 3000')
});

