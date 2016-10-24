import AppConst from '../constants';
import AppDisp from '../dispatcher';
import $ from 'jquery';


class CommentAction {
    static create(id_card, text) {
        $.ajax({
            url: '/comments',
            type: 'POST',
            data: { text: text, card: id_card },
            success: function (item) {
                AppDisp.dispatch({
                    type: AppConst.COMMENT_CREATE_SUCCESS,
                    item: item,
                });
            },
            error: function (err) {
                AppDisp.dispatch({
                    type: AppConst.COMMENT_CREATE_FAIL,
                    error: err,
                });
            }
        });
    }
} 

export default CommentAction;