import React from 'react';
import TaskStore from '../../stores/TaskStore.js';
import TaskInCardDet from '../../components/tasks/TasksInCardDet.jsx';

function getState( id_todolist ) {
    return {
        tasks: TaskStore.getTasks( id_todolist )
    };
}

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);
        TaskStore.addChangeListener( this._change );
        this.state = getState( this.props.id_todolist );
    }

    _change = () => {
        this.setState( getState( this.props.id_todolist ) );
    }


    render() {
        return (
            <TaskInCardDet 
                tasks={this.state.tasks}
             />
        );
    }

}

export default Task;