import React from 'react';


class AddIcecreamForm extends React.Component {

	createIcecream(event) {
		event.preventDefault();
		console.log('gonna make some fish');
		const icecream = {
			name: this.name.value,
			price: this.price.value,
			status: this.status.value,
			desc: this.desc.value,
			image: this.image.value,
		}
		this.props.addIcecream(icecream);
		this.icecreamForm.reset();
	}


	render () {
		return(
			<form ref={(input) => this.icecreamForm = input} className="icecream-form" onSubmit={(e) => this.createIcecream(e)}>
				<input ref={(input) => this.name = input} type="text" name="name" placeholder="name" />
				<input ref={(input) => this.price = input} type="text" name="price" placeholder="price" />
				<select ref={(input) => this.status = input} name="status">
					<option value="available"> In Stock </option>
					<option value="unavailable"> Out Of Stock </option>
				</select>
				<textarea ref={(input) => this.desc = input} placeholder="Description" name="desc" /> 
				<input ref={(input) => this.image = input} type="text" placeholder="image" name="image" />
				<button type="submit" name="add"> + Add Item </button>

			</form>
		)
	}
}
AddIcecreamForm.propTypes={
	addIcecream: React.PropTypes.func.isRequired
}
export default AddIcecreamForm;