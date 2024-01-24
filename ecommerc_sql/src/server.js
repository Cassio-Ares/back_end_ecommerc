const app = require('./index');

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log(`Rodando na port ${PORT}`);
})