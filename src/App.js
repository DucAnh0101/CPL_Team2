import Home from './components/Home/Home';
import Login from './components/page/Login';
import NewArticle from './components/page/newArticle';
import Register from './components/page/Register';
import UserProfile from './components/page/userProfile';
import EditProfile from './components/page/editProfile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/newArticle' element={<NewArticle/>}/>
          <Route path='/userProfile' element={<UserProfile/>}/>
          <Route path='/editProfile' element={<EditProfile/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
