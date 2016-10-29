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

    updateTask(item) {
        for (var k=0; k < _tasks.length; k++) {
            if (_tasks[k]._id == item._id) {
                _tasks[k].name = item.name;
                _tasks[k].complete = item.complete;
                return;
            }
        }
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

    delete(id_task) {
      let curIndex = _tasks.findIndex( elem => elem._id == id_task )
      _tasks.splice(curIndex, 1)
    }

    deleteByTodolist( id_todolist ) {
        for (let i=0; i < _tasks.length; i++) {
            if (_tasks[i].todolist == id_todolist) {
                this.delete( _tasks[i]._id )
            }
        }
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
    case AppConst.TASK_CREATE_SUCCESS:
      _tasks.push( action.item );
      taskStore.emitChange();
      break;

    case AppConst.TASK_CREATE_FAIL:
      _error = action.error;
      taskStore.emitChange();
      break;

    case AppConst.TASK_UPDATE_SUCCESS:
      taskStore.updateTask( action.item );
      taskStore.emitChange();
      break;

    case AppConst.TASK_UPDATE_FAIL:
      _error = action.error;
      taskStore.emitChange();
      break;

    case AppConst.TASK_DELETE_SUCCESS:
      taskStore.delete( action.item._id )
      taskStore.emitChange();
      break;

    case AppConst.TASK_DELETE_FAIL:
      _error = action.error;
      taskStore.emitChange();
      break;
  };
});

export default taskStore;