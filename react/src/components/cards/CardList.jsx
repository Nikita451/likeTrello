import React from 'react';
//import CardView from './CardView.jsx';
import CardViewContainer from '../../containers/CardInList.jsx';

class CardList extends React.Component {
    render() {
        return (
        <div>
          {
              this.props.cards.map( (card) => 
                <CardViewContainer
                  id={card._id}
                  key={card._id}
                  name={card.name}
                  id_boad={this.props.id_boad}
                 />
              )
          }
        </div>
        );
    }
}

export default CardList;