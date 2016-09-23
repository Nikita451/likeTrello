import React from 'react';
import ListStore from '../../stores/ListStore.js';

class CardViewDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let card = ListStore.getCard( this.props.params.id_card );
        return (
            <div>
                Детальный просмотр карточки.  <br />
                card: {card.name}
            </div>
        );
    }
}

export default CardViewDetail;