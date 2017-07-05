import React from 'react';
import '../App.css';
import {MdArrowBack} from 'react-icons/lib/md';
import {FaCircle} from 'react-icons/lib/fa';

var NavigationPanel = React.createClass({
	render: function() {
		return (
			<div className='NavigationPanel'>
				<MdArrowBack onClick={this.props.initialState} className='back'/>
				<div className='dots'>
					<FaCircle className='dotSelected' />
					<FaCircle className='dot' />
					<FaCircle className='dot' />
				</div>
				<div style={{flex: 2}}></div>
			</div>
		)
	}
});

export default NavigationPanel;