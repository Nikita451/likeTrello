import React from 'react';
import FlatButton from 'material-ui/FlatButton';

class NewTask extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            newText: "",
        }
    }

    changeText = (e) => {
        this.setState({
            newText: e.target.value,
        });
    }

    addComment = () => {
        this.props.addComment( this.state.newText );
        this.setState({
            newText: "",
        });
        this.refs._input.value = "";
    }
    
    render() {
        return (
            <div>
                <div>
                    <textarea 
                    onChange={this.changeText} 
                    cols="40"
                    ref="_input"
                    value={this.state.newText}
                    rows="4"></textarea>
                </div>
                <FlatButton disabled={!this.state.newText} 
                            primary={true} 
                            onClick={this.addComment} 
                            label="Добавить" />
            </div>
        );
    }
}

export default NewTask;