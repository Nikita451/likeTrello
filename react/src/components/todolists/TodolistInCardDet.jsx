import React from 'react';
import TaskContainer from '../../containers/CardDet/Task.jsx';

import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

import ActionDelete from 'material-ui/svg-icons/action/delete';
import IconButton from 'material-ui/IconButton';
import ActionEdit from 'material-ui/svg-icons/editor/mode-edit';

import "./TodolistInCardDet.less";

class TodolistsInCard extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditing: false,
            updateText: "",
        }
    }

    updateTodolist = () => {
        let id = this.props.todolist._id;
        let name = this.state.updateText;
        this.props.updateTodolist(id, name);
    }

    startEdit = () => {
        this.setState({
            isEditing: true,
             updateText: this.props.todolist.name,
        });
    }

    endStart = () => {
        this.setState({
            isEditing: false,
        });
    }

    changeTodolist = (e) => {
        this.setState({
            updateText: e.target.value,
        });
    }

    saveUpdateTodolist = () => {
        this.updateTodolist( this.props.todolist._id, this.state.updateText  );
        this.endStart();
    }

    render() {
        const {deleteTodolist, todolist} = this.props;
        return (
            <div className="todolists">
                {this.state.isEditing ?
                <div>
                    <input value={this.state.updateText} onChange={this.changeTodolist} />
                    <FlatButton onClick={this.endStart} 
                                label="Отмена" />
                    <FlatButton disabled={!this.state.updateText} 
                            primary={true} 
                            onClick={this.saveUpdateTodolist} 
                            label="Сохранить" />
                </div>
                :
                <div className="todolist_name">
                    <IconButton className="delIcon" onClick={deleteTodolist.bind(null, todolist._id)}>
                        <ActionDelete />
                    </IconButton>
                    <IconButton className="delIcon" onClick={this.startEdit}>
                        <ActionEdit />
                    </IconButton>
                    <h3 onClick={this.startEdit}> {todolist.name} </h3>
                </div>
                }
                <TaskContainer 
                    id_todolist={todolist._id}
                    />
            </div>  
        );
    }

}

export default TodolistsInCard;