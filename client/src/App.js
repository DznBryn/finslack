import React, { Fragment, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import PrivateRoute from './components/utils/routing/PrivateRoute';
import Landing from './components/layout/Landing/Landing';
import { Provider } from 'react-redux';
import store from './store';
import Register from './components/auth/Register/Register';
import Alert from './components/layout/Alert/Alert';
import Dashboard from './components/auth/Dashboard/Dashboard';
import { load_user } from './actions/auth';
import './App.css';
import { makeStyles, Container, ThemeProvider } from '@material-ui/core';
import Moment from 'react-moment';
import theme from './components/theme';

const useStyles = makeStyles((theme) => ({
	mainContainer: {
		height: '100vh',
	},
	footerText: {
		opacity: '0.2',
		fontSize: '12px',
		textTransform: 'uppercase',
		textAlign: 'center',
		letterSpacing: '2px',
		fontWeight: '300',
	},
}));

const App = () => {
	const classes = useStyles();
	useEffect(() => {
		store.dispatch(load_user());
	}, []);

	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
			<Router>
				<Fragment>
					<Container disableGutters={true} className={classes.mainContainer}>
						<Alert />
						<Route exact path='/' component={Landing} />
						<Switch>
							<Route exact path='/register' component={Register} />
							<PrivateRoute exact path='/dashboard' component={Dashboard} />
							<Redirect from='*' to='/' />
						</Switch>
						{/* <footer>
							<p className={classes.footerText}>
								© <Moment format='YYYY'>{Date.now()}</Moment> Blvck Wall Street
								LLC
							</p>
						</footer> */}
					</Container>
				</Fragment>
			</Router>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
