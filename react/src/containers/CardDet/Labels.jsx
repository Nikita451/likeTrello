import React from 'react';
import LabelStore from '../../stores/LabelStore.js';
import LabelInCardDet from '../../components/labels/LabelInCardDet.jsx';

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

    handleRequestDelete() {

    }

    render() {
        return (
            <LabelInCardDet 
                labels={this.state.labels}
                handleRequestDelete={this.handleRequestDelete}
             />
        );
    }

}

export default Labels;
