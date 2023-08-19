const { Router } = require('express');
const {getAllPokemons,getPokeById,getPokeByName,addPokemon,getPokeTypes,getPokemons} = require("../pokemonControllers.js")
const getImage = require("../getImagens.js")
const uploadImage = require("../postImagen.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons",getPokemons)

// accede por: /pokemons/name?nombre=pokemonname
router.get("/pokemons/name",getPokeByName);


router.get("/pokemons/:idPokemon",getPokeById)


router.post("/pokemons",addPokemon)

router.get("/types",getPokeTypes)

router.get("/image/:fileName",getImage)
router.post("/image",uploadImage)

module.exports = router;
