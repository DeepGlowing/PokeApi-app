import './App.css';
import {useEffect} from 'react'
import {BrowserRouter,Route, Routes} from "react-router-dom"
import NavBar from './components/Nav';
import HomeView from './views/HomeView';
import DetailView from './views/DetailView';
import FormView from './views/FormView';
import { useDispatch, useSelector } from 'react-redux'
import {addPokemon,setPokeDetail,orderByID} from "./Redux/actions.js"
import axios from "axios"
const API = "http://localhost:3001/pokemons"





function App() {
 

  const dispatch = useDispatch()

  useEffect( ()=> { // Hace una peticion para traer los primeros pokemons al cargarse la App
      axios.get(API)
      .then(({ data }) => {
        dispatch(addPokemon(data))
        dispatch(setPokeDetail(data.api[0]))// Establece el pokemon para detalle como el primero de la lista por default
        dispatch(orderByID())
      })
      .catch( (error) =>{
          console.error("Error al intentar cargar los pokemons",error)
      })
  },[])
  



  return (
    <BrowserRouter>

    <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<div className="App"><h1>Henry Pokemon</h1></div>}/>
        <Route path="/home" element={<HomeView/>}/>
        <Route path="/detail" element={<DetailView/>}/>
        <Route path="/form" element={<FormView/>}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>


    </BrowserRouter>
  );
}

export default App;
