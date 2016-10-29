import React from 'react';
import ListAction from '../actions/ListAction.js';
import ListStore from '../stores/ListStore.js';
import ListList from '../components/lists/ListList.jsx';
import CardAction from '../actions/CardAction.js';

function getStates(id_boad) {
    return {
      lists: ListStore.getLists(id_boad),
      error: ListStore.getError(),
    };
}

class ListContainer extends React.Component {
    

    constructor(props, context) {
        super( props, context );
        let id_boad = this.props.params.id
        this.state = getStates( id_boad )
        ListStore.addChangeListener(this._onChange);
        ListAction.getLists( id_boad ); // with cards, todolists, comments and etc.
    }

    _onChange = () => {
      this.setState( getStates( this.props.params.id ) );
    }

    _onSearch = (name) => {
        let id_boad = this.props.params.id;
        if (name) {
            let items = getStates(id_boad).lists.filter( (list) => {
                return list.name.indexOf( name ) !== -1
            })
            this.setState( { lists: items } )
        } else {
            this._onChange();
        }
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

    deleteList(id) {
       if (confirm("Удалить список?")) {
           ListAction.delete( id )
       }
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
                deleteList={this.deleteList}
                _onSearch={this._onSearch}
                />
                {this.props.children}
             </div>
        );
    }
}

export default ListContainer;