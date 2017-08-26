import React from 'react';
import AddIcecreamForm from '../components/addIcecreamForm';
import base from '.././base';
import firebase from 'firebase';




class Inventory extends React.Component {
	constructor(){
		super();
		this.renderInventory = this.renderInventory.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.renderLogin = this.renderLogin.bind(this);
		this.authenticate = this.authenticate.bind(this);
		this.authHandler = this.authHandler.bind(this);
		this.logout = this.logout.bind(this);

		this.state = {
			uid: null,
			owner: null
		}
	}
	componentWillMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if(user) {
				//user is signed in
				this.authHandler(user);
			} else{
				//no user signed in
				this.setState({
					uid: null,
					owner: null
				})
			}
		});
		
	}


	authenticate(provider) {
		console.log(`trying to auth with ${provider}`);
		
		firebase.auth().signInWithPopup(provider)
			.then((result) => {
				const user = result.user;
				this.setState({
					uid : user,
					owner : user
				});
			});
		this.authHandler();
	}



	authHandler(authData) {
		const storeRef = firebase.database().ref()

		storeRef.on('value', (snapshot) => {
				var data = snapshot.val() || {};

				if (!data.owner) {
					// claim the store 
					storeRef.set ({
						owner: user.uid
					})
				}
			//update state to reflect current owner and logged in user
			this.setState({
				uid: user.uid,
				owner: data.owner || user.uid
			});
		});
	}

	renderLogin() {
		return(
			<nav className="login">
				<h2>Inventory</h2>
				<p> Sign in to manage your store's inventory</p>
				<button className="github" onClick={this.authenticate.bind(this, new firebase.auth.GithubAuthProvider() )}>
					Log in with Github
				</button>
				<button className="facebook">
					Log in with Facebook
				</button>
				<button className="twitter"> 
					Log in with Twitter
				</button>
			</nav>
		)
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

	logout() {
		firebase.auth().signOut()
			.then(() => {
				this.setState({
					uid: null,
					owner: null
				})
		})
	}
	handleChange(e, key) {
		const icecream = this.props.icecreams[key];
		const updatedIcecream = {...icecream,
			[e.target.name]: e.target.value
		}
		this.props.updateIcecream(key, updatedIcecream);
	}



	render () {
		const logout = <button onClick={this.logout} >Log Out!</button>;
		//check if they are loged in at all

		if(!this.state.uid) {
			return (
				<div className="inventory">{this.renderLogin()}</div>
			)
		}

		//the check if they are the owner of the store
		if(this.state.uid !== this.state.uid){
			return(
				<div>
					<p>Sorry, you aren't the owner of this store.</p>
					{logout}
				</div>
			)
		}
		return(
			<div className="inventory">
				<h2> Create a New Item </h2>
				{logout}
				<img src={this.state.uid.photoURL} width="50px" height="50px" />
				<AddIcecreamForm addIcecream={this.props.addIcecream} />
				<h2> Edit an Existing Item </h2>
				{Object.keys(this.props.icecreams).map(this.renderInventory)}

				<button name="samples" onClick={this.props.loadSamples}> Load Sample Ice Cream </button>
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