const { Router } = require('express');
const {getAllPokemons,getPokeById,getPokeByName,addPokemon,getPokeTypes} = require("../pokemonControllers.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons",getAllPokemons)

// accede por: /pokemons/name?nombre=pokemonname
router.get("/pokemons/name",getPokeByName);


router.get("/pokemons/:idPokemon",getPokeById)


router.post("/pokemons",addPokemon)

router.get("/types",getPokeTypes)

module.exports = router;
