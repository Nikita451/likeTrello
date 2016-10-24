import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _comments = [];
let _error = null;
const CHANGE_EVENT = 'change';

class CommentStore extends EventEmitter {
    constructor() {
        super();
    }

    getComments(id_card) {    
        let comments = [];
        for (let j=0; j < _comments.length; j++ ) {
            if ( _comments[j].card == id_card ) {    
                comments.push( _comments[j] );
            }
        }
        return comments;
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

let commentStore = new CommentStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _comments = action.items.comments;
      commentStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _comments= [];
      _error = action.err;
      commentStore.emitChange();
      break;
    case AppConst.COMMENT_CREATE_SUCCESS:
      _comments.push( action.item );
      _error = null;
      commentStore.emitChange();
      break;

    case AppConst.COMMENT_CREATE_FAIL:
      _error = action.err;
      commentStore.emitChange();
      break;
  };
});

export default commentStore;