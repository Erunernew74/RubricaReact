import NavbarBoot from "./components/NavbarBoot";
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import InserisciContatto from "./pages/InserisciContatto";
import ListaContatti from "./pages/ListaContatti";

function App() {


  return (
    <Router>
      <NavbarBoot />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/InserisciContatto" exact component={InserisciContatto} />
        <Route path="/ListaContatti" exact component={ListaContatti} />
      </Switch>
    </Router>
  );
}

export default App;
