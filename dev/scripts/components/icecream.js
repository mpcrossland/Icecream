import React from 'react';
import { formatPrice } from '../helpers';

class Icecream extends React.Component {
	render() {
		const { details, index } = this.props;
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Add To Order ' : 'Sold Out';
		return(
			<li className="menu-icecream">
				<img src={this.props.details.image} alt={this.props.details.name} />
				<h2> {details.name} </h2>
				<h3> {details.desc} </h3>
				<h3> {formatPrice(details.price) } </h3>
				<h4> {details.status} </h4> 
				<button onClick={() => this.props.addToOrder(index) } disabled={!isAvailable}> {buttonText} </button>
			</li>
		)
	}
}
Icecream.propTypes = {
	details: React.PropTypes.object.isRequired,
	index: React.PropTypes.string.isRequired,
	addToOrder: React.PropTypes.func.isRequired
}

export default Icecream;