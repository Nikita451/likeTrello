import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class ListAction {
    static getLists(id) {
        $.ajax({
            url : `/lists/${id}`,
            success: function (items) {
              AppDisp.dispatch({
                type: AppConst.LIST_LOAD_SUCCESS,
                items: items
              });
            },
            error: function (err) {
              AppDisp.dispatch({
                type: AppConst.LIST_LOAD_FAIL,
                error: err
              });
            }
        });
    }
}

export default ListAction;