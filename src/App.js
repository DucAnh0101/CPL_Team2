import Home from './components/Home/Home';
import Login from './components/Home/Login';
import Register from './components/Home/Register';
import NewArticle from './components/page/newArticle';
import EditProfile from './components/page/editProfile';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/Header & footer/Footer';

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/newArticle' element={<NewArticle />} />
          <Route path='/editProfile' element={<EditProfile />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>

  );
}

export default App;
