// GOAL: Configurações do Express, ou seja, alterações no servidor.

const express = require('express');
const consign = require('consign');


module.exports = () => {
    const app = express();

    // adicionando Parser para o app usar. urlencoded: presente em alguns formulários web.
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    // Consign: agrupa todos as rotas no app (instancia de servidor.)
    consign().include('controllers').into(app);

    return app;
}
