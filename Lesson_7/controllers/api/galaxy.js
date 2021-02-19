const jwt = require('jsonwebtoken');
const models = require('../../models');
const config = require('../../config');

exports.getTasks = (req, res, next) => {
    models.Galaxy.findAll().then(([rows, fieldData]) => {
        res.json({ tasks: rows });
    })
}

exports.createTask = (req, res, next) => {
    models.Galaxy.store(req.body).then(([rows, fieldData]) => {
        res.json({ Status: "Task created", newTaskId: rows.insertId});
    })
}
