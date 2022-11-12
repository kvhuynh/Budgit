import { Routes, Route} from 'react-router-dom';
import './App.css';
import { Login } from './views/login'

function App() {
  return (
    <Routes>
      <Route path="/home" element={ <Login /> }/>
    </Routes>
  );
}

export default App;
