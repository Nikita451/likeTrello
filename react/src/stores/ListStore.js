import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _lists = [];
let _error = null;
const CHANGE_EVENT = 'change';

class ListStore extends EventEmitter {
    constructor() {
        super();
    }

    getLists() {
        return _lists;
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

let listStore = new ListStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _lists = action.items;
      listStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _lists = action.items;
      _error = action.err;
      listStore.emitChange();
      break;
  };
});

export default listStore;