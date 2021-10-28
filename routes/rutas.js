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
enrutador.post("/mentores", (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, con) => {
        var data = {
            codigo          : input.codigo,
            nombre          : input.nombre,
            apellido        : input.apellido,
            nivel           : input.nivel,
            hoja_vida       : input.hoja_vida
        };
        con.query('INSERT INTO mentor set ? ', data,(err, mentores) => {
            if (err) console.log(err);
            res.redirect('/')
        });
    });
});
enrutador.delete("/mentores/(:id)", (req, res) => {
    var mentor = { id: req.params.id }

    req.getConnection((err, con) => {
        con.query('DELETE FROM mentor WHERE codigo = ' + req.params.id, mentor,(err, mentores) => {
            if (err) console.log(err);
            res.redirect('/')
        });
    });
});
enrutador.put("/mentores/:id", (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    var codigo = req.params.id;

    req.getConnection((err, con) => {
        var data = {
            nombre          : input.nombre,
            apellido        : input.apellido,
            nivel           : input.nivel,
            hoja_vida       : input.hoja_vida
        };
        con.query("UPDATE mentor set ? WHERE codigo = ? ",[data,codigo], (err, mentores) => {
            if (err) console.log(err);
            res.redirect('/')
        });
    });
});
enrutador.put("/mentores/save", (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection((err, con) => {
        var data = {
            codigo          : input.codigo,
            nombre          : input.nombre,
            apellido        : input.apellido,
            nivel           : input.nivel,
            hoja_vida       : input.hoja_vida
        };
        con.query('INSERT INTO mentor set ? ', data,(err, mentores) => {
            if (err) console.log(err);
            res.redirect('/')
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
