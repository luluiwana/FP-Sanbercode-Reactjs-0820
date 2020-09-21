import React from "react";
import Nav from "./nav.jsx"
import Home from "../Pages/home.jsx"
import Movies from "../Pages/movies.jsx"
import Games from "../Pages/games.jsx"
import MovieReview from "../Pages/movieReview.jsx"
import GameReview from "../Pages/gameReview.jsx"
import MovieData from "../Pages/MovieData.jsx"
import GameData from "../Pages/GameData.jsx"
import Login from "../Pages/login.jsx"
import Footer from "./footer.jsx"
import { Switch, Route } from "react-router";

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/">
        <Nav />
        <Home />
        <Footer />
      </Route>
      <Route exact path="/movies">
        <Nav />
        <Movies/>
        <Footer />
      </Route>
      <Route exact path="/movies/:id" >
        <Nav />
        <MovieReview />
        <Footer />
      </Route>
      <Route exact path="/game/:id" >
        <Nav />
        <GameReview />
        <Footer />
      </Route>
      <Route exact path="/login" >
        <Nav />
        <Login/>
      
      </Route>
        <Route exact path="/games" >
        <Nav />
        <Games/>
        <Footer />
      </Route>
      <Route exact path="/MovieData" >
        <Nav />
        <MovieData/>
        <Footer />
      </Route>
      <Route exact path="/GameData" >
        <Nav />
        <GameData/>
        <Footer />
      </Route>
      
    </Switch>
  );
};

export default Routes;