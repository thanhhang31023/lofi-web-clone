import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home/Home';
import Header from './components/Header/Header';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Header /> <Home />
            </>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
