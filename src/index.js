import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../src/app/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from "react-router-dom";
import HomePage from './component/home/HomePage';
import PlanPage from './component/plan/PlanPage';
import PlanRequest from './component/plan/PlanRequest';
import NotFound from './util/NotFound';
import Profile from './component/profile/Profile';
import TicketPage from './component/ticket/TicketPage';
import HistoryPage from './component/history/HistoryPage';
import StHistory from './component/history/StHistory';
const routing = (
    <BrowserRouter>
        <div>
            <Route exact path= "/" component = { App } />
            <Route path="/home" component = { HomePage } />
            <Route exact path="/planpage" component = { PlanPage} />
            <Route exact path="/profile" component = { Profile } />
            <Route path="/planpage/create" component = { PlanRequest } />
            <Route path="/ticketpage" component = { TicketPage } />
            <Route path="/notfound" component={ NotFound } />
            <Route path="/adhistory" component={ HistoryPage } />
            <Route path="/sthistory" component={ StHistory } />
        </div>
    </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
