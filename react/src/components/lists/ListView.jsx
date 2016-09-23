import React from 'react';
import CardList from '../cards/CardList.jsx';
import "./ListView.less";

class ListView extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
      const {name, cards} = this.props;
      
      return (
        <div className="list">
           <h4> {name} </h4>
           <CardList
             cards={this.props.cards}
             id_boad={this.props.id_boad}
            />
            <p className="last_punkt">Добавить карточку</p>
        </div>
      );

    }
}

export default ListView;