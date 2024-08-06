import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Logout() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      try {
        await fetch('http://localhost:5000/api/auth/logout', {
          method: 'GET',
          credentials: 'include'
        });
        console.log('logout executed') 
        // console.log(user); // Should change context here
        // console.log(location.pathname);
        navigate('/');
        // console.log(location.pathname);
      } catch (error) {
        console.log('Error in logging user out');
      }
    };
    logout();
  }, []);
}