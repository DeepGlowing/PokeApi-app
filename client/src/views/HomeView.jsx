import {useEffect,useState} from 'react'
import styled from 'styled-components'
import PokeCards from '../components/PokeCards'
import ToolsBar from '../components/ToolsBar'
import { useDispatch, useSelector,} from 'react-redux'
import { setIndexCard,filtrerByType } from "../Redux/actions"
import PokeCard from "../components/PokeCard"
import NavBar from '../components/Nav'



const ViewContainer = styled.div`
background-color: #c3c5ce;
display: flex;
flex-wrap: nowrap;
justify-content: flex-start;
width: 100vw;
padding-bottom: 250px;
height: 100vh;


`
const ButtonsDiv = styled.div`
   display: flex;
   flex-wrap: wrap;
   justify-content: center;
   margin-left: 500px;

`
const Container1Div = styled.div`
display: flex;
flex-wrap: wrap;

`
const MidContainer = styled.div`
 flex-wrap: nowrap;
 flex-direction: column;

`


export default function HomeView() {

  const POKEMONS_PER_PAGE = 12
  const checkForLoadApp = useSelector(state => state.localPokemons)
  const pokeArray  =[...useSelector(state => state.showingPokemons)] 
  const indexCardPag = useSelector(state =>state.currentCardPageIndex)
  let filtrerChange = useSelector(state =>state.filtrer)

  const dispatch = useDispatch()

  const [currentPokemons,setCurrentPokemons] = useState()

  const [currentPage, setCurrentPage] = useState(0)


  useEffect( () =>{
     setCurrentPokemons(pokeArray.splice(-POKEMONS_PER_PAGE,POKEMONS_PER_PAGE) )
     dispatch(setIndexCard(0))
     setCurrentPage(1)
     dispatch(filtrerByType("all"))
  },[])
  useEffect( () =>{
   setCurrentPokemons(pokeArray.splice(-POKEMONS_PER_PAGE,POKEMONS_PER_PAGE) )
   dispatch(setIndexCard(0))
   setCurrentPage(1)
},[checkForLoadApp])
  useEffect( () =>{
    setCurrentPokemons(pokeArray.splice(0,POKEMONS_PER_PAGE) )
 },[filtrerChange])

  const Cards = currentPokemons?.map((pokemon,index) => {
     return <PokeCard key = {index} pokemon={pokemon}/>
  })


  function update() {
    setCurrentPokemons(pokeArray.splice(0,POKEMONS_PER_PAGE))
    dispatch(setIndexCard(0))
    setCurrentPage(0)
  }

  function nextHandler(){
     if ((indexCardPag + POKEMONS_PER_PAGE)  >= pokeArray.length) return
     const nextPage = currentPage + 1

     console.log(indexCardPag)
     console.log(pokeArray.length)
     dispatch(setIndexCard(indexCardPag+POKEMONS_PER_PAGE))
 
     setCurrentPokemons(pokeArray.splice(indexCardPag + POKEMONS_PER_PAGE,POKEMONS_PER_PAGE) )
     setCurrentPage(nextPage)
  }

  function prevHandler(){
     if (indexCardPag <= 0) return
     const prevPage = currentPage - 1
     
     dispatch(setIndexCard(indexCardPag-POKEMONS_PER_PAGE))
     setCurrentPokemons(pokeArray.splice(indexCardPag-POKEMONS_PER_PAGE,POKEMONS_PER_PAGE) )
     
     setCurrentPage(prevPage)
  }


  return (
   <div>
      <NavBar></NavBar>
      <ViewContainer>
        <ToolsBar parentUpdate={update}></ToolsBar>
         <MidContainer>

            <ButtonsDiv>
               <button onClick={prevHandler}>Previus Page</button>
               <h3>{currentPage}</h3>
               <button onClick={nextHandler}>Next Page</button>
            </ButtonsDiv>
            <Container1Div>
               <PokeCards Cards={Cards}></PokeCards>
            </Container1Div>

         </MidContainer>
    </ViewContainer>
   </div>

    
  )
}
