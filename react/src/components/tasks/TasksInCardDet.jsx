import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';

class TasksInCard extends React.Component {
    constructor( props, context ) {
        super( props, context );
        this.state = {
            isEdit: false,
            updateText: ""
        }
    }

    startEdit = () => {
        this.setState({
            isEdit: true,
            updateText: this.props.task.name,
        });
    }

    endEdit = () => {
        this.setState({
            isEdit: false,
        });
    }

    changeTask = (e, isInputChecked) => {
        this.props.saveUpdateTask( this.props.task._id, this.props.task.name, isInputChecked );
    }

    changeText = (e) => {
        this.setState({
            updateText: e.target.value
        });
    }

    saveUpdateTask =() => {
        var text = this.state.updateText;
        var id = this.props.task._id;
        this.props.saveUpdateTask( id, text, this.props.task.complete );
        this.endEdit();
    }

    render() {
        const { _id, name, complete} = this.props.task;
        return (
            <div className="task">
                {this.state.isEdit?
                <div>
                    <input onChange={this.changeText} value={this.state.updateText}  />
                    <FlatButton onClick={this.endEdit} 
                                label="Отмена" />
                    <FlatButton disabled={!this.state.updateText} 
                            primary={true} 
                            onClick={this.saveUpdateTask} 
                            label="Сохранить" />
                </div>
                :
                <div className="viewTask">
                    <Checkbox
                        label={name}
                        className="checkbox"
                        ref="_task"
                        defaultChecked={complete}
                        onCheck={this.changeTask}
                        style={ {width: "60%", float: "left", height: "10px"} }
                    />
                    <IconButton className="taskAction" onClick={this.startEdit}>
                        <ActionEdit />
                    </IconButton>
                    <IconButton className="taskAction" onClick={this.props.removeTask.bind(null, _id)}>
                        <ActionDelete />
                    </IconButton>
                </div>
                }
            </div>
        );
    }

}

export default TasksInCard;