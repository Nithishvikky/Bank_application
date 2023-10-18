import './App.css';
import Head from './Head';
import Login from './components/Login';
import Login1 from './components/Login1';
import Home from './components/Home';
import AccountCard from './components/AccountCard';
import AccoutDetails from './components/AccoutDetails';

import { Route,Routes } from 'react-router-dom';

function App() {
  return (
  
    <Routes>
    <Route path='account' element={<AccoutDetails/>}></Route>
    <Route path='Home' element={<Home/>}/>
     <Route path='/' element={<Login/>}/>
     <Route path='Register' element={<Login1/>}/>
    </Routes>

    //<img src='https://img.logoipsum.com/243.svg' className='w-32' alt=''/>
  );
}

export default App;
