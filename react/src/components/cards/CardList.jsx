import React from 'react';
import CardView from './CardView.jsx';

class CardList extends React.Component {
    render() {
        return (
        <div>
          {
              this.props.cards.map( (card) => 
                <CardView
                  id={card._id}
                  key={card._id}
                  name={card.name}
                  labels={card.labels}
                  comments={card.comments}
                  id_boad={this.props.id_boad}
                 />
              )
          }
        </div>
        );
    }
}

export default CardList;