import express, { response } from "express";

const app = express()

app.get('/ads', (request, response) => {
    return response.json([
         {id: 1, name: 'anuncio 1'},
         {id: 2, name: 'anuncio 2'},
         {id: 3, name: 'anuncio 3'},
         {id: 4, name: 'anuncio 4'},
         {id: 5, name: 'anuncio 5'},
    ])

})
app.listen(3333)