import React from 'react';
import '../App.css';
import {MdArrowForward} from 'react-icons/lib/md';
import {FaGooglePlus, FaTwitter, FaFacebook} from 'react-icons/lib/fa';
import {Motion, spring} from 'react-motion';

var SubmitButton = React.createClass({
	propTypes: {
		type: React.PropTypes.string
	},
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

export default SubmitButton;