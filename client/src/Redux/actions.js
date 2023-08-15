export const ADD_POKEMONS = "addPokemons"
export const SET_POKE_DETAIL = "setPokeDetail"
export const ORDER_BY_NAME_ASCENDENT = "orderByNameAscend"
export const ORDER_BY_NAME_DESCENDENT = "orderByNameDescend"
export const ORDER_BY_ID = "orderByID"
export const ORDER_BY_ATTACK_DES  = "orderByAttackDescend"
export const ORDER_BY_ATTACK_ASC  = "orderByAttackAscend"
export const FILTRER_BY_TYPE =  "filtrerByType"
export const FILTRER_BY_ORIGIN =  "filtrerByOrigin"
export const SET_INDEX_CARD =  "setIndexCard"
export const FILTRER_BY_NAME = "filtrerByName"
////////////////// Pokemons loaders ////////////////

export const addPokemon = (pokeArray)=>{
    return {type:ADD_POKEMONS,
        payload:pokeArray}
}
export const setPokeDetail = (pokemon)=>{
    return {type:SET_POKE_DETAIL,
        payload:pokemon}
}
export const setIndexCard = (indexValue)=>{
    return {type:SET_INDEX_CARD,
        payload:indexValue}
}
//////////////// Order Actions //////////////////////

export const orderByNameAscend = ()=>{
    return {type:ORDER_BY_NAME_ASCENDENT}
}
export const orderByNameDescend = ()=>{
    return {type:ORDER_BY_NAME_DESCENDENT}
}
export const orderByID = ()=>{
    return {type:ORDER_BY_ID}
}
export const orderByAttackDescend = ()=>{
    return {type:ORDER_BY_ATTACK_DES}
}
export const orderByAttackAscend = ()=>{
    return {type:ORDER_BY_ATTACK_ASC}
}

//////////////////// Filtrers /////////////////////////

export const filtrerByType = (type)=>{
    return {type:FILTRER_BY_TYPE,payload: type}
}
export const filtrerByName = (name)=>{
    return {type:FILTRER_BY_NAME, payload: name}
}

export const API_ORIGIN = "API"
export const DB_ORIGIN = "DB"
export const ALL_ORIGIN = "ALL"
export const filtrerByOrigin = (origin)=>{
    return {type:FILTRER_BY_ORIGIN,payload: origin}
}

