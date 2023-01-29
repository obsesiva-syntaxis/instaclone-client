import React, { useState, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';

import client from './config/apollo';
import Auth from './pages/auth';
import { getToken, decodeToken, removeToken } from './utils/token';
import AuthContext from './context/AuthContext';
// import Home from './pages/Home';
import Navigation from './routes/Navigation'


export const App = () => {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setAuth(null);
    } else {
      setAuth(decodeToken(token));
    }
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  }

  const setUser = (user) => {
    setAuth(user);
  } 

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if(auth === undefined) return null;

  return (

    <ApolloProvider client={client}>

      <AuthContext.Provider value={authData}>
        {
          !auth ? <Auth /> : <Navigation />
        }
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOntop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          Draggable
          pauseOnHover
        />
      </AuthContext.Provider>

    </ApolloProvider>

  );
}