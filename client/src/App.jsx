import { Routes, Route, useLocation } from 'react-router-dom';
import LeftPane from './components/leftPane/LeftPane';
import RightPane from './components/rightPane/RightPane';
import Home from './components/home/Home';
import './App.css';
import SignUp from './components/signup/SignUp';
import LoginPage from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import { useEffect, useState } from 'react';
import UserContext from './components/contexts/UserContext';
import CreatePost from './components/createPost/CreatePost';
import Logout from './components/logout/Logout';

export default function App() {
  const location = useLocation();
  const hidePanes = location.pathname === '/register' || location.pathname === '/login';
  const [currentUser, setCurrentUser] = useState('');
  useEffect(() => {
    if (location.pathname === '/logout') {
      return;
    }
    async function getCurrentUser() {
      try {
        const response = await fetch('http://localhost:5000/api/auth/current', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        data.status = response.status;
        // console.log(data.status);
        if (data.status == 200) {
          setCurrentUser(data);
        } else {
          setCurrentUser(false);
        }
        // console.log(currentUser);
      } catch (error) {
        console.log('Error in getting current user');
      }
    };
    getCurrentUser();
  }, [location.pathname]); //TODO: Can make it rerender just when a user logs in or logs out , every other time it would be in the context ; basically fetch it once then fetch only when there is log in or logout
  return (
    <div className="app">
      <UserContext.Provider value={{ user: currentUser }}>
        {!hidePanes && <LeftPane />}
        {/* {!hidePanes && <Home />} */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path="/explore" element={<div>Explore</div>} />
          <Route path="/bookmarks" element={<div>Bookmarks</div>} />
          <Route path="/profile" element={<div>Profile</div>} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          {/* <Route path="/create" element={<CreatePost />} /> */}
        </Routes>
        {!hidePanes && <RightPane />}
      </UserContext.Provider>
    </div >
  );
}