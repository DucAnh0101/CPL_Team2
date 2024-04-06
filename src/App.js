import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
