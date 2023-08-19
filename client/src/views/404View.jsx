import React from 'react'
import NavBar from '../components/Nav'
import styled from 'styled-components'

const Centered = styled.div`
  display: flex;
  justify-content:  space-between;
  align-items: center;
  width: 100%;
  height: 700px;
  margin-top: 70px;
  font-size: 100px;
  position: absolute;
  margin-left: 30%;
  border-radius: 8px;
`

export default function ErrorView() {
  return (
    <div>
        <NavBar></NavBar>

       <Centered>404 Not Found</Centered>
    </div>
  )
}
