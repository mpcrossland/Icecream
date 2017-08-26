import React from 'react';
import Header from '../components/header';
import Order from '../components/order';
import Inventory from '../components/inventory';
import Icecream from '../components/icecream';
import sampleIcecreams from '.././sampleicecream';
import base from '.././base';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
// import Rebase from 're-base';


class Shoppe extends React.Component {
	constructor(){
		super();
		this.addIcecream = this.addIcecream.bind(this);
		this.updateIcecream = this.updateIcecream.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.removeIcecream = this.removeIcecream.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		this.toggleInventory = this.toggleInventory.bind(this);

		//initial state
		this.state = {
			icecreams: {},
			order: {},
			showInventory: false
		};
	}

	componentWillMount() {
	  // this runs right before the <App> is rendered
	  this.ref = base.syncState('Store', {
	    context: this,
	    state: 'icecreams'
	  });
	  //check if there is anythign in local storage
	  const localStorageRef = localStorage.getItem(`Order`);

	  if(localStorageRef) {
	  	this.setState({
	  		order: JSON.parse(localStorageRef)
	  	});
	  }
	}

	componentWillUnmount() {
		base.removeBinding(this.ref);
	}

	componentWillUpdate(nextProps, nextState) {
		localStorage.setItem(`Order`,
			JSON.stringify(nextState.order));

	}
	loadSamples() {
		this.setState({
			icecreams: sampleIcecreams
		});
		console.log(this.state)
	}

	addIcecream(icecream) {
		//update state
		const icecreams = {...this.state.icecreams};
		//add in out new icecream
		const timestamp = Date.now();
		icecreams[`icecream-${timestamp}`] = icecream;
		//set state
		this.setState({ icecreams })
	};
	removeIcecream(key, icecream){
		const icecreams = {...this.state.icecreams};
		icecreams[key] = null;
		this.setState ({ icecreams });
	}
	
	updateIcecream(key, updatedIcecream) {
		const icecreams = {...this.state.fishes};
		icecreams[key] = updatedIcecream;
		this.setState({ icecreams }) 
	};



	addToOrder(key) {
		//copy state
		const order = {...this.state.order};
		// update of a the new numebr of dish ordered
		order[key] = order[key] + 1 || 1;
		this.setState ({ order });
	}
	removeFromOrder(key){
		const order = {...this.state.order};
		delete order[key];
		this.setState ({ order });
	}




	toggleInventory(){
		this.setState({ showInventory: !this.state.showInventory });
		var NAME = document.getElementById("invent");
		    NAME.className = (NAME.className == "show-inventory") ? "hide-inventory" : "show-inventory";


	};

	render () {
		return(
			<div className="shoppe">
			<button onClick={() => { this.toggleInventory();}}  className="show-inventory" id="invent" value="invent"> <nobr>toggle inventory</nobr> </button>
			<div className="header-wrap">
				<Header 
					toggleInventory={this.toggleInventory}
					 />

				<ul className="list-of-icecream">
					{
					Object
						.keys(this.state.icecreams)
						.map(key => <Icecream key={key} index={key} details={this.state.icecreams[key]} addToOrder={this.addToOrder} /> )
					}
				</ul>
			</div>

				<Order icecreams={this.state.icecreams}
						order={this.state.order} 
						path={this.state.pathname}
						removeFromOrder={this.removeFromOrder}
						/>

			{/*	<ReactCSSTransitionGroup 
					className="inventory"
					transitionName="inventory"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
			*/}		
					{this.state.showInventory ?
						<Inventory loadSamples={this.loadSamples}  
							addIcecream={this.addIcecream}
							removeIcecream={this.removeIcecream}
							icecreams={this.state.icecreams}
							updateIcecream={this.updateIcecream}
						/>
					: null
					}
			{/*	</ReactCSSTransitionGroup> 
			*/}
				
			</div>
		)
	}
}

export default Shoppe;