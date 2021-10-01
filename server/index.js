const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const Joi = require('joi');
const app = express();
const PORT = process.env.PORT || 3031;



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'rubrica'
})


app.use(cors())
app.use(express.json());

connection.connect();
try {
    connection.query(`CREATE TABLE Contatti(
            id int(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            Nome varchar(20),
            Cognome varchar(20));`, (error, results, fields) => {
        if (error)
            console.log(error.sqlMessage);
        //console.log(results);
    });

    connection.query(`CREATE TABLE Numeri(
        id int(6) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        numero varchar(30),
        tipologia varchar(20),
        idContatto int(4),
        CONSTRAINT FK_ContattoId FOREIGN KEY (idContatto)
        REFERENCES Contatti(id)
        ON DELETE CASCADE)`, (error, results, fields) => {
        if (error)
            console.log(error.sqlMessage);
        //console.log(results);
    });


} catch (err) {
    console.log(err)
}


const schema = Joi.object({
    nome: Joi.string().allow('')
        .alphanum()
        .max(30),

    cognome: Joi.string().allow('')
        .alphanum()
        .max(30),


    tipo: Joi.string().allow(''),

    numero: Joi.string().allow(''),

})


app.post("/inserisciContatto", async (req, res) => {
    let id;
    connection.query(`INSERT INTO Contatti (id,Nome,Cognome) VALUES (NULL,'${req.body.nome}','${req.body.cognome}')`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ msg: "Inserimento errato!" })
        } else {
            id = results.insertId
            for (let i = 0; i < req.body.numero.length; i++) {
                connection.query(`INSERT INTO numeri (id,numero,tipologia,idContatto) VALUES (NULL,'${req.body.numero[i].num}','${req.body.numero[i].tipo}','${id}')`, (err, results, fields) => {
                    if (err) {
                        console.log(err)
                        return res.json({ msg: "Inserimento errato!" })
                    }
                });

            }
        }
    });


    return res.json({ msg: "Inserimento avvenuto con successo!" })
})

app.get("/listaContatti", (req, res) => {
    //SELECT * FROM contatti INNER JOIN  numeri ON contatti.id = numeri.idContatto;
    connection.query(`SELECT * FROM contatti INNER JOIN  numeri ON contatti.id = numeri.idContatto`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ msg: "Inserimento errato!" })
        }

        return res.json(results)

    });

});

app.delete("/eliminaContatto", async (req, res) => {
    connection.query(`DELETE FROM contatti WHERE id = ${req.body.id}`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ status: false })
        }


    });


    return res.json({ status: true })
})

app.delete("/eliminaNumero", async (req, res) => {
    connection.query(`DELETE FROM numeri WHERE id = ${req.body.id}`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ status: false })
        }


    });


    return res.json({ status: true })
})

app.post("/inserisciNumero", async (req, res) => {
    console.log(req.body)
    if (req.body.id) {
        connection.query(`UPDATE numeri SET 
                        numero="${req.body.num}" 
                        WHERE id=${req.body.id}`, (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.json({ status: false })
            }

        });
    }
    else {
        connection.query(`INSERT INTO numeri (numero,tipologia, idContatto) VALUES ("${req.body.num}","${req.body.tipo}",${req.body.idContatto})`, (err, results, fields) => {
            if (err) {
                console.log(err)
                return res.json({ status: false })
            }


        });


    }

    return res.json({ status: true })
})


app.post("/aggiornaContatto", async (req, res) => {
    connection.query(`UPDATE contatti SET Nome="${req.body.nome}", 
    Cognome="${req.body.cognome}" 
    WHERE id=${req.body.id}`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ status: false })
        }

    });

    return res.json({ status: true });
})

app.post("/cercaContatto", async (req, res) => {

    const { error, value } = schema.validate(req.body);
    if (error) return res.json({ error: error.details })
    connection.query(`SELECT * FROM contatti INNER JOIN numeri ON contatti.id = numeri.idContatto
                    WHERE Nome LIKE "${req.body.nome}%" AND 
                    Cognome LIKE "${req.body.cognome}%" AND 
                    tipologia LIKE "${req.body.tipo}%" AND
                    numero LIKE "${req.body.numero}%";`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ status: false })
        }

        return res.json(results);
    });

})




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));