const { Pokemon,Type } = require('./db.js')
const axios = require("axios")
const re = /[a-zA-Z]/

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

getPokeById: async (req,res)=>{
 
    // Solicita a la api el pokemon con el id pasado mediante params
    const id = req.params.idPokemon
    
    if (re.test(id)){
        await Pokemon.findOne({where: {id: id}})
        .then( (response) => {res.send(response)} )
        .catch( (error) => { res.status(404).json({msg: "Fallo de busqueda, no se encuentran coincidencias en la base de datos local", error}) } )
    }
    else {
        const detailData = {}
        await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then( (response) => {           
                // Completa el objeto detailData con la informacion que brinda la api
            detailData.id = response.data.id
            detailData.name = response.data.name
            detailData.image = response.data.sprites.other["official-artwork"].front_default 
            detailData.health = response.data.stats[0].base_stat
            detailData.attack = response.data.stats[1].base_stat
            detailData.defense = response.data.stats[2].base_stat
            detailData.speed = response.data.stats[5].base_stat
            detailData.height = response.data.height
            detailData.weight = response.data.weight
            detailData.types = []
            // Se asegura de asignar todos los tipos posibles que tenga el pokemon
            const dataTypes = response.data.types
            for (let index = 0; index < dataTypes.length; index++) {
                
                detailData.types.push(dataTypes[index].type.name)
            }
            // Devuelve un objeto con los datos para el detalle que necesita el front-end
            res.status(200).send(detailData)
        })
        .catch( (error) => { res.status(404).json({msg: "Fallo de busqueda en api externa, el id no coincide", error}) } )
    }
}, 

getPokeByName: async (req,res)=>{
    
    const pokeFound = []
    const name = req.query.pokeName.toLowerCase()

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then( (response) => {
        pokeFound.push(response.data)})

    .catch(function (error) {
        console.log(error)})

     await Pokemon.findOne({where: {name: name}})
    .then( (response) =>{
        if (response.length > 0){ // Verifica que haya algo dentro de la respuesta
         pokeFound.push(response[0])}} )

    .catch(function (error) {
        console.log(error)})

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