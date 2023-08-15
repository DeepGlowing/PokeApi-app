import {useEffect,useState} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import defaultImage from "../assets/missingPokemon.png"

const ViewContainer = styled.div`
background-color: #c3c5ce;
`

const DataContainer = styled.div`
    
`
const Portrait = styled.div`
    
`
const PokeImage = styled.img`
    
`
export default function DetailView() {

  const defaultPokemon = {

        name:  "unknown",
        image: null,
        health: "unknown",
        attack: "unknown",
        defense: "unknown",
        velocity: "unknown",
        height: "unknown",
        weight: "unknown",
        types: ["unknown","unknown"]
   
    }
    
    let pokemonToDetail = useSelector(state => state.detailPokemon)
   let pokeImage = defaultImage


    if (!pokemonToDetail) pokemonToDetail = defaultPokemon
    else pokeImage = pokemonToDetail.image
    if(!pokemonToDetail.image) {pokeImage = defaultImage}

  return (
    <ViewContainer>
        <DataContainer>
            <h1>Nombre: {pokemonToDetail.name}</h1>
            <h3>Salud: {pokemonToDetail.health}</h3>
            <h3>Ataque: {pokemonToDetail.attack}</h3>
            <h3>Defensa: {pokemonToDetail.defense}</h3>
            <h3>Velocidad: {pokemonToDetail.velocity}</h3>
            <h3>Altura: {pokemonToDetail.height}</h3>
            <h3>Peso: {pokemonToDetail.weight}</h3>
            <h3>Tipo:</h3>
            {  pokemonToDetail.types.map((element,index) => {
               return <h3 key={index}>{element}</h3>
            })}

        </DataContainer>
        <Portrait>
            <PokeImage src={pokeImage}></PokeImage>
        </Portrait>
    </ViewContainer>
    
  )
}