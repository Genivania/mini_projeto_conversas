/*****************************************************************************
 * Objetivo: Criar um a API para manipulação de dados de conversas
 * Autor: Genivania Macedo
 * Data: 17/03/2023
 * Versão: 1.0
 ****************************************************************************/

//Import das dependências para criar a API
//Responsavel pelas requisições das conversas
const express = require('express');
//Responsavel pelas permissões das requisições
const cors = require('cors');
//Responsavel pelas manipulações do body(corpo) da requisições
const bodyParser = require('body-parser');

//Import do arquivo de funções
const contatos = require('./modulo/contatos.js');
const { request, response } = require('express');

//Criar um objeto com as informações da classe express
const app = express();

//Permissões no header da API
app.use((request, response, next) => {

    //permite gerenciar a origem das requisições da API
    response.header('Access-Control-Allow-Origin', '*')

    //Permite gerenciar quais verbos (metodos) poderão fazer requisições
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //ativa no cors das requisições as permissões estabelecidas
    app.use(cors())

    next()
});

//endPoints
app.get('/v1/whatsapp/usuario', cors(), async function(request, response, next){

    let numberUsuario = request.query.number;
    let statusCode;
    let dadosUsuario ={};

    //Tratamento para validar os valores encaminhados no parametro
    if (numberUsuario == '' || numberUsuario == undefined || isNaN(numberUsuario)) {
        statusCode = 400;
        dadosUsuario.message = "Não é possivel processar a requisição pois não atende a quantidade de caracteres ";
    } else {
        //Chama a função que filtra o estado pela sigla
        let contato = contatos.getContatoUsuario(numberUsuario);

        //Valida se houve retorno válido da função
        if (contato) {
            statusCode = 200; // Estado encontrado
            dadosUsuario = contato;
        } else {
            statusCode = 404; // Estado não encontrado
        }
    }
    response.status(statusCode);
    response.json(dadosUsuario);
}); 
//console.log(contatos.getContatoUsuario('11987876567'))


app.get('/v1/whatsapp/mensagem', cors(), async function(request, response, next){

    let idContato = request.query.id;
    let statusCode;
    let dadosContato = {};
    
    if (idContato == '' || idContato == undefined || isNaN(idContato)) {
        statusCode = 400;
        dadosContato.message = "Não é possivel processar a requisição pois não atende a quantidade de caracteres ";
    } else {
        //Chama a função que filtra o estado pela sigla
        let contato = contatos.getContatos(idContato);

        //Valida se houve retorno válido da função
        if (contato) {
            statusCode = 200; // Estado encontrado
            dadosContato = contato;
        } else {
            statusCode = 404; // Estado não encontrado
        }
    }
    response.status(statusCode);
    response.json(dadosContato);
}); 

//permite carregar os endpoint criados e aguardar as requisições
//pelo prootocolo http na porta 8080
app.listen(8080, function () {
    console.log('Servidor aguardando requisições na porta 8080.')
})

