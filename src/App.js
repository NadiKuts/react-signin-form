import React from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MdAccountCircle, MdAddCircle, MdArrowBack, MdCancel, MdArrowForward, MdVisibility} from 'react-icons/lib/md';

var Input = React.createClass({	
	render: function() {
		let iconVisibility = null;
		if (this.props.type == 'password') {
			iconVisibility = (
				<MdVisibility className='iconVisibility'/>
			);
		}
		return (
			<div className="Input">
				<input 
					id={this.props.name}
					autoComplete="false"
					required
					type={this.props.type}
					placeholder={this.props.placeholder}
				/>
				{iconVisibility}
			</div>
		);
	}
});
var Back = React.createClass({
	initialState: function() {
		
	},
	render: function() {
		return (
			<div onClick={this.props.initialState} className='Back'>
				<MdArrowBack/>
			</div>
		)
	}
});

var Sign = React.createClass ({
	render: function() {
		var icon = null;
		if (this.props.type == 'signIn') {
			icon = <MdAccountCircle className='icons'/>
		} else {
			icon = <MdAddCircle className='icons'/>
		}
		return (
			<div onClick={this.props.onChange} className={this.props.type=='signIn' ? 'signIn' : 'signUp'}>
				<div className='center'>
					{icon}
					<p>{this.props.type == 'signIn' ? 'SIGN IN' : 'SIGN UP'}</p>
				</div>
			</div>
		);
	}
});

var Modal = React.createClass({
	getInitialState: function() {
		return {
			wasClickedLeft: false,
			wasClickedRight: false,
		}
	},
	onReset: function() {
		this.setState({
			wasClickedLeft: false,
			wasClickedRight: false
		})
	},
	onClickLeft: function() {
		this.setState({wasClickedLeft: !this.state.wasClickedLeft}, function() {
			if (this.state.wasClickedRight == true && this.state.wasClickedLeft == true) {
				this.setState({wasClickedRight: false});
			};
		});
		
	},
	onClickRight: function() {
		this.setState({wasClickedRight: !this.state.wasClickedRight}, function(){
			if (this.state.wasClickedRight == true && this.state.wasClickedLeft == true) {
				this.setState({wasClickedLeft: false});
			};
		});
	},
	render: function() {
		let test = 1;
		let modalContent = null;
		
		if (this.state.wasClickedLeft == false && this.state.wasClickedRight == false) {
			modalContent = (
				<div className='Modal'>
					<Sign type='signIn' onChange={this.onClickLeft}></Sign>
					<Sign type='signUp' onChange={this.onClickRight}></Sign>
				</div>
			);
		} else if (this.state.wasClickedLeft == false && this.state.wasClickedRight == true) {
			modalContent = (
				<div className='Modal'>
					<SignCollapsed type='signIn' onChange={this.onClickLeft}></SignCollapsed>
					<SignExpanded type='signUp' ></SignExpanded>
				</div>
			);
		} else if (this.state.wasClickedLeft == true && this.state.wasClickedRight == false) {
			modalContent = (
				<div className='Modal'>
					<SignExpanded type='signIn' ></SignExpanded>
					<SignCollapsed type='signUp' onChange={this.onClickRight}></SignCollapsed>
				</div>
			);
		}
		/* else {
			signType = (<Sign type='signIn' onChange={this.onClickLeft}></Sign>)
		} */
		return (
			<div className="Modal">
				{modalContent}
			</div>
		);
	}
});

var SignCollapsed = React.createClass ({
	render: function() {
		var icon = null;
		if (this.props.type == 'signIn') {
			icon = <MdAccountCircle className='iconsCollapsed'/>
		} else {
			icon = <MdAddCircle className='iconsCollapsed'/>
		}
		return (
			<div onClick={this.props.onChange} className={this.props.type=='signIn' ? 'signInCollapsed' : 'signUpCollapsed'}>
				{icon}
			</div>
		);
	}
});

var SignExpanded = React.createClass ({
	render: function() {
		return (
			<div className={this.props.type=='signIn' ? 'signInExpanded' : 'signUpExpanded'}>
				<form className='logForm'>
					<h2>{this.props.type == 'signIn' ? 'SIGN IN' : 'SIGN UP'}</h2>
					<Input
						id="login"
						type="text"
						placeholder="LOGIN" />
					<Input
						id="password"
						type="password"
						placeholder="PASSWORD" />
					<SubmitButton type={this.props.type}></SubmitButton>
				</form>
			</div>
		);
	}
});

var SubmitButton = React.createClass({
	render: function() {
		return (
			<div className={'submitButton'}>
				<button className={this.props.type=='signIn' ? 'submitSignIn' : 'submitSignUp'}><MdArrowForward/></button>
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
