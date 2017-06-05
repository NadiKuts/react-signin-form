import React from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MdAccountCircle, MdAddCircle, MdArrowBack, MdCancel} from 'react-icons/lib/md';

var Input = React.createClass({
	render: function() {
		return (
			<div className="Input">
				<input 
					id={this.props.name}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>	
				<label htmlFor={this.props.name}></label>
			</div>
		);
	}
});
var Back = React.createClass({
	render: function() {
		return (
			<div className='Back'>
				<MdArrowBack/>
			</div>
		)
	}
});

var Sign = React.createClass ({
	render: function() {
		console.log(this.props.type);
		var icon = null;
		if (this.props.type == 'signIn') {
			icon = <MdAccountCircle className='icons'/>
		} else {
			icon = <MdAddCircle className='icons'/>
		}
		return (
			<div className={this.props.type=='signIn' ? 'signIn' : 'signUp'}>
				<div className='center'>
					{icon}
					<p>{this.props.type == 'signIn' ? 'SIGN IN' : 'SIGN UP'}</p>
				</div>
			</div>
		);
	}
});

var Modal = React.createClass({
	render: function() {
		let test = 1;
		
		return (
			<div className="Modal">
				<Sign type='signIn'></Sign>
				<Sign type='signUp'></Sign>
			</div>
		);
	}
});

var App = React.createClass({
	getInitialState: function() {
		return { mounted: false };
	},
	
	componentDidMount: function() {
		this.setState({ mounted: true });
	},
	
	handleSubmit: function(e) {
		this.setState({ mounted: false });
		e.preventDefault();
	},

	render: function() {
		var child;
		let test = 12;
		if(this.state.mounted) {
			child = (
				<div className="App_test">
					<Back></Back>
					<Modal onSubmit={this.handleSubmit} testProp = {test} />
				</div>
			);
		}
		
		return(
			<div className="App">
				<ReactCSSTransitionGroup 
					transitionName="example"
					transitionEnterTimeout={500}
					transitionLeaveTimeout={300}>
						{child}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

export default App;
