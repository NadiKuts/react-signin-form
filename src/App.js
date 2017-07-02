import React from 'react';
import './App.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {MdAccountCircle, MdAddCircle, MdArrowBack, MdCancel, MdArrowForward, MdVisibility} from 'react-icons/lib/md';
import {FaGooglePlus, FaTwitter, FaFacebook} from 'react-icons/lib/fa';
import {Motion, spring} from 'react-motion';

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
	// getInitialState: function() {
	// 	return {
	// 		open: false,
	// 	}
	// },
	// componentDidMount: function () {
	// 	this.setState({open: !this.state.open});
	// },
	render: function() {
		return (
			<div onClick={this.props.initialState} className='Back'>
				{/* <Motion style={{x: spring(this.state.open ? 1 : 0.1,{stiffness: 10, damping: 17})}}>
					{({x}) =>
						<MdArrowBack style={{opacity: `${x}`}}/>
          }
				</Motion> */}
				<MdArrowBack />
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
	getInitialState: function() {
		return {
			open: false
		}
	},
	componentDidMount: function() {
     this.setState({open: !this.state.open});  
  },
	
	render: function() {
		return (
			<div className={this.props.type=='signIn' ? 'signInExpanded' : 'signUpExpanded'}>
				<Motion style={{ 
					opacity: spring(this.state.open ? 1 : 0.1, {stiffness: 120, damping: 17}),
					y: spring(this.state.open ? 0 : 20, {stiffness: 120, damping: 17})
				 }} >
						{({opacity, y}) =>
						<form className='logForm' style={{
							WebkitTransform: `translate3d(0, ${y}px, 0)`,
              transform: `translate3d(0, ${y}px, 0)`,
							opacity: `${opacity}`
						}}>
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
							<a href="url" className='forgotPass'>{this.props.type == 'signIn' ? 'Forgot password?' : ''}</a>
						</form>
	          }
				</Motion>
			</div>
		);
	}
});

var SubmitButton = React.createClass({
	render: function() {
		var socialNets = null;
		if (this.props.type == 'signIn') {
			socialNets = (
				<div className='socialNets'>
					<FaGooglePlus className='socialNetsIcon'/>
					<FaTwitter className='socialNetsIcon'/>
					<FaFacebook className='socialNetsIcon'/>
				</div>
			)
		} else {
			socialNets = (
				<div className='socialNets'>
				</div>
			)
		}
		return (
			<div className={'submitButton'}>
				{socialNets}
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
