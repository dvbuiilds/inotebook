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

function App() {
  return (
    <>
    <NoteState>
      <Router>
        <Navbar />
        <Alert message={"Hello world"}/>
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
    <Footer/>
    </>
  );
}

export default App;
