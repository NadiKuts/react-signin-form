import React from 'react';
import '../App.css';
import {Motion, spring} from 'react-motion';
import Input from './Input';
import SubmitButton from './SubmitButton';

var SignExpanded = React.createClass ({
	propTypes: {
		type: React.PropTypes.string
	},
	getInitialState: function() {
		return {
			flexState: false,
			animIsFinished: false
		}
	},
	componentDidMount: function() {
     this.setState({flexState: !this.state.flexState});  
  },
	
	isFinished: function(){
		this.setState({animIsFinished: true});
	},
	
	render: function() {
		return (
			<Motion style={{
				flexVal: spring(this.state.flexState ? 8 : 1)
			}} onRest={this.isFinished}>
			{({flexVal}) =>
			<div className={this.props.type=='signIn' ? 'signInExpanded' : 'signUpExpanded'} style={{
				flexGrow: `${flexVal}`
			}}>
				<Motion style={{ 
					opacity: spring(this.state.flexState ? 1 : 0,{stiffness: 300, damping: 17}),
					y: spring(this.state.flexState ? 0 : 50, {stiffness: 100, damping: 17})
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
		}
			</Motion>
		);
	}
});

export default SignExpanded;