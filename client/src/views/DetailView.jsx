import {useEffect,useState} from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import defaultImage from "../assets/missingPokemon2.png"
import NavBar from '../components/Nav'

const ViewContainer = styled.div`
background-color:#c3c5ce;
  width: 3600px;
  height: 900px;
`

const DataContainer = styled.div`
  width: 600px;
  height: 600px;
  margin-left: 100px;
`
const Portrait = styled.div`
margin-right: 30px;
    
`
const PokeImage = styled.img`
    
`
const CenteredCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 900px;
  height: 700px;
  margin-top: 70px;
  position: absolute;
  background-color: #ebeffa;
  margin-left: 26%;
  border: 1px solid #ccc;
  border-radius: 8px;
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
    <div>
       <NavBar></NavBar>
       <ViewContainer>
      <CenteredCard>
 
        <DataContainer>
              <h1>Name: {pokemonToDetail.name}</h1>
              <h3>Health: {pokemonToDetail.health}</h3>
              <h3>Attack: {pokemonToDetail.attack}</h3>
              <h3>Defense: {pokemonToDetail.defense}</h3>
              <h3>Velocity: {pokemonToDetail.velocity}</h3>
              <h3>Height: {pokemonToDetail.height}</h3>
              <h3>Weight: {pokemonToDetail.weight}</h3>
              <h3>Type:</h3>
              {  pokemonToDetail.types.map((element,index) => {
                return <h3 key={index}>{element}</h3>
              })}

          </DataContainer>
          <Portrait>
              <PokeImage src={pokeImage}></PokeImage>
          </Portrait> 
      </CenteredCard>
 
    </ViewContainer>
    </div>

    
  )
}