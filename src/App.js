import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Footer from './components/Footer';
import Alert from './components/Alert';
import { Login } from './components/Login';
import { AlertState } from './context/alert/AlertState';

function App() {
  return (
    <>
    <AlertState>
      <NoteState>
        <Router>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login"><Login/></Route>
          </Switch>
        </Router>
      </NoteState>
    </AlertState>

    <Footer/>
    </>
  );
}

export default App;
