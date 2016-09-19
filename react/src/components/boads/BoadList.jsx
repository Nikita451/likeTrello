import React from 'react';
import BoadView from './BoadView.jsx';
import BoadSearch from './BoadSearch.jsx';

import './BoadList.less';

class BoadList extends React.Component {
	
	render() {
		return (
			<div>
			  <div className="header_top">
	        MURMANSK BUSINESS HUB
				</div>
			  <BoadSearch onSearch={this.props.onSearch} addBoad={this.props.addBoad} />
				<div id="boads">
		      {
		      	this.props.boads.map((boad) => 
		           <BoadView 
		             key={boad._id}
		             id={boad._id}
		             name={boad.name}
		             deleteBoad={this.props.deleteBoad.bind(null, boad._id)}
		             changeText={this.props.changeText.bind(null, boad._id)}
		            />
								
								
		      	)
		      }
				</div>
			</div>
		);
	}
}

export default BoadList;
