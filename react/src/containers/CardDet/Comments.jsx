import React from 'react';
import CommentStore from '../../stores/CommentStore.js';
import CommentAction from '../../actions/CommentAction.js';
import CommentComponent from '../../components/comments/CommentInCardDet.jsx';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
import NewComment from '../../components/comments/NewComment.jsx';

function getState(id_card) {
    return {
        comments: CommentStore.getComments( id_card )
    };
}

class CommentContainer extends React.Component {
    constructor( props, context ) {
        super(props, context);
        CommentStore.addChangeListener( this._change );
        this.state = getState( this.props.id_card );
    }

    _change = () => {
        this.setState( getState( this.props.id_card ) );
    }

    addComment = (text) => {
        CommentAction.create( this.props.id_card, text );
    }

    componentWillUnmount() {
        CommentStore.removeChangeListener( this._change );
    }

    render() {
        return (
            <div>
            <List className="comments">
                <Subheader>Комментарии</Subheader>   
                {this.state.comments.map( (comment) =>
                    <CommentComponent 
                        key={comment._id}
                        comment={comment}
                    />
                )}
            </List>
            <NewComment 
                addComment={this.addComment}
            />
            </div>
        );
    }

}


export default CommentContainer;