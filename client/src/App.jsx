import logo from './logo.svg'
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import './App.css';
import Movies from './pages/Movies'
import TvSeries from './pages/TvSeries'
import FormAdd from './pages/FormAdd'
import EditForm from './pages/EditForm'
import MovieDetail from './components/MovieDetail'
import TvSeriesDetail from './components/TvSeriesDetail';
import Favorites from './pages/Favorites';

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar/>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/edit-data/:id">
          <EditForm />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
        <Route exact path="/add-data">
          <FormAdd />
        </Route>
        <Route exact path="/movie/:id">
          <MovieDetail />
        </Route>
        <Route exact path="/movie">
          <Movies />
        </Route>
        <Route exact path="/tvSeries/:id">
          <TvSeriesDetail />
        </Route>
        <Route exact path="/tvSeries">
          <TvSeries />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
