import React from 'react';
import '../App.css';
import {MdAccountCircle, MdAddCircle} from 'react-icons/lib/md';

var SignCollapsed = React.createClass ({
	propTypes: {
		type: React.PropTypes.string,
		onChange: React.PropTypes.func
	},
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

export default SignCollapsed;