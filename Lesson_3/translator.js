const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express()
const urlencodedParser = bodyParser.urlencoded({extended: false});
const yaToken = process.env.yaToken;
const folderId = process.env.folderId;

app.get('/translate', urlencodedParser, function (request, response) {
    response.sendFile(__dirname + '/translator.html')
});

function getTranslate(textToTranslate, folderToken, yaTokenId) {
    return axios({
        method: "post",
        baseURL: "https://translate.api.cloud.yandex.net",
        url: "/translate/v2/translate/",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + yaTokenId,
        },
        data: {
            folder_id: folderToken,
            texts: textToTranslate,
            targetLanguageCode: "ru",
        },
    })
}

function getResult(inputText, folderId, yaToken) {
     return getTranslate(inputText, folderId, yaToken)
         .then(result => result.data.translations)
         .catch(err => console.error(err));
 }

app.post('/translate', urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400)

    getResult(request.body.inputBox, folderId, yaToken)
        .then(result => {
            console.log(result);
            response.send(
                `${request.body.inputBox} - ${result.map(item => item.text)}`
            )
        })
    .catch(err => console.log("error"))

});

app.get('/', function (request, response) {
    response.send('Главная страница')
});

app.listen(3000);
