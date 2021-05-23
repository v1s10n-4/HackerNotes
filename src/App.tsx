import * as React from 'react';
import { Router } from 'react-router-dom';
import { RouterSwitch } from 'react-typesafe-routes';
import { history } from './configureStore';
import { withRoot } from './withRoot';
import { router } from './Router';

function App() {
	return (
		<Router history={history}>
			<RouterSwitch router={router} />
		</Router>
	);
}

export default withRoot(App);
