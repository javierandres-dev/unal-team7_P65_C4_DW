import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { First } from './components/First';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import PnF from './components/404';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/first' component={First} />
        <Route exact path='/'>
          <Main />
          <Footer />
        </Route>
        <Route path='*' component={PnF} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
