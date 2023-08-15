
import styled from 'styled-components'


const CardsContainer = styled.div`

//background-color: #181863;
display: flex;
flex-wrap: wrap;
margin-top: 0.99rem;
justify-content: center;

`





export default function PokeCards({Cards}) {
  
   return <CardsContainer>

      {Cards}

    
   </CardsContainer>;
}