import React from 'react';
import TodolistStore from '../../stores/TodolistStore.js';
import TodolistAction from '../../actions/TodolistAction.js';
import TodolistInCardDet from '../../components/todolists/TodolistInCardDet.jsx';

function getState( id_card ) {
    return {
        todolists: TodolistStore.getTodolists( id_card ), 
    };
}

class Todolists extends React.Component
{
    constructor(props, context) {
        super(props, context);
        TodolistStore.addChangeListener( this._change );
        this.state = getState( this.props.id_card );
    }

    _change = () => {
        this.setState( getState( this.props.id_card ) );
    }
    
    componentWillUnmount() {
        TodolistStore.removeChangeListener( this._change );
    }

    updateTodolist = (id, name) => {
        TodolistAction.updateTodolist(id, name);
    }

    render() {
        return (
            <div className="todolists">
                {
                    this.state.todolists.map(  (todolist ) =>
                        <TodolistInCardDet 
                            key={todolist._id}
                            todolist={todolist}
                            updateTodolist={this.updateTodolist}
                        />
                    )
                }
            </div>
        );
    }

}

export default Todolists;