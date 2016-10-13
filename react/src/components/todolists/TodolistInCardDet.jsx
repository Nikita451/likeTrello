import React from 'react';
import TaskContainer from '../../containers/CardDet/Task.jsx';

import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';

class TodolistsInCard extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div className="todolists">
                {
                    this.props.todolists.map( (todolist) =>
                        <div>
                            <h5> {todolist.name} </h5>
                            <TaskContainer 
                                id_todolist={todolist._id}
                             />
                        </div>
                    )
                }
            </div>
        );
    }

}

export default TodolistsInCard;