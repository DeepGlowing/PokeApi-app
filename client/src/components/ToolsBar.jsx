import React from 'react'
import styled from 'styled-components'
import {orderByNameDescend,orderByNameAscend,orderByID,
  orderByAttackAscend,orderByAttackDescend,filtrerByType,
  filtrerByName,filtrerByOrigin,API_ORIGIN,DB_ORIGIN,ALL_ORIGIN} from "../Redux/actions.js"
import {useDispatch} from 'react-redux'
import { useState } from "react"
import axios from "axios"


const ToolsContainer = styled.div`
    display: flex;
    max-height: 100%;
    max-width: 156rem;
    justify-content: flex-start;
    flex-direction: column;
    margin-right: 2rem;
    margin-left: 2rem;
    margin-top: 2rem;
    
`



export default function ToolsBar({parentUpdate}) {
    const dispatch = useDispatch()
    const [nameValue,setNameValue] = useState("")
    const [typeSelected,setTypeSelected] = useState("water")


  function handleChange(event){
    setNameValue(event.target.value)
   
  }
  function handleKeyDown (event) {
    if (event.key === 'Enter') {
      console.log('Se inicio la busqueda del pokemon: '+nameValue)
      axios.get(`http://localhost:3001/pokemons/name?pokeName=${nameValue}`)
      .then( (response)=>{
        console.log("console desde el response",response.data[0])
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
  parentUpdate()
}


function atkFillDes(){
  dispatch(orderByAttackDescend())
  parentUpdate()
}

function atkFillAsc (){
  dispatch(orderByAttackAscend())
  parentUpdate()
}

/////////// Seleccion de Orden ////////////////////

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
        <button onClick={ typeFill }>Filtrar por tipo</button>
        <button onClick={ typeAll }>Todos los tipos</button>
        <hr></hr>
        <button onClick={ atkFillDes }>Ataque asc</button>
        <button onClick={ atkFillAsc }>Ataque des</button>
        <hr></hr>
        <button onClick={ idOrder }>Orden por ID</button>
        <button onClick={ orderA_Z }>Orden descendente</button>
        <button onClick={ orderZ_A }>Orden Ascendente</button>
        <hr></hr>
        <button onClick={ originAPI }>API</button>
        <button onClick={ originDB }>DB</button>
        <button onClick={ originALL }>ALL</button>
    </ToolsContainer>
  )
}
