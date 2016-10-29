import React from 'react';
import LabelStore from '../../stores/LabelStore.js';
import LabelInCardDet from '../../components/labels/LabelInCardDet.jsx';
import LabelAction from '../../actions/LabelAction.js';

function getState( id_card ) {
    return {
        labels: LabelStore.getLabels(id_card),
    };
}

class Labels extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = getState( this.props.id_card );
        LabelStore.addChangeListener( this._change );
    }

    _change = () => {
        this.setState( getState( this.props.id_card ) );
    }

    componentWillUnmount() {
        LabelStore.removeChangeListener( this._change );
    }

    handleRequestDelete(id_label) {
        if (confirm("Удалить метку?") ) {
            LabelAction.deleteLabel(id_label);
        }
    }

    render() {
        return (
            <div className="labels">
                {this.state.labels.map( (label) =>
                    <LabelInCardDet
                        key={label._id}
                        {...label}
                        handleRequestDelete={this.handleRequestDelete}
                    />        
                )}
            </div>
        );
    }

}

export default Labels;
