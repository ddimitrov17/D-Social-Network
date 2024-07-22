import { Routes, Route, useLocation } from 'react-router-dom';
import LeftPane from './components/leftPane/LeftPane';
import RightPane from './components/rightPane/RightPane';
import Home from './components/home/Home';
import './App.css';
import SignUp from './components/signup/SignUp';
import LoginPage from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import createPost from './components/createPost/CreatePost';

export default function App() {
  const location = useLocation();
  const hidePanes = location.pathname === '/register' || location.pathname === '/login';

  return (
    <div className="app">
      {!hidePanes && <LeftPane />}
      {/* {!hidePanes && <Home />} */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path="/explore" element={<div>Explore</div>}/>
        <Route path="/bookmarks" element={<div>Bookmarks</div>} />
        <Route path="/profile" element={<div>Profile</div>} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<div>Logout</div>} />
        <Route path="/create" element={<createPost />} />
      </Routes>
      {!hidePanes && <RightPane />}
    </div>
  );
}