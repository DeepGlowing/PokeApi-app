import React from 'react'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {setPokeDetail} from "../Redux/actions.js"
import defaultImage from "../assets/missingPokemon.png"

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

const Cilinder = styled.div`
background-color: #88829e8b;
max-width: 220px;
max-height: 220px;
margin-top: 5px;
margin-bottom: 5px;
margin-left: 5px;
margin-right: 5px;
position: relative;
border-radius: 200px;
//box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);

`
const ImgCard = styled.img`
max-width: 250px;
max-height: 250xp;



`
const PokeName = styled.h3`
font-size: larger;
height: 0.5rem;
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top: 0;
color: #131212;

`
const PokeCardBox = styled.div`
justify-content: center;
`

const CardContainer = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
margin-top: 0.99rem;
background-color: #7d7d8087;

`
const TypesContainer = styled.div `
display: flex;
flex-wrap: wrap;
justify-content: center;
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

  return (
    <CardContainer>
        <PokeCardBox onClick={redirectToDetail}>
        <PokeName>{pokemon.name}</PokeName>
            <Cilinder>
                <ImgCard src={image}></ImgCard>
            </Cilinder>
        <PokeName>{pokemon.types[0]}</PokeName>
        <PokeName>{pokemon.types[1]}</PokeName>
        </PokeCardBox>
    </CardContainer>

  )
}
