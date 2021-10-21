const express = require('express');
const app = express();
const mysql = require( 'mysql');
const myConnection = require('express-myconnection');
const enrutador = require("./routes/rutas");

//Configuraciones
app.set('puerto',3000);

app.engine('html', require('ejs').renderFile);
app.set('view engine','ejs');

// app.use(express.static(path.join(__dirname,'public')));

// app.set('views',path.join(__dirname,"views"));

app.use(express.urlencoded({extended: false}));

//Base de datos
const dbConfiguracion = {
    host:'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'mentoria'
}
app.use(myConnection(mysql,dbConfiguracion,'single'));


const urlencodedParser = express.urlencoded({extended: false});


// app.get('/', urlencodedParser, (req, res) =>{
//     /* let url = req.url;
//     url = url.substring(url.indexOf('?') + 1);

//     const params = url.split('&');
//     let text = '';
    
//     params.forEach(param => {
//         let object = param.split('=');
//         text += object[0] + ' : ' + object[1] + '<br/>'; 
//     }); */
//     res.send(`<h1>Tus datos son: <br/>
//     Nombre: ${req.query.nombre} <br/>
//     Apellido: ${req.query.apellido} </h1>`);
//     console.log(req.query);
// });

app.use('/', enrutador);

app.listen(app.get('puerto'), () =>{
    console.log('Server...');
});