//create a form that gathers photo/location/title/text from user
// Store date into an object
import React from 'react';
import { render }  from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Shoppe from './components/index';
import notFound from './components/notFound';
import Hello from './components/hello';

const Root = () => {
		return(
			<Router>
				<div>
					<Route exact path="/" component={Hello} />
					<Route exact path="/store" component={Shoppe} />
				</div>
			</Router>
		)
}


// <Miss component={notFound} />


render(<Root />, document.querySelector('#app'));
