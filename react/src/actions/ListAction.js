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

    static createList(id_boad, name) {
      $.ajax({
        url: '/lists',
        type: 'POST',
        data: { name: name, boad: id_boad },
        success: function (item) {
          AppDisp.dispatch({
            type: AppConst.LIST_CREATE_SUCCESS,
            item: item,
          });
        },
        error: function (err) {
          AppDisp.dispatch({
            type: AppConst.LIST_CREATE_FAIL,
            error: err,
          });
        }
      });
    }

    static updateList(id_list, name) {
      $.ajax({
        url: `/lists/${id_list}`,
        type: 'PUT',
        data: { name: name },
        success: function (item) {
          AppDisp.dispatch({
            type: AppConst.LIST_UPDATE_SUCCESS,
            item: item,
          });
        },
        error: function (err) {
          AppDisp.dispatch({
            type: AppConst.LIST_UPDATE_FAIL,
            error: err,
          });
        }
      });
    }

}

export default ListAction;