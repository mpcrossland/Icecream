import React from 'react';
import { formatPrice } from '../helpers';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


class Order extends React.Component {
	constructor() {
		super();
		this.renderOrder = this.renderOrder.bind(this);

	}

	renderOrder(key){
		const icecream = this.props.icecreams[key];
		const count = this.props.order[key];
		const removeButton = <button onClick={() => this.props.removeFromOrder(key)} className="remove-button" > &times;</button>

		if(!icecream || icecream.status === 'unavailable') {
			return <li key={key}> Sorry, {icecream ? icecream.name : 'icecream' } is no longer available {removeButton} </li>
		}

		return(
			<li key={key}>
				<span> 
					<ReactCSSTransitionGroup
						component="span"
						className="count"
						transitionName="count"
						transitionEnterTimeout={250}
						transitionLeaveTimeout={250} >
						<span key={count}> {count} </span>
					</ReactCSSTransitionGroup>
					{icecream.name} 
				</span>
				<span className="price">{formatPrice(count * icecream.price)} {removeButton} </span>
			</li>
		)
	};
	render () {
		const orderIds = Object.keys(this.props.order);

		const total = orderIds.reduce((prevTotal, key) => {
			const icecream = this.props.icecreams[key];
			const count = this.props.order[key];
			const isAvailable = icecream && icecream.status === 'available';
			if(isAvailable) {
				return prevTotal + (count * icecream.price || 0)
			}
			return prevTotal;
		}, 0);

		return(
			<div className="order-wrap">
				<h2>Your Order</h2>
				<nobr><ReactCSSTransitionGroup 
					className="order"
					component="ul"
					transitionName="order"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
					{orderIds.map(this.renderOrder)}
						<li className="total">
							<strong> Total: </strong>
							{formatPrice(total)}
						</li>
				</ReactCSSTransitionGroup></nobr>
			</div>
		)
	}
}
Order.propTypes ={
	icecreams: React.PropTypes.object.isRequired,
	order: React.PropTypes.object.isRequired,
	removeFromOrder: React.PropTypes.func.isRequired
};

export default Order;