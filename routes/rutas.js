const express = require('express');
const enrutador = express.Router();

enrutador.get( "/", (req,res) => {
    res.render("index.html", {
        titulo: "Inicio"
    });    
});
enrutador.get( "/mentores", (req, res) => {

    req.getConnection((err, con) => {
        con.query('SELECT * FROM mentor', (err, mentores) => {
            if (err) console.log('NO SE PUDO HACER LA CONSULTA');
            res.render("mentores.html", {
                datos: mentores,
                titulo: "Mentores"
            });
        });
    });

});
enrutador.get( "/mentoria", (req, res) => {
    req.getConnection((err, con) => {
        con.query('SELECT * FROM alumno', (err, mentoria) => {
            if (err) console.log('NO SE PUDO HACER LA CONSULTA');
            res.render("mentoria.html", {
                datos: mentoria,
                titulo: "mentoria"
            });
        });
    });  
});
enrutador.get( "/hdv", (req, res) => {
    req.getConnection((err, con) => {
        con.query('SELECT * FROM hoja_vida', (err, hdv) => {
            if (err) console.log('NO SE PUDO HACER LA CONSULTA');
            res.render("hdv.html", {
                datos: hdv,
                titulo: "Hojas de vida"
            });
        });
    });  
});

module.exports = enrutador;
