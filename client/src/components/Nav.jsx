import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';


const BarContainer = styled.div`

display: flex;
justify-content: space-evenly;


`

export default function NavBar(props) {


    return (
      <BarContainer> 
        <Link to={"/detail"} >detail</Link>
        <Link to={"/home"} >Home</Link>
        <Link to={"/form"} >Form</Link>
      </BarContainer>
    )
  }