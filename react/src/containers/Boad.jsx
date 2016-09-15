import React from 'react';
import BoadList from '../components/boads/BoadList.jsx';
import BoadAction from '../actions/BoadAction.js';
import BoadStore from '../stores/BoadStore.js';

let boads = [{ id: 1, name: "123" }, { id: 2, name: "1234" }, { id: 3, name: "12345" }]

function getState() {
	return {
    boads: BoadStore.getAll(),
    error: BoadStore.getError(),
	};
}

class BoadContainer extends React.Component {
	
	//инициализатор свойств es7 (можно в конструкторе this.state = {} - es6)
  state = getState()

  constructor() {
    super();
    BoadStore.addChangeListener( this._onChange );
    BoadAction.getAll();
  }

  _onChange = () => {
    this.setState( getState() );
  }
  
  _onSearch = (name) => {
    if (name) {
      let items = getState().boads.filter(function(boad) {
	    	return boad.name.indexOf(name) !== -1;
	    });
	    this.setState({
	    	boads: items
	    });
    } else {
    	this._onChange();
    }
  }

  addBoad(name) {
    BoadAction.createBoad(name);
  }

  deleteBoad(id) {
    BoadAction.deleteBoad( id );
  }

  changeText(id, {name}) {
     BoadAction.updateText(id, name);
  }

	render() {
		return (
	      <BoadList 
	        boads={this.state.boads}
	        onSearch={this._onSearch}
          addBoad={this.addBoad}
          deleteBoad={this.deleteBoad}
          changeText={this.changeText}
	      />
		);
	}
}

export default BoadContainer;