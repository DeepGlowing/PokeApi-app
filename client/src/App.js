import './App.css';
import {useEffect, useState} from 'react'
import {BrowserRouter,Route, Routes,useNavigate} from "react-router-dom"
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import FormView from './views/FormView';
import ErrorView from './views/404View';
import { useDispatch, useSelector } from 'react-redux'
import {addPokemon,setPokeDetail,orderByID} from "./Redux/actions.js"
import axios from "axios"
import joinMenu from "./assets/portada.png"
const API = "http://localhost:3001/pokemons"





function App() {
 

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [isReady,setIsReady] = useState(true)

  function handleClick (){
    navigate('/home')
  }

  useEffect( ()=> { // Hace una peticion para traer los primeros pokemons al cargarse la App
      axios.get(API)
      .then(({ data }) => {
        dispatch(addPokemon(data))
        dispatch(setPokeDetail(data.api[0]))// Establece el pokemon para detalle como el primero de la lista por default
        dispatch(orderByID())
        setIsReady(false)
      })
      .catch( (error) =>{
          console.error("Error al intentar cargar los pokemons",error)
      })
  },[])
  


  return (
    <div>
      <Routes>
        <Route  path="/" element={<div className="App">
          <h1>Henry Pokemon</h1>
      <button onClick={handleClick} disabled={isReady}>Join</button>
      </div>}/>
        
        <Route path="/home" element={<HomeView/>}/>
        <Route path="/detail" element={<DetailView/>}/>
        <Route path="/form" element={<FormView/>}/>
        <Route path="*" element={<ErrorView/>}/>
      </Routes>

    </div>

      
  );
}

export default App;
