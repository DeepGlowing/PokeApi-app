import React, { useEffect } from 'react'
import styled from 'styled-components'
import {orderByNameDescend,orderByNameAscend,orderByID,
  orderByAttackAscend,orderByAttackDescend,filtrerByType,
  filtrerByName,filtrerByOrigin,API_ORIGIN,DB_ORIGIN,ALL_ORIGIN} from "../Redux/actions.js"
import {useDispatch} from 'react-redux'
import { useState } from "react"
import axios from "axios"


const ToolsContainer = styled.div`
  background-color: #d6e2ec;
  padding-right: 3rem;
  padding-left: 3rem;
  padding-top: 1rem;
  padding-bottom: 1164px;
  justify-content: flex-start;
  flex-direction: column;
    
`
const TypeButtons = styled.div`
  padding: 3px;
  background-color: ${props => (props.selected ? props.$selectedColor : props.$normalColor)};
  border-radius: 2rem;
  border-color: #d8b4dd;
  color: white;
  text-align: center;
  margin: 3px;
  font-size: 20px;
  font-family: 'Passion One';
  //text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  cursor: pointer;

  &:hover {
    background-color: ${(props)=>(props.$hoverColor)};
    
  }
`
const OrdenContainer = styled.div`
display:  flex;
flex-direction: column;
flex-wrap: nowrap;

`
const OriginContainer = styled.div`
display:  flex;
flex-direction: column;
flex-wrap: nowrap;

`

const AllButton = styled.div`
  padding: 4px;
  background-color: ${props => (props.selected ? `#333333`: `#b8b8b8`)};
  border-radius: 2rem;
  border-color: #d8b4dd;
  color: white;
  text-align: center;
  margin: 3px;
  font-size: 20px;
  //text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
  font-family: 'Passion One';

  cursor: pointer;

  &:hover {
    background-color: ${`#e6e6e6`};
    
  }
`

const pokemonTypes = [
  {name: "fire",normalColor: `#f3a347` ,hoverColor:`#f5c39a`, selectedColor: `#292733`},
  {name: "water",normalColor: `#4a90c9` ,hoverColor:`#9ebaf0`, selectedColor: `#292733`},
  {name: "normal",normalColor: `#b1a59d` ,hoverColor:`#d3bebe`, selectedColor: `#292733`},
  {name: "grass",normalColor: `#4eb34e` ,hoverColor:`#92e496`, selectedColor: `#292733`},
  {name: "electric",normalColor: `#ecd821` ,hoverColor:`#ffec97`, selectedColor: `#292733`},
  {name: "ice",normalColor: `#6ccec9` ,hoverColor:`#9ed9db`, selectedColor: `#292733`},
  {name: "fighting",normalColor: `#c73d6b` ,hoverColor:`#fd6d85`, selectedColor: `#292733`},
  {name: "poison",normalColor: `#a15dc9` ,hoverColor:`#a979c0`, selectedColor:`#292733`},
  {name: "ground",normalColor: `#a0633f` ,hoverColor:`#caab67`, selectedColor:`#292733`},
  {name: "flying",normalColor: `#7b9ddb` ,hoverColor:`#afbcf7`, selectedColor: `#292733`},
  {name: "psychic",normalColor: `#ee5073` ,hoverColor:`#e995aa`, selectedColor: `#292733`},
  {name: "bug",normalColor: `#98c94b` ,hoverColor:`#d9e9ae`, selectedColor: `#292733`},
  {name: "rock",normalColor: `#928961` ,hoverColor:`#ccc6a2`, selectedColor: `#292733`},
  {name: "ghost",normalColor: `#5150a0` ,hoverColor:`#8978d4`, selectedColor: `#292733`},
  {name: "dragon",normalColor: `#226ad6` ,hoverColor:`#a073f3`, selectedColor: `#292733`},
  {name: "dark",normalColor: `#3d4152` ,hoverColor:`#744361`, selectedColor: `#292733` },
  {name: "steel",normalColor: `#59757a` ,hoverColor:`#99b1bb`, selectedColor: `#292733`},
  {name: "fairy",normalColor: `#dd85ca` ,hoverColor:`#f7c6d9`, selectedColor: `#292733`},
  
]

export default function ToolsBar({parentUpdate}) {

   
    const dispatch = useDispatch()
    const [nameValue,setNameValue] = useState("")
    const [typeSelected,setTypeSelected] = useState("water")



////////////// Busqueda por nombre ///////////////////

  function handleChange(event){
    setNameValue(event.target.value)
   
  }
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      console.log('Se inicio la busqueda del pokemon: '+nameValue)
      axios.get(`http://localhost:3001/pokemons/name?pokeName=${nameValue}`)
      .then( (response)=>{
        dispatch(filtrerByName(response.data[0]))})
      .catch( (error) => {
        console.error(error)
        alert("🔍 No existen pokemones con ese nombre, intenta uno distinto. 🤔")
      })
    }
  }

/////////// Seleccion de Tipo /////////////////////

  function typeFill () {
    dispatch(filtrerByType(typeSelected))
    parentUpdate()
  }
  function typeAll () {
    dispatch(filtrerByType("all"))
    setTypeSelected("all")
    parentUpdate()
  }

  function handleItemClick(type) {
    dispatch(filtrerByType(type))
    setTypeSelected(type);
  }
  const typeItems = pokemonTypes.map((type,index) => {
    return <TypeButtons 
    key = {index} 
    value = {type.name}
    $selectedColor = {type.selectedColor}
    $hoverColor = {type.hoverColor}
    $normalColor = {type.normalColor}
    selected={typeSelected === type.name}
    onClick={() => handleItemClick(type.name)}
    >{type.name.toUpperCase()}</TypeButtons> 
  })


/////////// Seleccion de Orden ////////////////////

  function atkFillDes(){
    dispatch(orderByAttackDescend())
    parentUpdate()
  }

  function atkFillAsc (){
    dispatch(orderByAttackAscend())
    parentUpdate()
  }


  function idOrder(){
    dispatch(orderByID())
    parentUpdate() 
  }

  function orderA_Z(){
    dispatch(orderByNameDescend())
    parentUpdate()
  }

  function orderZ_A(){
    dispatch(orderByNameAscend())
    parentUpdate()
    
  }

////////// Seleccion de Origen ////////////////

function originAPI(){
  dispatch(filtrerByOrigin(API_ORIGIN))
  dispatch(filtrerByType(typeSelected))
  parentUpdate()
  
}
function originDB(){
  dispatch(filtrerByOrigin(DB_ORIGIN))
  dispatch(filtrerByType(typeSelected))
  parentUpdate()
  
}
function originALL(){
  dispatch(filtrerByOrigin(ALL_ORIGIN))
  dispatch(filtrerByType(typeSelected))
  parentUpdate()
  
}


  return (
    <ToolsContainer>
          <input
                type="text" 
                name='nameInput'
                value={nameValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Pokemon name..."
          ></input>
        <hr></hr>
        <AllButton  onClick={ typeAll }>All</AllButton >
        {typeItems}
        <hr></hr>
        <OriginContainer>
          <button onClick={ atkFillDes }>Attack Up</button>
          <button onClick={ atkFillAsc }>Attack down</button>
        </OriginContainer>
        <hr></hr>
        <OrdenContainer>
          <button onClick={ idOrder }>Order por ID</button>
          <button onClick={ orderA_Z }>Order A_Z</button>
          <button onClick={ orderZ_A }>Order Z_A</button>
        </OrdenContainer>
        <hr></hr>
        <OriginContainer>
          <button onClick={ originAPI }>Game Pokemons</button>
          <button onClick={ originDB }>My Pokemons</button>
          <button onClick={ originALL }>ALL Pokemons</button>
        </OriginContainer>

    </ToolsContainer>
  )
}
