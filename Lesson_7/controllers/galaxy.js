const models = require('../models');

exports.index = (request, response, next) => {
    if (!request.session.username) {
        response.redirect('/auth/login/');
    } else {
        models.Galaxy.findAll().then(([rows, fieldData]) => {
            response.render('galaxies', {items: rows});
        }).catch(error => {
            response.render('galaxies', {error});
        });
    }
}

exports.show = (request, response, next) => {

}

exports.update = (request, response, next) => {

}

exports.store = (request, response) => {
    models.Galaxies.store(request.body).then(result => {
            response.render("index", result);
        }
    ).catch(error => {
        response.render("index", error);
    });
}

exports.destroy = (request, response) => {

}

exports.create = (request, response) => {
    response.render('add');
}

