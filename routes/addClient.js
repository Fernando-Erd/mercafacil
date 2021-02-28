require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
const express = require('express')
const addClientApp = express.Router();
const verifyAuth = require('../middlewares/verifyAuth');
const poolPostgress = require('../pool/postgressPool');
const poolMySQL = require('../pool/mysqlPool');
const StringMask = require('string-mask');

async function insertMacapa(contacts){
    let formatter = new StringMask("+00 (00) 00000-0000", { reverse: true });
    poolMySQL.getConnection((err, connection) => {
        if(err) return next(err);
        let values = [];
        let sql = "INSERT INTO contacts (nome, celular) VALUES ?";
        contacts.forEach(element => {
            element["cellphone"] = formatter.apply(element["cellphone"]);
            values.push([element["name"].toUpperCase(),element["cellphone"]]);
        });
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
        });
    });
    return "Inserido com sucesso no banco MySQL!!!!";
}

async function insertVarejao(contacts){
    contacts.forEach(element => {
        element['cellphone'] = element['cellphone'].substring(0,4) + element['cellphone'].substring(5, element['cellphone'].length)
        const newContact = poolPostgress.query(
            "INSERT INTO contacts (nome, celular) VALUES ($1, $2)",
            [element['name'], element['cellphone']]
        );
    });
    return "Inserido com sucesso no banco Postgress!!!";
}

addClientApp.post('/', verifyAuth, async (req, res) => {
    const { contacts } = req.body;
    if (contacts === undefined) {
        res.json({message: "Ops, o body está vazio"});
    } else {
        try {
            if (req.userId === 1) {
                result = await insertMacapa(contacts);
                res.json({message: result});
            } else if (req.userId === 2) {
                result = await insertVarejao(contacts);
                res.json({message: result});
            } else {
                res.json({message: "Ops, algo de errado aconteceu :c"});
            }
        } catch (err) {
            console.log(err.message);
            req.json({message: err.message});
        }
    }
});

module.exports = addClientApp
