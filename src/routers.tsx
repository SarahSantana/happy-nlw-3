import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

/**
 * Switch -> permite que somente 1 rota seja exibida em tela
 * exact -> pode colocar só na 'raiz' /, serve para validar
 * que entre na rota somente se o valor digitado na url for 
 * exatamente igual ao definido no path
 * 
 * Para importar o react-router-dom pode usar o comando
 * npm install react-router-dom, provavelmente depois de
 * importar ele não vai conseguir exibir no vsCode as
 * pastas que existem no interior desse pacote, então
 * é preciso executar o comando npm install
 * @types/react-router-dom
 *  */
