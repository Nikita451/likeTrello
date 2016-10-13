import React from 'react';
import CommentStore from '../../stores/CommentStore.js';
import CommentComponent from '../../components/comments/CommentInCardDet.jsx';

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

    
    render() {
        return (
            <CommentComponent 
                comments={this.state.comments}
             />
        );
    }

}


export default CommentContainer;