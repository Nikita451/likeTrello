import React from 'react';
import ListView from './ListView.jsx';
import ListSearch from './ListSearch.jsx';

import "./ListList.less";

class ListList extends React.Component {
    
    constructor(props) {
       super(props);
    }
    
    render() {
        return (
            <div className="listPage">
                <ListSearch />
                <div className="lists" >
                {
                    this.props.lists.map( (list) => 
                        <ListView
                        key={list._id}
                        name={list.name}
                        cards={list.cards}
                        id_boad={this.props.id_boad}
                        />
                    )
                }
                </div>
            </div>

        );
    }
}

export default ListList;
