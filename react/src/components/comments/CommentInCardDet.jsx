import React from 'react';
import dateformat from 'dateformat';

import { ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';

class CommentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        let {comment} = this.props;
        return (
            <ListItem
                leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                secondaryText={ dateformat(comment.date_create, "hh:MM dd.mm.yyyy") }
                primaryText={comment.text} 
                secondaryTextLines={2}
            />
        );
    }
}

export default CommentComponent;