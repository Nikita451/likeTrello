import React from 'react';
import TaskContainer from '../../containers/CardDet/Task.jsx';

import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';

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
        return (
            
            <div>
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
                <h5 onClick={this.startEdit}> {this.props.todolist.name} </h5>
                }
                <TaskContainer 
                    id_todolist={this.props.todolist._id}
                    />
            </div>
                    
        );
    }

}

export default TodolistsInCard;