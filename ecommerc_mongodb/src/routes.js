function routes(app){
    app.use('/', require('./routes/client.js'));
    return
}

module.exports = routes