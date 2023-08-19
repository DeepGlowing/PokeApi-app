const { Pokemon,Type } = require('./db.js')
const axios = require("axios")
const re = /[a-zA-Z]/
const initialPage = `https://pokeapi.co/api/v2/pokemon`
let lastPage = `https://pokeapi.co/api/v2/pokemon`

function pokemonFiltrerData (pokemon){
    // Esta funcion filtra los datos que requiere el front de un
    // objeto pokemon brindado por la api y retorna el objeto filtrado
    const detailData = {}
    detailData.id = pokemon.data.id
    detailData.name = pokemon.data.name
    detailData.image = pokemon.data.sprites.other["official-artwork"].front_default 
    detailData.health = pokemon.data.stats[0].base_stat
    detailData.attack = pokemon.data.stats[1].base_stat
    detailData.defense = pokemon.data.stats[2].base_stat
    detailData.speed = pokemon.data.stats[5].base_stat
    detailData.height = pokemon.data.height
    detailData.weight = pokemon.data.weight
    detailData.types = []
    // Se asegura de asignar todos los tipos posibles que tenga el pokemon
    const dataTypes = pokemon.data.types
    for (let index = 0; index < dataTypes.length; index++) {
        detailData.types.push(dataTypes[index].type.name)
    }
    return detailData
}
function pokemonFiltrerDataDB (pokemon){
    // Esta funcion filtra los datos que requiere el front de un
    // objeto pokemon brindado por la DB y retorna el objeto filtrado
    const returnArray = []
    const detailData = {}
    for (let index = 0; index < pokemon.length; index++) {
    
        detailData.id = pokemon[index].id
        detailData.name = pokemon[index].name
        detailData.image = pokemon[index].image
        detailData.health = pokemon[index].health
        detailData.attack = pokemon[index].attack 
        detailData.defense = pokemon[index].defense
        detailData.speed = pokemon[index].speed
        detailData.height = pokemon[index].height
        detailData.weight = pokemon[index].weight
        detailData.types = []
        if (pokemon[index].types[0].name) {detailData.types.push( pokemon[index].types[0].name) } 
        if (pokemon[index].types[1]) {detailData.types.push(pokemon[index].types[1].name )  } 
        
        returnArray.push({...detailData})
        
    }

    return returnArray
}


module.exports = { 
    getAllPokemons: async (req,res)=>{
       // const allPlayer = await playerModel.findAll()

       // Actualmente este metodo pide TODOS los pokemons de la api.
       // Esto requiere una buena cantidad de segundos, quizas deba de presentar menos pokemons en plimer plano.
       try {
        let pokeArray = []
        let nextPokeList = null
        // hace una primera peticion y le asigna valor a nextPokeList
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon`)
        pokeArray = response.data.results
        nextPokeList = response.data.next
       
        // Mientras nextPokeList contenga una siguente ruta,
        // se hace una nueva peticion y se añaden todos los pokemons a pokeArray
        while (nextPokeList) {
            const response = await axios.get(nextPokeList)
            pokeArray.push(...response.data.results)
            nextPokeList = response.data.next
        }
        // Se responde con todos los pokemones de la api encontrados
        res.status(200).send(pokeArray)

       } catch (error) {
        res.status(400).send(error)
       }
       
},

getPokemons: async (req,res)=>{
    try {
        /////////////// Peticion a la API /////////////////
        let pokeArray = []
        // Encadena peticiones para traer todos los resultados de de la API
        const response = await axios.get(lastPage)
        .then( (response) =>{
            pokeArray = response.data.results
           return axios.get(response.data.next) 
        })
        .then( (response) =>{
            pokeArray = [...pokeArray,...response.data.results]
           return axios.get(response.data.next) 
        })
        .then( (response) =>{
            pokeArray = [...pokeArray,...response.data.results]
           return axios.get(response.data.next) 
        })
        .then( (response) =>{
            pokeArray = [...pokeArray,...response.data.results]
            console.log(response.data)
           return axios.get(response.data.next) 
        })
        // En este punto, pokeArray tiene las respuestas de todos los "paginados" de 20
        // Con los que responde la API, y cada respuesta solo contiene el nombre del pokemon
        // y su url, por lo que a continuacion, se recorren todas las url para extraer los pokemones

        let jsonForFrontend = {api:[],db:[]}
        const apiArr = []
         for (let index = 0; index < pokeArray.length; index++) {
            await axios.get(pokeArray[index].url) // entra a la url de cada pokemon para adquirirlo
            .then((response)=>{
                
                apiArr.push(pokemonFiltrerData(response))  // filtra los datos del pokemon en response y devuelve un objeto limpio que se añade al array
            })  
        } 

        //////////// Peticion a la DB ////////////
        jsonForFrontend.api = apiArr

        await Pokemon.findAll({include: Type})
        .then( (response) => {

            jsonForFrontend.db = pokemonFiltrerDataDB(response)

        })

    
        res.status(200).json(jsonForFrontend)

       } catch (error) {
        res.status(400).send(error)
       }
},

getPokeById: async (req,res)=>{
 
    // Solicita a la api el pokemon con el id pasado mediante params
    const id = req.params.idPokemon
    
    if (re.test(id)){ // Si el ID del pokemon contiene una letra, significa que es de la base de datos local
        await Pokemon.findOne({where: {id: id},include: Type})
        .then( (response) => {
            res.send(pokemonFiltrerDataDB ([response])[0])
        } )
        .catch( (error) => { res.status(404).json({msg: "Fallo de busqueda, no se encuentran coincidencias en la base de datos local", error}) } )
    }
    else {          // en cambio, si el ID es solo un numero, el porkemon pertenece a la API
        const detailData = {}
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then( (response) => {           

            res.status(200).send(pokemonFiltrerData (response))
        })
        .catch( (error) => { res.status(404).json({msg: "Fallo de busqueda en api externa, el id no coincide", error}) } )
    }
}, 

getPokeByName: async (req,res)=>{
    
    const pokeFound = []
    const name = req.query.pokeName.toLowerCase()

////////////////// Traer pokemones de la API ////////////////////////////////////////////

     await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then( (response) => {
        pokeFound.push( pokemonFiltrerData (response) )})

    .catch(function (error) {
        console.log({msg: "No se encontraron pokemons con el nombre solicitado en la API",error})})

////////////////// Traer pokemones de la DB ////////////////////////////////////////////

        try {
            const detailData = {}
            const pokemons = await Pokemon.findAll({where: {name: name},include: Type})
            if (pokemons){
                for (let index = 0; index < pokemons.length; index++) {

                    detailData.id = pokemons[index].id
                    detailData.name = pokemons[index].name
                    detailData.image = pokemons[index].image
                    detailData.health = pokemons[index].health
                    detailData.attack = pokemons[index].attack 
                    detailData.defense = pokemons[index].defense
                    detailData.speed = pokemons[index].speed
                    detailData.height = pokemons[index].height
                    detailData.weight = pokemons[index].weight
                    detailData.types = []
                    if (pokemons[index].types[0].name) {detailData.types.push( pokemons[index].types[0].name) } 
                    if (pokemons[index].types[1].name) {detailData.types.push(pokemons[index].types[1].name )  } 
                   
                    pokeFound.push(detailData)
                }
            }

        } catch (error) {
            console.log({msg: "No se encontraron pokemons con el nombre solicitado en la DB",error})
        }

    if (pokeFound.length === 0) return res.status(404).json({msg: "No se encontraron pokemons con el nombre solicitado"})
    else res.status(200).send(pokeFound)


},

getPokeTypes: async (req,res)=>{

    const localDbTypes = await Type.findAll()

    if(localDbTypes.length <= 0) { // Si la db local de tipos esta vacia...
        const PokeTypes = []
        const response = await axios.get(`https://pokeapi.co/api/v2/type`)
        for (let index = 0; index < response.data.results.length; index++) {

            await Type.create( {name:response.data.results[index].name } ) // La rellenamos hasta que tengas todos los tipos de la api
        }
        const filledLocalDbTypes = await Type.findAll()
        res.status(200).send(filledLocalDbTypes) // y la devolvemos una vez rellenada
    }
    else {
        res.status(200).send(localDbTypes) // En cambio, si desde el inicio estubo rellena, la devolvemos.
    }
  
},


addPokemon: async (req,res)=>{
    // Crea una nueva fila para la tabla de Pokemons.
    // El nuevo pokemon toma los parametros del pokeData
    const pokeData = req.body.pokeData
    const pokemonTypes = req.body.pokemonTypes
    
    try {
        const newPokemon = await Pokemon.create(pokeData) // Crea nueva instancia en la tabla Pokemon
        

        for (let index = 0; index < pokemonTypes.length; index++) {
            const typeRef = await Type.findOne({where: {name: pokemonTypes[index]}}) // Busca la referencia del type segun el nombre pasado en el array por body
            newPokemon.addType(typeRef)                                              // Añade el type mediante referencia al nuevo pokemon
        }
        
        res.status(201).json({msg: `Se añadio exitosamente el nuevo pokemon ${newPokemon.name}!`, pokemon: req.body})

    } catch (error) {
        res.status(400).send({msg: "Huvo un promeblas al intentar crear un nuevo pokemon",error})
    }

},
}
/*   ESTRUCTURA DE DATOS PARA EL BODY
{
    pokeData: {   
        "name":  "pipo",
        "image": "imagen bonita",
        "health": 32,
        "attack": 14.5,
        "defense": 16.0,
        "velocity": 3.5,
        "height": 1.50,
        "weight": 60.7,
        
    },
    pokemonTypes: ["type1","type2", "etc"] ,
}
*/