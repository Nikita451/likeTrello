import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class TodoListAction {

    static createTodolist(id_card, name) {
      $.ajax({
        url: '/todolists',
        type: 'POST',
        data: { name: name, card: id_card },
        success: function (item) {
          AppDisp.dispatch({
            type: AppConst.TODOLIST_CREATE_SUCCESS,
            item: item,
          });
        },
        error: function (err) {
          AppDisp.dispatch({
            type: AppConst.TODOLIST_CREATE_FAIL,
            error: err,
          });
        }
      });
    }

    static updateTodolist(id_todolist, name) {
      $.ajax({
        url: `/todolists/${id_todolist}`,
        type: 'PUT',
        data: { name: name },
        success: function (item) {
          AppDisp.dispatch({
            type: AppConst.TODOLIST_UPDATE_SUCCESS,
            item: item,
          });
        },
        error: function (err) {
          AppDisp.dispatch({
            type: AppConst.TODOLIST_UPDATE_FAIL,
            error: err,
          });
        }
      });
    }

}

export default TodoListAction;