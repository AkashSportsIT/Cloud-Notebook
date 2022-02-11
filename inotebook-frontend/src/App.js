
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About';
import Alert from './Components/Alert';
import Home from './Components/Home';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Notes from './Components/Notes';
import Register from './Components/Register';
import NotesState from './Context/NotesState';
import { useState } from 'react';
import Footer from './Components/Footer';
import YourNotesLoggoff from './Components/YourNotesLoggoff';

function App() {

  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('dark');

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}

const toggleMode = () =>{
  if (mode === 'dark') {
    document.body.style.backgroundColor  = '#152642'
    document.body.style.color  = 'white'
    setMode('light')
    showAlert("Dark Mode Enabled", "success")

  }
  else{
    document.body.style.backgroundColor  = 'white'
    document.body.style.color  = 'black'
    setMode('dark')
    showAlert("Dark Mode Disabled", "success")


  }
}


  return (
    <>
    <div className='App'>
    <NotesState>
      <BrowserRouter>
      <Navbar toggleMode={toggleMode}/>
      <Alert alert={alert}/>
        <Routes>
          <Route path='/' exact element={<Home showAlert={showAlert} />} />
           
          <Route path='/about' exact element={<About />} />

          <Route path='/notes' exact element={<Notes showAlert={showAlert}/>} />
          <Route path='/login' exact element={<Login showAlert={showAlert}/>} />
          <Route path='/register' exact element={<Register showAlert={showAlert}/>} />
          <Route path='/loggoff' exact element={<YourNotesLoggoff showAlert={showAlert}/>} />

        </Routes>


        <Footer/>
      </BrowserRouter>
      </NotesState>
      </div>
    </>
  );
}

export default App;
