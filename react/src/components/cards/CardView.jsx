import React from 'react';
import Labels from '../labels/LabelInCardList.jsx';
import './CardView.less';

class CardView extends React.Component {
    
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props, context) {
        super(props, context);
    }

    goToCard = (id_boad, id_card) => {
        //const {id} = this.props.params;
        //alert( id_boad + "  " + id_card );
        this.context.router.push(`/boad/${id_boad}/card/${id_card}`);
        
    }
    
    render() {
        const {id, name, labels, comments, id_boad} = this.props;
        return (
            <div className="card" onClick={this.goToCard.bind(null, id_boad ,id) } >
               <Labels 
                 labels={labels}
                />
               <p className="nameLiSpan"> {name} </p>
               <p>
                  <span className="beauty_elem"> 
                    Комментариев 
                    <span> { comments.length } </span> 
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