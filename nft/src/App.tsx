import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import Mint from './pages/Mint';
import NFTs from './pages/NFTs';
import Header from './components/Header';

function App() {
  return (
    <Router basename="/nft">
      <Header />
      <main style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/nfts" element={<NFTs />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
