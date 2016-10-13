import React from 'react';
import ListAction from '../actions/ListAction.js';
import ListStore from '../stores/ListStore.js';
import ListList from '../components/lists/ListList.jsx';
import CardAction from '../actions/CardAction.js';

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
        ListAction.getLists( this.props.params.id ); // with cards, todolists, comments and etc.
    }

    _onChange = () => {
      this.setState( getStates() );
    }

    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange);
    }

    onAddList = (newList) => { 
        let id_boad = this.props.params.id;
        ListAction.createList( id_boad, newList );
    }

    addCard( id_list, newCard ) {
        CardAction.createCard(id_list, newCard);
    }

    updateList( id_list,  updateText) {
        ListAction.updateList( id_list, updateText );
    }

    render() {
        return (
            <div>
                <ListList
                lists={this.state.lists}
                id_boad={this.props.params.id}
                onAddList={this.onAddList}
                addCard={this.addCard}
                updateList={this.updateList}
                />
                {this.props.children}
             </div>
        );
    }
}

export default ListContainer;