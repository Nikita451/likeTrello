import React from 'react';

class LabelList extends React.Component {
    render() {
        return (
            <div>
            {
                this.props.labels.map( (label) => 
                    <p key={label._id}> label:  {label.name} </p>
                )
            }
            </div>
        );
    }
}

export default LabelList;