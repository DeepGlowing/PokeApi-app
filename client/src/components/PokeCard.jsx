import React from 'react'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {setPokeDetail} from "../Redux/actions.js"
import defaultImage from "../assets/missingPokemon2.png"
import pokeballLogo from "../assets/pokeballLogo.png"

/* const pokemon = {
    pokeData: {   
        "name":  "pipo",
        "image": "../assets/missingPokemon.png",
        "health": 32,
        "attack": 14.5,
        "defense": 16.0,
        "velocity": 3.5,
        "height": 1.50,
        "weight": 60.7,
    },
    pokemonTypes: ["Fire","Normal"] 
} */

const colorTypes = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "steel": "#B7B7CE",
    "fairy": "#D685AD"
  }
 

const Cilinder = styled.div`
max-width: 220px;
max-height: 220px;
margin-top: 5px;
margin-bottom: 5px;
margin-left: 5px;
margin-right: 5px;
position: relative;
border-radius: 200px;
box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`
const ImgCard = styled.img`
max-width: 220px;
max-height: 220xp;
position: relative;
z-index: 2;
top: -224px;

`
const ImgBall = styled.img`
max-width: 220px;
max-height: 220xp;
opacity: 30%;
position: relative;
overflow: hidden;
z-index: 1;


`
const PokeName = styled.h3`
font-size: larger;
height: 0.5rem;
justify-content: center;
margin-top: 0;
color: white;
text-align: center;
margin: 3px;
font-size: 35px;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
font-family: 'Passion One';
position: relative;
top: -25px;
-webkit-text-stroke: 0.5px black; 

`
const TypeNameColor = styled.div`
padding: 14px;
background-color: ${props => (props.$colorType)};
border-radius: 2rem;
font-size: larger;
height: 0.5rem;
justify-content: center;
color: white;
text-align: center;
margin: 3px;
position: relative;
z-index: 4;
top: -15px;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
`
const TypeName = styled.div` 
font-size: larger;
color: white;
text-align: center;
font-size: 25px;
font-family: 'Passion One';
position: relative;
z-index: 4;
top: -8px;
text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
`

const PokeCardBox = styled.div`
justify-content: center;
margin-top: 30px;
`

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
border-radius: 5px;
background-color: #7d7d8016;

`
const TypesContainer = styled.div `
display: flex;
flex-wrap: wrap;

justify-content: space-around;
`

export default function Card({pokemon}) {



    const navigate = useNavigate()
    const dispatch = useDispatch()
    let image = defaultImage
    if(pokemon.image != null) {image = pokemon.image}

    function redirectToDetail(){
        dispatch(setPokeDetail(pokemon))
        navigate("/detail")
    }

    function upFirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

  return (
    <CardContainer>
        <PokeCardBox onClick={redirectToDetail}>

        <PokeName>{upFirst(pokemon.name)}</PokeName>
            <Cilinder>
            <ImgBall src={pokeballLogo}></ImgBall>
            <div>
            <ImgCard src={image}></ImgCard>
            </div>
            
                
               
            </Cilinder>
        <TypesContainer>
            <TypeNameColor $colorType = {colorTypes[pokemon.types[0]]}>
               <TypeName>{pokemon.types[0].toUpperCase()}</TypeName> 
            </TypeNameColor>

            { pokemon.types[1]?<TypeNameColor $colorType = {colorTypes[pokemon.types[1]]} >
               <TypeName>{pokemon.types[1].toUpperCase()}</TypeName> 
                </TypeNameColor>: null }
             
        </TypesContainer>

        </PokeCardBox>
    </CardContainer>

  )
}
