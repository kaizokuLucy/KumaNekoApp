import React from 'react';
import Quiz from './Quiz';
import { Switch, Route } from 'react-router-dom'
import Home from './Home';
import Practice from './Practice/Practice';
import App from '../App';
import Statistics from './Statistics';
import EyeTracking from './EyeTracking';

class Main extends React.Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/practice' component={Practice} />
                    <Route path='/test' component={Quiz} />
                    <Route exact path='/home' component={Home} />
                    <Route exact path='/' component={App} />
                    <Route exact path='/statistics' component={Statistics} />
                </Switch>
            </main>
        );
    }
}

export default Main;
