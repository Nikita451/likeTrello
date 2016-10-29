import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

import TodolistStore from './TodolistStore.js';
import LabelStore from './LabelStore.js';
import CommentStore from './CommentStore.js';

let _cards = [];
let _error = null;
const CHANGE_EVENT = 'change';

class CardStore extends EventEmitter {
    constructor() {
        super();
    }

    getCard(id) {    
        
        for (let j=0; j < _cards.length; j++ ) {
            if ( _cards[j]._id == id ) {    
                return _cards[j];
            }
        }
    }

    getCards(id_list) {
        let cards = [];
        for (let i=0; i < _cards.length; i++) {
            if (_cards[i].list == id_list) {
                cards.push( _cards[i] );
            }
        }
        return cards;
    }

    updateCard(id, name) {
        for (let j=0; j < _cards.length; j++) {
            if (_cards[j]._id == id) {
                _cards[j].name = name;
                return;
            }
        }
    }

    getError() {
        return _error;
    }

    addChangeListener(callback) {
        this.on( CHANGE_EVENT, callback );
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    delete(id_card) {
      TodolistStore.deleteByCardId( id_card )
      LabelStore.deleteByCardId( id_card )
      CommentStore.deleteByCardId( id_card )
        let curIndex = _cards.findIndex( card => card._id == id_card )
      _cards.splice(curIndex, 1)
    }

    deleteByListId(id_list) {
        for (let i=0; i < _cards.length; i++) {
            if (_cards[i].list == id_list) {
                this.delete( _cards[i]._id )
            }
        }
        this.emitChange();
    }

}

let cardStore = new CardStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _cards = action.items.cards;
      cardStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _cards= [];
      _error = action.error;
      cardStore.emitChange();
      break;

    case AppConst.CARD_CREATE_SUCCESS:
      _cards.push( action.item );
      _error = null;
      cardStore.emitChange();
      break;

    case AppConst.CARD_CREATE_FAIL:
      _error = action.error;
      cardStore.emitChange();
      break;

    case AppConst.CARD_UPDATE_SUCCESS:
      _error = null;
      cardStore.updateCard(action.item._id, action.item.name);
      cardStore.emitChange();
      break;

    case AppConst.CARD_UPDATE_FAIL:
      _error = action.error;
      cardStore.emitChange();
      break;

    case AppConst.CARD_DELETE_SUCCESS:  
      cardStore.delete( action.item._id )
      cardStore.emitChange();
      break;

    case AppConst.CARD_DELETE_FAIL:
      _error = action.error;
      cardStore.emitChange();
      break;
  };
});

export default cardStore;