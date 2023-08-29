import { useState } from 'react';
// import './App.css';
import Catalog from './components/Catalog';

function App() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%'
    }}>
      <Catalog />
    </div>
  );
}

export default App;
