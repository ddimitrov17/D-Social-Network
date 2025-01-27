import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LeftPane from './components/leftPane/LeftPane';
import RightPane from './components/rightPane/RightPane';
import Home from './components/home/Home';
import './App.css';
import SignUp from './components/signup/SignUp';
import LoginPage from './components/login/Login';
import Catalog from './components/catalog/Catalog';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logout from './components/logout/Logout';
import Details from './components/details/Details';
import EditPost from './components/editPost/Edit';
import ProfileSection from './components/profileSection/ProfileSection';
import Explore from './components/explore/Explore';
import Bookmarks from './components/bookmarks/Bookmarks';
import { logoutUser, setUser } from './redux/actions/userActions';
import { ProtectedRoute } from './components/protectedRoute/ProtectedRoute';
import Spinner from './loadingSpinner/Spinner';
import PersonalFeed from './components/personalFeed/PersonalFeed';
import EventsCatalog from './components/eventsCatalog/EventsCatalog';
import MessageSection from './components/messageSection/MessageSection';

export default function App() {
  const location = useLocation();
  const user = useSelector(state => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const hidePanes = location.pathname === '/register' || location.pathname === '/login';
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/logout') {
      dispatch(logoutUser());
      return;
    }
    async function getCurrentUser() {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/current`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        data.status = response.status;
        if (response.ok) {
          dispatch(setUser(data));
        } else {
          dispatch(logoutUser());
        }
      } catch (error) {
        console.log('Error in getting current user');
      } finally {
        setLoading(false); 
    }
    };
    getCurrentUser();
  }, [location.pathname, dispatch]);

  if (loading) {
    return <Spinner/>
  }
  return (
    <div className="app">
      {!hidePanes && <LeftPane className="left-pane" />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/personalfeed' element={<PersonalFeed/>}/>
        <Route path="/explore" element={<Explore />} />
        <Route path='/events' element={<EventsCatalog/>}/>
        <Route path="/bookmarks" element={<ProtectedRoute element={<Bookmarks />} user={user} />} />
        <Route path='/messages' element={<MessageSection/>}/>
        <Route path="/profile/:username" element={user ? <ProfileSection /> : <Navigate to="/login" />} /> // For Logged Users
        <Route path="/register" element={user ? <Navigate to="/catalog" /> : <SignUp />} /> // For Non-Logged Users
        <Route path="/login" element={user ? <Navigate to="/catalog" /> : <LoginPage />} /> // For Non-Logged Users
        <Route path="/logout" element={<ProtectedRoute element={<Logout />} user={user} />} /> // For Logged Users
        <Route path='/details/:id' element={<Details />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<EditPost />} user={user} />} /> // For Logged Users
      </Routes>
      {(!hidePanes && location.pathname!=="/messages") && <RightPane className="right-pane" />}
    </div>
  );
}
