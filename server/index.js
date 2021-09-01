const express = require('express');
const mysql = require('mysql2');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3030;



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

app.post("/inserisciContatto", async (req, res) => {
    let id;
    connection.query(`INSERT INTO Contatti (id,Nome,Cognome) VALUES (NULL,'${req.body.nome}','${req.body.cognome}')`, (err, results, fields) => {
        if (err) {
            console.log(err)
            return res.json({ msg: "Inserimento errato!" })
        } else {
            id = results.insertId
            for (let i = 0; i < req.body.numero.length; i++) {
                connection.query(`INSERT INTO numeri (id,numero,idContatto) VALUES (NULL,'${req.body.numero[i]}','${id}')`, (err, results, fields) => {
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




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));