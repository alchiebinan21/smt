    import React from 'react';
    import ReactDOM from 'react-dom';
    import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from 'react-router-dom';

    import Home from '../components/Home';
    import Add from '../components/Add';
    import Edit from '../components/Edit';
    import Show from '../components/Show';
    import Login from '../components/Login';
    import Signup from '../components/Signup';
    import MyPosts from '../components/MyPosts';

    const App = () => {

        const [loggedIn, setLoggedIn] = React.useState(
            sessionStorage.getItem('loggedIn') == 'true' || false
        );

        const redirect = () => {
            return <Redirect to='/login' />
        };

        const login = () => {
            setLoggedIn(true);
            sessionStorage.setItem('loggedIn', true);
        };

        const logout = () => {
            axios.post('/auth/logout').then(response => {
                setLoggedIn(false);
                sessionStorage.setItem('loggedIn', false);
                return <Redirect to='/' />
            })
        };

        const authLink = loggedIn
            ? <button onClick={logout} className="nav-link btn btn-link">Logout</button>
            : <Link to='/login' className="nav-link">Login</Link>;

        const myPost = loggedIn
            ? <li className="nav-item">
                <Link to='/me/posts' className="nav-link">My Post</Link>
            </li>
            : <li className="nav-item">
                <Link to='/signup' className="nav-link">Register</Link>
            </li>;

            const HomeRender = !loggedIn ? <div className="card">
                <div className="card-header">
                    Welcome to the Test App
                </div>
                <div className="card-body">
                    <blockquote className="blockquote mb-0">
                        <p>Please Register and Login to start</p>
                    </blockquote>
                </div>
            </div> : <Home />;

        return (
            <Router className="App__container">
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Home</Link>;
                            </li>
                            { myPost }
                            <li className="nav-item">
                                {authLink}
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container mt-5 pt-5">
                    <Switch>
                        <Route exact path="/">
                            { HomeRender }
                        </Route>
                        <Route exact path="/posts/show/:id">
                            <Show />
                        </Route>
                        <Route exact path="/me/posts">
                            <MyPosts />
                        </Route>
                        <Route exact path="/posts">
                            <Add />
                        </Route>
                        <Route exact path="/posts/:id">
                            <Edit />
                        </Route>
                        <Route exact path="/login" render={props => (
                            <Login {...props} login={login}/>
                            )}/>
                        <Route exact path="/signup">
                            <Signup />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    };

    ReactDOM.render(<App />, document.getElementById('app'));
