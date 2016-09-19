import React from 'react';
import Labels from '../labels/LabelInCardList.jsx';

class CardView extends React.Component {
    render() {
        const {name, labels, comments} = this.props;
        return (
            <div>
               <p> List:  {name} </p>
               <Labels 
                 labels={labels}
                />
                <p>
                 Comments: { comments.length }
                </p>
            </div>
        );
    }
}

export default CardView;