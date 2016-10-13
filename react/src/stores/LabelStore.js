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
  };
});

export default labelStore;