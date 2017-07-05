import React from 'react';
import '../App.css';
import {MdAccountCircle, MdAddCircle} from 'react-icons/lib/md';

var Sign = React.createClass ({
	propTypes: {
		type: React.PropTypes.string,
		onChange: React.PropTypes.func
	},
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

export default Sign;