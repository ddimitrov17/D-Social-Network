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
import Details from './components/details/Details';
import EditPost from './components/editPost/Edit';
import ProfileSection from './components/profileSection/ProfileSection';
import Explore from './components/explore/Explore';

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
        {location.pathname=='/create' && <Home />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path="/explore" element={<Explore/>} />
          <Route path="/bookmarks" element={<div>Bookmarks</div>} /> //Login Protect
          <Route path="/profile/:username" element={<ProfileSection/>} /> //Login Protect
          <Route path="/register" element={<SignUp />} /> //Already Logged In Protect
          <Route path="/login" element={<LoginPage />} /> //Already Logged In Protect
          <Route path="/logout" element={<Logout />} /> //Login Protect
          <Route path='/details/:id' element={<Details />}/>
          <Route path="/edit/:id" element={<EditPost />} /> //Login Protect //Author Protect
          {/* <Route path='/create' element={<CreatePost/>}/> */}
        </Routes>
        {!hidePanes && <RightPane />}
      </UserContext.Provider>
    </div >
  );
}