import React from 'react';
import CardList from '../cards/CardList.jsx';

class ListView extends React.Component {
    constructor(props) {
        super( props );
    }

    render() {
      const {name, cards} = this.props;
      
      return (
        <div className="listView">
           <h2> {name} </h2>
           <CardList
             cards={this.props.cards}
            />
        </div>
      );

    }
}

export default ListView;