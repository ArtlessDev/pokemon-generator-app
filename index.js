const pokemonPlus = require('pokemon-plus');
const axiosRequest = require('axios')
const express = require('express');
const app = express()

app.use(express.json())
//process.env.PORT will only work on heroku and not localhost 
app.listen(process.env.PORT || 3000, function(req, res) {
    console.log('server is up and running')
})

function Pokemon(name, dex, img){
    this.name = name;
    this.dex = dex;
    this.img = img;
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/pokemon-generated', function(req, res){
    var pkmn
    var selectedPokemon = pokemonPlus.random(); 
    axiosRequest
    .get('https://pokeapi.co/api/v2/pokemon/' + selectedPokemon.toLowerCase())
    .then(response => {
        pkmn = new Pokemon(response.data.name, response.data.id, response.data.sprites.front_default)
        //console.log(pkmn)

        res.write(`<h1 id="pkmnName">${pkmn.name}</h1>`)
        res.write(`<h2 id="pkmnDex">${pkmn.dex.toString()}</h2>`)
        res.write(`<img id="pkmnImg" src="${pkmn.img}"/>`)
        res.write('<form action="/" method="get"><button id="newMon" type="submit" name="newMon">return</button></form>')

    })
    .catch(err => {
        console.error('ERROR: ' + err)
        res.sendFile(__dirname + 'index.html')
    })
    .finally(() => {
        res.send()
    })
})