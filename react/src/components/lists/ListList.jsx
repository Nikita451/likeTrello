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
                <ListSearch
                    onAddList={this.props.onAddList}
                    _onSearch={this.props._onSearch}
                 />
                <div className="lists" >
                {
                    this.props.lists.map( (list) => 
                        <ListView
                        key={list._id}
                        id={list._id}
                        name={list.name}
                        id_boad={this.props.id_boad}
                        addCard={this.props.addCard.bind(null, list._id)}
                        updateList={this.props.updateList}
                        deleteList={this.props.deleteList}
                        />
                    )
                }
                </div>
            </div>

        );
    }
}

export default ListList;
