import React from 'react';
import '../App.css';
import {MdVisibility} from 'react-icons/lib/md';

var Input = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		type: React.PropTypes.string,
		placeholer: React.PropTypes.string
	},
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

export default Input;