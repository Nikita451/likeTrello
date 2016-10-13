import React from 'react';
import CardStore from '../stores/CardStore.js';
import CardAction from "../actions/CardAction.js";
import LabelAction from "../actions/LabelAction.js";

import CardDetailView from '../components/cards/CardViewDet.jsx';

function getState(id_card) {
    return {
        card: CardStore.getCard( id_card ),
    };
}

class CardViewDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        let id_card = this.props.params.id_card;
        this.state = getState( id_card );
        CardStore.addChangeListener( this._change );
        
    }

    _change = () => {
        const id_card = this.props.params.id_card;
        this.setState( getState( id_card ) );
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    handleClose = () => {
        const {id} = this.props.params;
        this.context.router.push(`/boad/${id}`);
    }

    saveUpdateCard = (nameCard) => {
        let id_card = this.props.params.id_card;
        let updateText = nameCard;
        CardAction.updateCard( id_card, updateText );
    }

    addLabel(id, name, color) {
        LabelAction.createLabel(id, name, color);
    }

    componentWillUnmount() {
        CardStore.removeChangeListener( this._change );
    }

    render() {
        return (
           <CardDetailView 
            card={this.state.card}
            handleClose={this.handleClose}
            saveUpdateCard={this.saveUpdateCard}
            addLabel={this.addLabel}
            />
        );
    }
}

export default CardViewDetail;