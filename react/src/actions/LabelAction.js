import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';

class LabelAction {
    static createLabel(id_card, name, color ) {
        $.ajax({
            url: '/labels',
            type: 'POST',
            data: { name: name, color: color, card: id_card },
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.LABEL_CREATE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.LABEL_CREATE_FAIL,
                    error: err,
                });
            }
        });
    }

    static deleteLabel(id_label) {
        $.ajax({
            url: `/labels/${id_label}`,
            type: 'DELETE',
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.LABEL_DELETE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.LABEL_DELETE_FAIL,
                    error: err,
                });
            }
        });
    }

}


export default LabelAction;