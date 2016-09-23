import React from 'react';
import "./LabelInCardList.less";

class LabelList extends React.Component {
    render() {
        return (
            <div className="labelsInCard">
            {
                
                this.props.labels.map( (label) => 
                    <span style={{background: label.color}} key={label._id}></span>
                )
            }
            </div>
        );
    }
}

export default LabelList;