import { Routes, Route} from 'react-router-dom';
import './App.css';
<<<<<<< Updated upstream
import { Login } from './views/login'

function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Login /> }/>
    </Routes>
=======
import { LoginRegister } from './views/LoginRegister';
import { Navbar } from "./components/Navbar";

import ViewBudget from "./views/ViewBudget"
import Dashboard from "./views/Dashboard"

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<LoginRegister/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/budgets/:name" element={<ViewBudget/>}></Route>
      </Routes>
    </>
>>>>>>> Stashed changes
  );
}

export default App;
