import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Slider from 'material-ui/Slider';

class TasksInCard extends React.Component {
    constructor( props, context ) {
        super( props, context );

    }

    setDefaultValueForTodolist(tasks) {
        let completeTasks = tasks.reduce( (sum, task) => {
            if (task.complete) {
                return sum + 1
            } else {
                return sum;
            }
        },0);
        return completeTasks / tasks.length;
    }

    render() {
        return (
            <div>
                <Slider 
                defaultValue={this.setDefaultValueForTodolist(this.props.tasks)} 
                />
                {
                    this.props.tasks.map( (task) =>
                        <div>
                            <Checkbox
                                label={task.name}
                                defaultChecked={task.complete}
                                />  
                            </div>
                    )
                }
            </div>
        );
    }

}

export default TasksInCard;