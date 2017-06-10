import React from 'react';

class Cards extends React.Component{
	constructor(){
		super();
		this.state = {
			reply: '',
			likes: ''
		}
	}
	render(){
		return(
		<div className="postCard">
			<div><img className="avatar" src={this.props.photo} /> </div>
			<h2>{this.props.user}</h2>
			<img src={this.props.post.userPhoto} />
			<div className="comment">{this.props.post.comment}</div>

			<section className="reply">
				<form onSubmit={this.handleSubmit}>
					<input name='reply' placeholder="Write a comment" value={this.state.reply} type="text" onChange={this.handleChange} />
					<input type="submit" value="Add" />
				</form>
				<ul>
				{this.state.replys.map((reply) => {
					return (<li key={reply.key}>
						{reply.description}
						<a href onClick={ () => this.removeReply(reply.key)}><i class="fa fa-times" aria-hidden="true"></i></a>
						</li>)
					})}
				</ul>
			</section>
		</div>
	)
}
}