import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getPeopleData, setPeople } from "./store/actions/people";
import { getPlanetsData, setPlanets } from "./store/actions/planets";
import { getStarshipsData, setStarships } from "./store/actions/starships";
import { getAllPeople } from './store/selectors/people';
import { getAllPlanets } from './store/selectors/planets';
import { getAllStarships } from './store/selectors/starships';
import PeoplePage from "./components/pages/PeoplePage";
import PlanetsPage from "./components/pages/PlanetsPage";
import StarshipsPage from "./components/pages/StarshipsPage";
import PeopleForm from "./components/forms/PeopleForm";
import Navbar from "./components/Navbar";
import Error404 from "./components/common/Error404/Error404";
import PlanetsForm from './components/forms/PlanetsForm';
import StarshipsForm from './components/forms/StarshipsForm';
import "bootstrap/dist/css/bootstrap.css";
import './App.css';


function App() {

    const pathname = useLocation().pathname;

    const dispatch = useDispatch();
    const people = useSelector(state => getAllPeople(state));
    const planets = useSelector(state => getAllPlanets(state));
    const starships = useSelector(state => getAllStarships(state));


    useEffect(() => {
        if (pathname === '/people' && !people.length) {
            const peopleLS = localStorage.getItem('swapi-people');
            if (peopleLS !== null) {
                dispatch(setPeople(JSON.parse(peopleLS)))
            } else dispatch(getPeopleData())
        };
        if (pathname === '/planets' && !planets.length) {
            const planetsLS = localStorage.getItem('swapi-planets');
            if (planetsLS !== null) {
                dispatch(setPlanets(JSON.parse(planetsLS)));
            } else dispatch(getPlanetsData());
        };
        if (pathname === '/starships' && !starships.length) {
            const starshipsLS = localStorage.getItem('swapi-starships');
            if (starshipsLS !== null) {
                dispatch(setStarships(JSON.parse(starshipsLS)))
            } else dispatch(getStarshipsData());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <>
            <Navbar />
            <main className="container">
                <Switch>
                    <Redirect exact from="/" to="/people" />
                    <Route path="/people/:id" render={props => <PeopleForm {...props} />} />
                    <Route path="/people" render={props => <PeoplePage {...props} />} />
                    <Route path="/planets/:id" render={props => <PlanetsForm {...props} />} />
                    <Route path="/planets" component={PlanetsPage} />
                    <Route path="/starships/:id" render={props => <StarshipsForm {...props} />} />
                    <Route path="/starships" component={StarshipsPage} />
                    <Route component={Error404} />
                </Switch>
            </main>
        </>

    );
}

export default App;
