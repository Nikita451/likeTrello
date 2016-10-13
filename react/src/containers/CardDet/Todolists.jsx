import React from 'react';
import TodolistStore from '../../stores/TodolistStore.js';
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

    render() {
        return (
            <TodolistInCardDet 
                todolists={this.state.todolists}
             />
        );
    }

}

export default Todolists;