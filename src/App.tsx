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

function App() {

  //const[value, setValue] = useState("");

  return (
    <div className="App">
      <Header />
      <HomePage/>
      
     
      
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
//<Input label={''} value={value} onChange={(e)=>setValue(e.target.value)}/>