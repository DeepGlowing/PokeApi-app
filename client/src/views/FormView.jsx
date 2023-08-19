import React, { useEffect } from 'react'
import { useState } from "react";
import styled from 'styled-components'
import axios from "axios"
import styles from "../Styles/InputStyle.css"
import NavBar from '../components/Nav'




const DisplayContainer = styled.div`
 display: flex;
 justify-content: center;
 align-items: center;

`

const FormContainer = styled.div`
background-color: #494949;
width: 600px;
height: 720px;
margin-top: 100px;
display: flex;


`
const LogForm = styled.form`
margin-top: 50px;
margin-left: 50px;

`
const LabelForm = styled.label`
justify-self: left;
display: flex;
margin-left: 11px;
`
const LabelError = styled.label`
justify-self: left;
display: flex;
color: red;
font-size: small;
margin-left: 11px;
`

/*   ESTRUCTURA DE DATOS PARA EL BODY
{
    pokeData: {   
        "name":  "pipo",
        "image": "imagen bonita",
        "health": 32,
        "attack": 14.5,
        "defense": 16.0,
        "velocity": 3.5,
        "height": 1.50,
        "weight": 60.7,
        
    },
    pokemonTypes: ["type1","type2", "etc"] ,
}
*/

export default function FormView(){

    const MAX_VALUES = Object.freeze({   
        health: 255,
        attack: 190,
        defense: 230,
        velocity: 230,
        height: 50.0,
        weight: 4300,
        })
    

    const [pokeData, setPokeData] = useState(
        {   
            name:  "",
            image: null,
            health: 0,
            attack: 0.0,
            defense: 0.0,
            velocity: 0.0,
            height: 0.0,
            weight: 0.0,
            
        })

    const [inputErrors, setInputErrors] = useState(
        {   
            name:  "",
            image: "",
            health: "",
            attack: "",
            defense: "",
            velocity: "",
            height: "",
            weight: "",
            type: ""
            
        })

     const [canSubmit, setCanSubmit] = useState(Boolean)
     const [typeValue1, settypeValue1] = useState('')
     const [typeValue2, settypeValue2] = useState('')
     const [typeArray , setTypeArray ] = useState([])
     const [fileImage, setFileImage] = useState(null)

    useEffect( async() => {
        await axios.get("http://localhost:3001/types")
        .then ( (response) => {
            const tarr = []
            response.data.map((item) => {
                tarr.push(item.name)
            })
            setTypeArray(tarr)
        })
    } ,[])

   async function postPokemon(){
    
        const pokePackage={
            pokeData: {   
                "name":  pokeData.name.toLocaleLowerCase(),
                "image": fileImage,
                "health": pokeData.health,
                "attack": pokeData.attack,
                "defense": pokeData.defense,
                "velocity": pokeData.velocity,
                "height": pokeData.height,
                "weight": pokeData.weight,
                
            },
            pokemonTypes: [typeValue1,typeValue2]
        }
        console.log(fileImage)
        await axios.post("http://localhost:3001/image", pokePackage);
    }

    function handleSubmit(event){
        event.preventDefault()
        if (canSubmit) {
            console.log("Los datos del pokemon son correctos, esta listo para enviarse")
            postPokemon()
        }
        else {console.log("Los datos no estan completos, no se puede realizar la creacion")}

        
    }

    function handleChange(event){
        const _input = {...pokeData,[event.target.name]: event.target.value}
        setPokeData(_input)
        if (event.target.name === "image"){setFileImage(event.target.files[0])}
        if (event.target.name === "type1"){settypeValue1(event.target.value)}
        if (event.target.name === "type2"){settypeValue2(event.target.value)}
        validation(_input)

    }

    function validation(inputs){
        let errors = {   
            name:  " ",
            image: " ",
            health: " ",
            attack: " ",
            defense: " ",
            velocity: " ",
            height: " ",
            weight: " ",
            type: " "
            
        }

        setCanSubmit(true)
        if (!/^[A-Za-z]+$/.test(inputs.name)) {
            errors.name = "The name does not allow numbers or special characters"
            setCanSubmit(false)
        }
        if (!inputs.name) {
            errors.name = "Name ..."
            setCanSubmit(false)
        }
        if (inputs.health < 5) {
            errors.health = "Health must be greater than or equal to 5"
            setCanSubmit(false)
        } 
        if (inputs.attack < 5) {
            errors.attack = "Attack must be greater than or equal to 5"
            setCanSubmit(false)
        } 
        if (inputs.defense < 5)  {
            errors.defense = "Defense must be greater than or equal to 5"
            setCanSubmit(false)
        }
        if (inputs.velocity < 5) {
            errors.velocity = "Velocity must be greater than or equal to 5"
            setCanSubmit(false)
        }
        if (!typeValue1&&!typeValue2){
            errors.type = "The pokemon must have at least one type"
            setCanSubmit(false)
        }
        setInputErrors(errors)
        
    }

    return (
        <div>
            <NavBar></NavBar>
            <DisplayContainer>
        <FormContainer>
            <LogForm >

                <LabelForm>Pokemon Name</LabelForm>
                <input
                type="text" 
                name='name'
                value={pokeData.name}
                onChange={handleChange}
                ></input>
                <LabelError value="das">{inputErrors.name}</LabelError>
                
                <LabelForm>Health</LabelForm>
                <input
                type="number" min="5" max={MAX_VALUES.health}
                name='health'
                value={pokeData.health}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.health}</LabelError>
                
                <LabelForm>Attack</LabelForm>
                <input
                type="number" min="5" max={MAX_VALUES.attack}
                name='attack'
                value={pokeData.attack}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.attack}</LabelError>
                
                <LabelForm>Defense</LabelForm>
                <input
                type="number" min="5" max={MAX_VALUES.defense}
                name='defense'
                value={pokeData.defense}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.defense}</LabelError>
                
                <LabelForm>Velocity</LabelForm>
                <input
                type="number" min="5" max={MAX_VALUES.velocity}
                name='velocity'
                value={pokeData.velocity}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.velocity}</LabelError>
                
                <LabelForm>Height (metros)</LabelForm>
                <input
                type="number" min="0" max={MAX_VALUES.height}
                name='height'
                value={pokeData.height}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.height}</LabelError>
                
                <LabelForm>Weight (Kilogramos)</LabelForm>
                <input
                type="number" min="1" max={MAX_VALUES.weight}
                name='weight'
                value={pokeData.weight}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.weight}</LabelError>

                <LabelForm>Pokemon types</LabelForm>

                <select name="type1" value={typeValue1}  onChange={handleChange} >
                {  typeArray?.map((type,index) => {
                    return <option
                    key = {index}
                    value={type}
                    disabled={typeValue2 === type}>{type}
                    </option>
                })}
                </select>
                <select  name="type2" value={typeValue2} onChange={handleChange}>
                {  typeArray?.map((type,index) => {
                    return <option
                    key = {index}
                    value={type}
                    disabled={typeValue1 === type}>{type}
                    </option>
                })}
                </select>
                <LabelError>{inputErrors.type}</LabelError>

                <LabelForm>Portrait</LabelForm>
                <input 
                type="file"
                name='image'
                value={pokeData.image}
                onChange={handleChange}
                ></input>
                <LabelError>{inputErrors.image}</LabelError>

                <button onClick={handleSubmit}>Submit</button>
            </LogForm >
        </FormContainer>
     </DisplayContainer>
        </div>


    )
}