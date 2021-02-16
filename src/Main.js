import React, {Component} from 'react';
import {Route, NavLink, HashRouter} from 'react-router-dom'
import Articles from './Articles';
import Tests from './Tests';
import Game from './Game';
import './index.css';
import articles1 from './articles1';
import articles2 from './articles2';
import articles3 from './articles3';
import Article from "./Article";

class Main extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <h1>React</h1>
                    <ul className="header">
                        <li><NavLink exact to="/">Статьи</NavLink></li>
                        <li><NavLink to="/Tests">Тесты</NavLink></li>
                        <li><NavLink to="/Game">Игра</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Articles} />
                        <Route path="/Tests" component={Tests} />
                        <Route path="/Game" component={Game} />
                        <Route path="/articles1" component={articles1} />
                        <Route path="/articles2" component={articles2} />
                        <Route path="/articles3" component={articles3} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}

export default Main;