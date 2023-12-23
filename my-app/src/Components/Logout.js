import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
      
     useEffect(()=>{
        localStorage.clear();
    
        const token = localStorage.getItem('token');
         if(!token)
         {
            navigate('/login');
         }
     })
    
};

export default Logout;