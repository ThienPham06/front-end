import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from './component/home/HomePage';
import PlanPage from './component/plan/PlanPage';
import Profile from './component/profile/ProfilePage';
import PlanRequest from './component/plan/PlanRequest';

const routing = (
    <BrowserRouter>
        <div>
            <Route exact path= "/" component = { App } />
            <Route path="/home" component = { HomePage } />
            <Route exact path="/planpage" component = { PlanPage} />
            <Route exact path="/profile" component = { Profile } />
            <Route path="/planpage/create" component = { PlanRequest } />
        </div>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
