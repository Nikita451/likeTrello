import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class CardAction {
    static createCard(id_list, name ) {
        $.ajax({
            url: '/cards',
            type: 'POST',
            data: { name: name, list: id_list, description: 'Описание ...' },
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.CARD_CREATE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.CARD_CREATE_FAIL,
                    error: err,
                });
            }
        });
    }

    static updateCard(id_list, name) {
        $.ajax({
            url: `/cards/${id_list}`,
            type: 'PUT',
            data: { name: name },
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.CARD_UPDATE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.CARD_UPDATE_FAIL,
                    error: err,
                });
            }
        });
    }

    static delete(id_card) {
        $.ajax({
            url: `/cards/${id_card}`,
            type: 'DELETE',
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.CARD_DELETE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.CARD_DELETE_FAIL,
                    error: err,
                });
            }
        });
    }
}


export default CardAction;