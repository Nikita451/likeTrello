import React from 'react';
import CommentStore from '../stores/CommentStore';
import LabelStore from '../stores/LabelStore';

import Labels from '../components/labels/LabelInCardList.jsx';
import CardInListComponent from '../components/cards/CardView.jsx';

function getState( id_card ) {
    return {
        comments: CommentStore.getComments( id_card ),
        labels: LabelStore.getLabels(id_card)
    };
}

class CardView extends React.Component {
    
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
        this.state = getState( this.props.id );
        CommentStore.addChangeListener( this._change );
        LabelStore.addChangeListener( this._change );
    }

    _change = () => {
        this.setState( getState( this.props.id ) );
    }
    
    goToCard = (id_boad, id_card) => {
        this.context.router.push(`/boad/${id_boad}/card/${id_card}`);
    }

    componentWillUnmount() {
        CommentStore.removeChangeListener(this._change);
        LabelStore.removeChangeListener(this._change);
    }

    render() {
        const {id, name, id_boad} = this.props;
        return (
            <CardInListComponent 
                labels={this.state.labels}
                comments_len={this.state.comments.length}
                name={this.props.name}
                goToCard={this.goToCard.bind(null, id_boad, id) }
             />
        );
    }
}

export default CardView;