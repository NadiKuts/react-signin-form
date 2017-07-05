import React from 'react';
import '../App.css';
import Sign from './Sign';
import SignExpanded from './SignExpanded';
import SignCollapsed from './SignCollapsed';

var Modal = React.createClass({
	propTypes: {
		onSubmit: React.PropTypes.func
	},
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
		return (
			<div className="Modal">
				{modalContent}
			</div>
		);
	}
});

export default Modal;