import React from 'react';
import TaskStore from '../../stores/TaskStore.js';
import TaskAction from '../../actions/TaskAction.js';
import TaskInCardDet from '../../components/tasks/TasksInCardDet.jsx';
import Slider from 'material-ui/Slider';
import IconButton from 'material-ui/IconButton';
import ActionAdd from 'material-ui/svg-icons/image/exposure-plus-1';
import FlatButton from 'material-ui/FlatButton';

function setDefaultValueForTodolist( tasks ) {
    let completeTasks = tasks.reduce( (sum, task) => {
        if (task.complete) {
            return sum + 1
        } else {
            return sum;
        }
    },0);
    return completeTasks / tasks.length;
}

function getState( id_todolist ) {
    let tasks = TaskStore.getTasks( id_todolist );
    return {
        tasks: tasks,
        isEdit: false,
        newTaskText: "",
        valueSlider: setDefaultValueForTodolist(tasks),
    };
}

class Task extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = getState( this.props.id_todolist );
        TaskStore.addChangeListener( this._change );
    }

    _change = () => {
        this.setState( getState( this.props.id_todolist ) );
    }

    startAddTask = () => {
        this.setState( {
            isEdit: true,
        });
    }

    endAddTask = () => {
        this.setState({
            isEdit: false,
        });
    }

    changeTextNewTask = (e) => {
        this.setState({
            newTaskText: e.target.value,
        });
    }

    addTask = () => {
        var text = this.state.newTaskText;
        TaskAction.createTask( this.props.id_todolist, text );
    }

    saveUpdateTask(id, text, currentCheck) {
        TaskAction.update(id, text, currentCheck );
    }

    render() {
        return (
            <div>
            <Slider 
                value={this.state.valueSlider} 
                />
                {
                    this.state.tasks.map( (task) => 
                        <TaskInCardDet 
                            key={task._id}
                            task={task}
                            saveUpdateTask={this.saveUpdateTask}
                        />        
                    )
                }
                <IconButton onClick={this.startAddTask}>
                    <ActionAdd />
                </IconButton>
                {this.state.isEdit?
                    <div>
                        <input 
                        onChange={this.changeText} 
                        value={this.state.updateText} 
                        onChange={this.changeTextNewTask} />
                        <FlatButton onClick={this.endAddTask} 
                                    label="Отмена" />
                        <FlatButton disabled={!this.state.newTaskText} 
                                primary={true} 
                                onClick={this.addTask} 
                                label="Сохранить" />
                    </div>
                    :
                    <div></div>
                }
             </div>
        );
    }

}

export default Task;