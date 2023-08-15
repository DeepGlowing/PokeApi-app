import { useFetcher } from "react-router-dom"
import { ADD_POKEMONS,SET_POKE_DETAIL,ORDER_BY_NAME_DESCENDENT,ORDER_BY_NAME_ASCENDENT,ORDER_BY_ID,
   ORDER_BY_ATTACK_DES,ORDER_BY_ATTACK_ASC, FILTRER_BY_TYPE,SET_INDEX_CARD,FILTRER_BY_NAME,FILTRER_BY_ORIGIN } from "./actions"

const initialState = {
    localPokemons: [],
    showingPokemons: [],
    pokemonsDB: [],
    currentCardPageIndex: 0,
    filtrer: 0,
    detailPokemon: null,
    dataOrigin: "DB"
}

function reducer (state = initialState ,{type,payload}){
    switch(type){
                        
        case ADD_POKEMONS: return {...state,  localPokemons: payload.api,  pokemonsDB: payload.db, showingPokemons: [...payload.api,...payload.db], tfiltrer: 12}

        case SET_POKE_DETAIL: return {...state, detailPokemon: payload}

        case SET_INDEX_CARD: return {...state, currentCardPageIndex: payload}

        case ORDER_BY_NAME_DESCENDENT: {
            
           /*  const orderPokemons = state.showingPokemons.sort((i, j) => i.name.localeCompare(j.name))
           
           La declaracion anterior no funciona. Esto se debe a que redux no es capas de notar un cambio en la propiedad
           de estado "showingPokemons" ya que el metodo sort devuelve una referencia a el mismo array pero con los valores ordenados. 
           Debido a esto, es necesario asegurarse de crear un nuevo array totalmente distinto para detectar el cambio.
           
           */
            const orderPokemons = [...state.showingPokemons].sort((i, j) => i.name.localeCompare(j.name))
            return {...state,  showingPokemons: orderPokemons, filtrer: 1}
         }
         case ORDER_BY_NAME_ASCENDENT: {
             const orderPokemons = [...state.showingPokemons].sort((i, j) => j.name.localeCompare(i.name))
             return {...state,  showingPokemons: orderPokemons, filtrer: 2}
          }
          case ORDER_BY_ID: {
            // Añadir los pokemones de la db siempre primeros ya que su id es diferente
            const pokeToOrder = [...state.showingPokemons]
            const pokAPI = []
            const pokDB = []
            for (let i = 0; i < pokeToOrder.length; i++) {
               if ( typeof pokeToOrder[i].id === "number"){pokAPI.push(pokeToOrder[i])}
               else {pokDB.push(pokeToOrder[i])}  
            }
            let orderPokemons = pokAPI.sort((a, b) => a.id - b.id)
            orderPokemons = [...pokDB,...orderPokemons]
            console.log(orderPokemons)
            return {...state,  showingPokemons: orderPokemons, filtrer: 3}
         }
         case ORDER_BY_ATTACK_DES: {
            const orderPokemons = [...state.showingPokemons].sort((a, b) => a.attack  - b.attack)
            return {...state,  showingPokemons: orderPokemons, filtrer: 4}
         }
         case ORDER_BY_ATTACK_ASC: {
            const orderPokemons = [...state.showingPokemons].sort((a, b) => b.attack - a.attack)
            return {...state,  showingPokemons: orderPokemons,currentCardPageIndex: 0, filtrer: 5}
         }
         case FILTRER_BY_ORIGIN:
            switch (payload) {
               case "API":
                 return  {...state,  dataOrigin: payload, showingPokemons: [...state.localPokemons], filtrer: 9} 
               case "DB":
                  return  {...state,  dataOrigin: payload, showingPokemons: [...state.pokemonsDB], filtrer: 10} 
               case "ALL":
                  return  {...state,  dataOrigin: payload, showingPokemons: [...state.localPokemons,...state.pokemonsDB], filtrer: 11} 
               default:
                  break;
            }
            return {...state,  dataOrigin: payload}

         case FILTRER_BY_TYPE: {
            let filtredPokemons = []
            switch (state.dataOrigin) {
               case "API":
                  if(
                     payload === "all"){filtredPokemons = [...state.localPokemons]
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 17}
                  }
                  else { 
                     filtredPokemons = [...state.localPokemons].filter( (pokemon) => pokemon.types.includes(payload)  )
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 18}
                  }

               case "DB":
                  if(payload === "all"){ 
                     filtredPokemons = [...state.pokemonsDB]
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 15}
                  }
                  else{  
                     filtredPokemons = [...state.pokemonsDB].filter( (pokemon) => pokemon.types.includes(payload)  )
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 16}
                  }
                
               case "ALL":
                  if(payload === "all"){
                     filtredPokemons = [...state.localPokemons,...state.pokemonsDB]
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 14}
                  }
                  else {
                     filtredPokemons = [...state.localPokemons,...state.pokemonsDB].filter( (pokemon) => pokemon.types.includes(payload)  )
                     return {...state,  showingPokemons: filtredPokemons, filtrer: 6}
                  }
      
                  console.log("Filtred All ",state.showingPokemons)
                  
               default:
                  break;
            }
           
         }
         case FILTRER_BY_NAME: {
            
            return {...state,  showingPokemons: [payload], filtrer: -payload.id}
         }

        default:
            return state
    }
}

export default reducer