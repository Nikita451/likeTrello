import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _boads = [];
let _error = null;
const CHANGE_EVENT = 'change';

class BoadStore extends EventEmitter {
	
  constructor() {
    super();
  }

	getAll() {
    return _boads;
	}

	getError() {
		return _error;
	}

  _deleteById(id) {
    for (let i=0; i < _boads.length; i++) {
      if (_boads[i]._id == id) {
        _boads.splice(i, 1);
        break;
      }
    }
  }

  _updateById(id, name) {
    for (let i=0; i < _boads.length; i++) {
      if (_boads[i]._id == id) {
        _boads[i].name = name;
        break;
      }
    } 
  }
  
  addChangeListener(callback) {
    this.on( CHANGE_EVENT, callback );
  }

  removeChangeListener( callback ) {
  	this.removeListener( CHANGE_EVENT, callback );
  }

  emitChange() {
  	this.emit( CHANGE_EVENT );
  }

}

let boadStore = new BoadStore();

AppDisp.register( (action) => {
  switch (action.type) {
  	case AppConst.BOAD_LOAD_SUCCESS:
  	  _boads = action.items;
  	  _error = null;
  	  boadStore.emitChange();
  	  break;

    case AppConst.BOAD_LOAD_FAIL:
      _boads = [];
      _error = action.error;
      boadStore.emitChange();
      break;

    case AppConst.BOAD_CREATE_SUCCESS:
      _boads.unshift( action.item );
      _error=null;
      boadStore.emitChange();
      break;

    case AppConst.BOAD_CREATE_FAIL:
      _error = action.error;
      boadStore.emitChange();
      break;

    case AppConst.BOAD_DELETE_SUCCESS:
      let id = action.item._id;
      boadStore._deleteById( id );
      boadStore.emitChange();
      break;

    case AppConst.BOAD_DELETE_FAIL:
      _error = action.error;
      boadStore.emitChange();
      break;
    
    case AppConst.BOAD_UPDATE_SUCCESS:
      boadStore._updateById( action.item._id, action.item.name );
      boadStore.emitChange();
      break;

    case AppConst.BOAD_UPDATE_FAIL:
      _error = action.error;
      boadStore.emitChange();
      break;
  }
});

export default boadStore;