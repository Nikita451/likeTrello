import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _labels = [];
let _error = null;
const CHANGE_EVENT = 'change';

class LabelStore extends EventEmitter {
    constructor() {
        super();
    }

    getLabels(id_card) {    
        let labels = [];
        for (let j=0; j < _labels.length; j++ ) {
            if ( _labels[j].card == id_card ) {    
                labels.push( _labels[j] );
            }
        }
        return labels;
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

    delete(id) {
      let curIndex = _labels.findIndex( (elem) => elem._id == id );
      if (curIndex != -1) {
          _labels.splice(curIndex, 1);
      }
    }

    deleteByCardId(id_card) {
        for (let i=0; i < _labels.length; i++) {
            if (_labels[i].card == id_card) {
                this.delete( _labels[i]._id )
            }
        }
        this.emitChange();
    }


}

let labelStore = new LabelStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _labels = action.items.labels;
      labelStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _labels= [];
      _error = action.error;
      labelStore.emitChange();
      break;

    case AppConst.LABEL_CREATE_SUCCESS:
      _labels.push( action.item );
      _error = null;
      labelStore.emitChange();
      break;

    case AppConst.CARD_UPDATE_FAIL:
      _error = action.error;
      labelStore.emitChange();
      break;

    case AppConst.LABEL_DELETE_SUCCESS:
      labelStore.delete( action.item._id )
      labelStore.emitChange();
      break;
    case AppConst.LABEL_DELETE_FAIL:
      _error = action.error;
      labelStore.emitChange();
      break;
  };
});

export default labelStore;