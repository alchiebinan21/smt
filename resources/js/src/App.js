    import React from 'react';
    import ReactDOM from 'react-dom';
    import {
        BrowserRouter as Router,
        Switch,
        Route,
        Link
    } from 'react-router-dom';

    import Home from '../components/Home';
    import Add from '../components/Add';
    import Edit from '../components/Edit';

    const App = () => {
        return (
            <Router className="App__container">
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route exact path="/posts">
                        <Add />
                    </Route>
                    <Route exact path="/posts/:id">
                        <Edit />
                    </Route>
                </Switch>
            </Router>
        );
    };

    ReactDOM.render(<App />, document.getElementById('app'));
