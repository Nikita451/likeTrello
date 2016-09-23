import React from 'react';
import ListAction from '../actions/ListAction.js';
import ListStore from '../stores/ListStore.js';
import ListList from '../components/lists/ListList.jsx';

function getStates() {
    return {
      lists: ListStore.getLists(),
      error: ListStore.getError(),
    };
}

class ListContainer extends React.Component {
    
    state = getStates()

    constructor(props, context) {
        super( props, context );
        ListStore.addChangeListener(this._onChange);
        ListAction.getLists( this.props.params.id );
    }

    _onChange = () => {
      this.setState( getStates() );
    }

    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange);
    }

    render() {
        return (
            <div>
                <ListList
                lists={this.state.lists}
                id_boad={this.props.params.id}
                />
                {this.props.children}
             </div>
        );
    }
}

export default ListContainer;