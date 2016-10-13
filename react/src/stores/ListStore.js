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

    _updateList(id, name) {
        for (let j=0; j < _lists.length; j++) {
            if (_lists[j]._id == id) {
                _lists[j].name = name;
                return;
            }
        }
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
      _lists = action.items.lists;
      listStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _lists = [];
      _error = action.error;
      listStore.emitChange();
      break;

    case AppConst.LIST_CREATE_SUCCESS:
      _error = null;
      _lists.push( action.item );
      listStore.emitChange();
      break;

    case AppConst.LIST_CREATE_FAIL:
      _error = action.error;
      listStore.emitChange();
      break;
    
    case AppConst.LIST_UPDATE_SUCCESS:
      _error = null;
      listStore._updateList(action.item._id, action.item.name);
      listStore.emitChange();
      break;

    case AppConst.LIST_UPDATE_FAIL:
      _error = action.error;
      listStore.emitChange();
      break;
  };
});

export default listStore;