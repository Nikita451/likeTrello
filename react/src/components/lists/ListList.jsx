import React from 'react';
import ListView from './ListView.jsx';

class ListList extends React.Component {
    
    constructor(props) {
       super(props);
    }
    
    render() {
        return (
            <div >
              {
                  this.props.lists.map( (list) => 
                     <ListView
                       key={list._id}
                       name={list.name}
                       cards={list.cards}
                      />
                  )
              }
            </div>
        );
    }
}

export default ListList;
