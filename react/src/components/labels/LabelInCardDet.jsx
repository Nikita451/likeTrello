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
        return (
            <div className="labels">
            {
                this.props.labels.map( (label) =>  
                    <Chip
                        backgroundColor={label.color}
                        labelColor="#fff"
                        onRequestDelete={this.props.handleRequestDelete }
                        onTouchTap={this.handleTouchTap}
                        style={styles.chip}
                        >
                        { label.name }
                    </Chip>
                )
            }
            </div>
        );
    }
}


export default Labels;