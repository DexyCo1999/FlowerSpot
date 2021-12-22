import React , {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import FlowersList from './components/FlowersList/FlowersList';
import CreateAccount from './components/CreateAccount/CreateAccount';
import Input from './components/Input/Input';
import WelcomeBack from './components/WelcomeBack/WelcomeBack';
import ProfileModalDialog from './components/ProfileModalDialog/ProfileModalDialog';
import FavoriteFlowers from './components/FavoritesFlowers/FavoriteFlowers';
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {

  

  return (

    <div className="App">
      
      
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/favs" element={<FavoriteFlowers/>}></Route>
    </Routes>
  </BrowserRouter> 
    </div>
  );
}
/*  
<Header />
<HomePage/>
 <CreateAccount/>


 <WelcomeBack/>
     <CreateAccount/>
     <ProfileModalDialog/>
     */

export default App;
