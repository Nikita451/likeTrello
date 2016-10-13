import AppConst from '../constants';
import AppDisp from '../dispatcher';
import { EventEmitter } from 'events';

let _tasks = [];
let _error = null;
const CHANGE_EVENT = 'change';

class TaskStore extends EventEmitter {
    constructor() {
        super();
    }
    
    getTasks(id_todolist) {    
        let tasks = [];
        for (let j=0; j < _tasks.length; j++ ) {
            if ( _tasks[j].todolist == id_todolist ) {
                tasks.push( _tasks[j] );
            }
        }
        return tasks;
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

let taskStore = new TaskStore();

AppDisp.register( (action) => {
  switch(action.type) {
    case AppConst.LIST_LOAD_SUCCESS:
      _error = null;
      _tasks = action.items.tasks;
      taskStore.emitChange();
      break;
    case AppConst.LIST_LOAD_FAIL:
      _tasks= [];
      _error = action.err;
      taskStore.emitChange();
      break;
  };
});

export default taskStore;