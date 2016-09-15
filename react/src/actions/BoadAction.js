import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class BoadAction {
	static getAll() {
    $.ajax({
    	method: 'GET',
    	url: '/boads',
    	success: function (data) {
        AppDisp.dispatch({
        	type: AppConst.BOAD_LOAD_SUCCESS,
        	items: data
        });
    	},
    	error: function (err) {
    		AppDisp.dispatch({
        	type: AppConst.BOAD_LOAD_FAIL,
        	error: {message: "Ошибка при загрузке досок"}
        });
    	}
    });
	}

    static createBoad(name) {
        
        $.ajax({
            method: 'POST',
            url: '/boads',
            data: {name},
            dataType: "json", 
            success: function (item) {
              AppDisp.dispatch({
                type: AppConst.BOAD_CREATE_SUCCESS,
                item: item,
              });
            },
            error: function (err) {
              AppDisp.dispatch({
                type: AppConst.BOAD_CREATE_FAIL,
                error: {message: "Ошибка при создании доски"},
              });
            }
        });
    }

    static deleteBoad(id) {
        $.ajax({
            method: 'DELETE',
            url: '/boads/' + id,
            success: function (item) {
              AppDisp.dispatch({
                type: AppConst.BOAD_DELETE_SUCCESS,
                item: item,
              });
            },
            error: function (err) {
              AppDisp.dispatch({
                type: AppConst.BOAD_DELETE_FAIL,
                error: {message: "Ошибка при удалении"},
              });
            }
        });
    }

    static updateText(id, name) {
        $.ajax({
            method: 'PUT',
            url: '/boads/' + id,
            data: {name},
            dataType: "json",
            success: function (item) {
              AppDisp.dispatch({
                type: AppConst.BOAD_UPDATE_SUCCESS,
                item: item,
              });
            },
            error: function (err) {
              AppDisp.dispatch({
                type: AppConst.BOAD_UPDATE_FAIL,
                error: {message: "Ошибка при обновлении"},
              });
            }
        });
    }
}


export default BoadAction;