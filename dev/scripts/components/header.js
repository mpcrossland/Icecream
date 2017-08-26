import React from 'react';

class Header extends React.Component {
	constructor(){
		super();
	}
	render() {
		return(
			<header className="top">
				<img src="../../../public/images/logo.png" alt="logo" />
			</header>
		)
	}
}
export default Header;