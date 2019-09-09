const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());


server.get('/api/accounts', (req, res) => {

    db('accounts')
        .then( accounts => {
            res.json(accounts);
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({Error: "There was an error"})
        });
});

server.post('/api/accounts', (req, res) => {
    const newAccount = req.body;

    db('accounts')
        .insert(newAccount)
        .then(([id]) => {
            db('accounts')
                .where({id})
                .then( account => {
                res.json(account);
                })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({Error: "There was an error"})
        });
});

server.get('/api/accounts/:id', (req, res) => {
    const { id } = req.params;

    db('accounts')
        .where({ id })
        .then( ([account]) => {
            res.json(account);
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({Error: "There was an error"})
        });
})

server.put('/api/accounts/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;

    db('accounts')
        .where({ id })
        .update(changes)
        .then((count) => {
            res.status(200).json({message: `successfully updated ${count} accounts `})
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({Error: "There was an error"})
        });
});

server.delete('/api/accounts/:id', (req, res) => {
    const { id } = req.params
    db('accounts')
        .where({id})
        .delete()
        .then((count) => {
            res.status(200).json({message: `successfully deleted ${count} accounts `})
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({Error: "There was an error"})
        });
});


module.exports = server;