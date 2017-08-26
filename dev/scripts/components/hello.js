import React from 'react';
import { render } from 'react-dom';

import { withRouter } from 'react-router-dom'


class Hello extends React.Component {
	constructor() {
		super();
		this.goToStore = this.goToStore.bind(this);
	}

	goToStore(event) {
		event.preventDefault();
		console.log(this.props.history.push(`/store`));
		//grab text from button
		// this.props.history.push(`/store/`)
		//transition to store/:storeId
	};



	render () {

		const Button = withRouter(({ history}) => (
		  <button
		    type='button' className="enter-btn"
		    onClick={() => { history.push('/store') }}
		  > Let's Go!! </button>
		))

		return <div className="hello-wrap">
					<h1>The Ice-Cream Shoppe</h1>
					<Button className="enter-btn" />
					<img src="../../../public/images/truck.gif" />
					



				</div>
	}
}
					// <form onSubmit={(e) => this.goToStore(e)} >
						// <input type="button" onClick={this.goToStore} value="Go To Store ➔" />
					// </form>

export default Hello;
