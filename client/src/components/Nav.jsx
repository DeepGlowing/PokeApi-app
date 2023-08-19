import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const BarContainer = styled.div`
display: flex;
justify-content: space-evenly;
margin-top: 12px;
padding-bottom: 20px;
justify-content: flex-end;
margin-right: 100px;

`
const LinkDivs = styled.div`
margin: 6px;

`
const BackContainer = styled.div`
background-color: #7da0a0;
padding-top: 20px;

left: -330px;

`
export default function NavBar(props) {


    return   <BackContainer>
        <BarContainer> 
          <LinkDivs >  
            <Link to={"/home"} >Home</Link>
          </LinkDivs>
          <LinkDivs>
            <Link to={"/detail"} >Detail</Link>
          </LinkDivs>
          <LinkDivs>
            <Link to={"/form"} >Form</Link>
          </LinkDivs>
        </BarContainer>
      </BackContainer>

  }