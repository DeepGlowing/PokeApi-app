
import styled from 'styled-components'


const CardsContainer = styled.div`

//background-color: #181863;
display: grid;
grid-template-columns: repeat(4,32%);
gap: 1rem;
margin-top: 0.99rem;
margin-left: 11.5rem;
justify-content: space-between;

`





export default function PokeCards({Cards}) {
  
   return <CardsContainer>

      {Cards}

    
   </CardsContainer>;
}