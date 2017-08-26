import React from 'react';
import AddIcecreamForm from '../components/addIcecreamForm';
// import base from '.././base';
// import firebase from 'firebase';




class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);

	}

	handleChange(e, key) {
		const icecream = this.props.icecreams[key];
		const updatedIcecream = {...icecream,
			[e.target.name]: e.target.value
		}
		this.props.updateIcecream(key, updatedIcecream);
	}


	renderInventory(key) {
		const icecream = this.props.icecreams[key];
		return(
			<div className="icecream-edit" key={key}>
				<input type="text" name="name" value={icecream.name} placeholder="ice cream name"
					onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="price" value={icecream.price} placeholder="Icecream Price"
				onChange={(e) => this.handleChange(e, key)} />
				<select type="text" name="status" value={icecream.status} placeholder="Icecream Status" 
				onChange={(e) => this.handleChange(e, key)}>
					<option value="available"> In Stock </option>
					<option value="unavailable"> Out Of Stock </option>
				</select>
				<textarea type="text" name="desc" value={icecream.desc} placeholder="Icecream Desc" 
				onChange={(e) => this.handleChange(e, key)} />
				<input type="text" name="image" value={icecream.image} placeholder="Icecream Image"
				onChange={(e) => this.handleChange(e, key)} />
				<button name="remove" onClick={() => this.props.removeIcecream(key)}> Remove This Item </button>
			</div>
		)
	}




	render () {
		return(
			<div className="inventory">
				<h2> Create a New Item </h2>
				<AddIcecreamForm addIcecream={this.props.addIcecream} />
				<h2> Edit an Existing Item </h2>
				{Object.keys(this.props.icecreams).map(this.renderInventory)}

				<button className="samples" name="samples" onClick={this.props.loadSamples}> Load Samples </button>
		</div>
		)
	}
}
Inventory.propTypes = {
	icecreams: React.PropTypes.object.isRequired,
	removeIcecream: React.PropTypes.func.isRequired,
	updateIcecream: React.PropTypes.func.isRequired,
	addIcecream: React.PropTypes.func.isRequired,
	loadSamples: React.PropTypes.func.isRequired

}

export default Inventory;


//you are a good girlfriend,