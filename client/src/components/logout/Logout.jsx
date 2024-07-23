import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from '../contexts/UserContext';

export default function Logout() {
    const { user } = useContext(UserContext);
    const navigate=useNavigate();
    const location=useLocation();
    useEffect(() => {
        async function logout() {
          try {
            const response = await fetch('http://localhost:5000/api/auth/logout', {
              method: 'GET',
              credentials: 'include'
            });
            console.log('logout executed') // cookie cleared
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