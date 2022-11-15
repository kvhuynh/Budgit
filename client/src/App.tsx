import { Routes, Route} from 'react-router-dom';
import './App.css';
import { Login } from './views/Login';
import { Navbar } from "./views/Navbar";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/home" element={ <Login /> }/>
      </Routes>
    </>
  );
}

export default App;
