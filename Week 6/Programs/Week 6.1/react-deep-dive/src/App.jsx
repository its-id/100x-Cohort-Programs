import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import HeaderWithButton from './components/HeaderWithButton';

function App() {

  return (
    //below is what we call a fragment
    <>
      
      <HeaderWithButton />
      <Header title='React Deep Dive' />
    </>
  );
}

export default App;
