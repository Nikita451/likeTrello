import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _todolists = [];
let _error = null;
const CHANGE_EVENT = 'change';

class TodolistStore extends EventEmitter {
    constructor() {
        super();
    }

    getTodolists(id_card) {    
        let todolists = [];
        for (let j=0; j < _todolists.length; j++ ) {
            if ( _todolists[j].card == id_card ) {    
                todolists.push( _todolists[j] );
            }
        }
        return todolists;
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

}

let todolistStore = new TodolistStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _todolists = action.items.todolists;
      todolistStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _todolists= [];
      _error = action.err;
      todolistStore.emitChange();
      break;
  };
});

export default todolistStore;