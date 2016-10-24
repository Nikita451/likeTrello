import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class TaskAction {
    static createTask( id_todolist, name) {
         $.ajax({
            url: '/tasks',
            type: 'POST',
            data: { name: name, todolist: id_todolist, complete: false },
            success: function (item) {
            AppDisp.dispatch({
                type: AppConst.TASK_CREATE_SUCCESS,
                item: item,
            });
            },
            error: function (err) {
            AppDisp.dispatch({
                type: AppConst.TASK_CREATE_FAIL,
                error: err,
            });
            }
        });
    }

    static update(id, text, currentCheck) {
         $.ajax({
            url: `/tasks/${id}`,
            type: 'PUT',
            data: { name: text, complete: currentCheck },
            success: function (item) {
            AppDisp.dispatch({
                type: AppConst.TASK_UPDATE_SUCCESS,
                item: item,
            });
            },
            error: function (err) {
            AppDisp.dispatch({
                type: AppConst.TASK_UPDATE_FAIL,
                error: err,
            });
            }
        });
    }

}

export default TaskAction;