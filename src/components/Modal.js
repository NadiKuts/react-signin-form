import React, {Component} from 'react';
import PropTypes from 'prop-types';
import '../App.css';
import Sign from './Sign';
import SignExpanded from './SignExpanded';
import SignCollapsed from './SignCollapsed';

class Modal extends Component {

	constructor(props) {
		super(props);
		this.state = {
			wasClickedLeft: false,
			wasClickedRight: false,
		};
	}

	onReset = () => {
		this.setState({
			wasClickedLeft: false,
			wasClickedRight: false
		})
	}

	onClickLeft = () =>{
		this.setState({wasClickedLeft: !this.state.wasClickedLeft}, function() {
			if (this.state.wasClickedRight == true && this.state.wasClickedLeft == true) {
				this.setState({wasClickedRight: false});
			};
		});
		
	}

	onClickRight = () => {
		this.setState({wasClickedRight: !this.state.wasClickedRight}, function(){
			if (this.state.wasClickedRight == true && this.state.wasClickedLeft == true) {
				this.setState({wasClickedLeft: false});
			};
		});
	}

	render () {
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

}

Modal.propTypes = {
	onSubmit: PropTypes.func
};

export default Modal;