import React from 'react';

import './styles/global.css';

import Routes from './routers';

function App() {
  return (
    <Routes />
  );
}

export default App;

/**
 * App vai exibir apenas a rota que o Routes retornar
 */