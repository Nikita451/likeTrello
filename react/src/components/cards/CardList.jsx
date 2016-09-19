import React from 'react';
import CardView from './CardView.jsx';

class CardList extends React.Component {
    render() {
        return (
        <div>
          {
              this.props.cards.map( (card) => 
                <CardView
                  key={card._id}
                  name={card.name}
                  labels={card.labels}
                  comments={card.comments}
                 />
              )
          }
        </div>
        );
    }
}

export default CardList;