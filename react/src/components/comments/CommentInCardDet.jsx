import React from 'react';
import dateformat from 'dateformat';

import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';

class CommentComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
    }

    render() {
        return (
            <List className="comments">
                <Subheader>Комментарии</Subheader>    
                {
                    this.props.comments.map( (comment) =>
                            <ListItem
                            leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                            secondaryText={ dateformat(comment.date_create, "hh:MM dd.mm.yyyy") }
                            primaryText={comment.text} 
                            secondaryTextLines={2}
                            />
                    )
                }
            </List>
        );
    }
}

export default CommentComponent;