import React from 'react';
import CommentStore from '../../stores/CommentStore';
import LabelStore from '../../stores/LabelStore';

import Labels from '../labels/LabelInCardList.jsx';
import './CardView.less';

class CardView extends React.Component {
    
    constructor(props, context) {
        super(props, context);
    }
    
    render() {
        const { name, labels, comments_len, goToCard } = this.props;
        return (
            <div className="card" onClick={goToCard} >
               <Labels 
                 labels={labels}
                />
               <p className="nameLiSpan"> {name} </p>
               <p>
                  <span className="beauty_elem"> 
                    Комментариев 
                    <span> { comments_len } </span> 
                  </span>
                  <span className="beauty_elem"> 
                    Файлов 
                    <span> 0 </span> 
                  </span>
               </p>
                 
            </div>
        );
    }
}

export default CardView;