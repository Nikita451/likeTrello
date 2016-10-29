import React from 'react';

import Chip from 'material-ui/Chip';

class Labels extends React.Component {
    
    handleRequestDelete() {

    }
    
    handleTouchTap() {

    }

    render() {
        const styles = {
            chip: {
                margin: 4,
                float: "left"
            }};
        const {_id, name, color} = this.props;
        return (  
            
            <Chip
                backgroundColor={color}
                labelColor="#fff"
                key={_id}
                onRequestDelete={this.props.handleRequestDelete.bind(null, _id) }
                onTouchTap={this.handleTouchTap}
                style={styles.chip}
                >
                { name }
            </Chip>
        );
    }
}


export default Labels;