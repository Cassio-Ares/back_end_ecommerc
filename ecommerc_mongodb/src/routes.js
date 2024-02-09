function routes(app){
    app.use('/', require('./routes/adm.js'))

    app.use('/', require('./routes/client.js'));
    app.use('/', require('./routes/typeOfDoc.js'));

    app.use('/', require('./routes/category.js'))
    app.use('/', require('./routes/supplier.js'));
    app.use('/', require('./routes/products.js'));


    app.use('/', require('./routes/orders.js'));
    app.use('/', require('./routes/ordersDetails.js'))
    app.use('/', require('./routes/orderStatus'));
    app.use('/', require('./routes/payment.js'));


   
    return
}

module.exports = routes


