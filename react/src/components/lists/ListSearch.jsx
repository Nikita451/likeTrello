import React from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

import './ListSearch.less';

class ListSearch extends React.Component {
    
    constructor(props, state) {
        super(props, state);
        this.state = {
           isOpen: false,
           text: "",
       };
    }

    showDialog = () => {
        this.setState({
            isOpen: true,
        });
    }

    handleClose = () => {
        this.setState({
            isOpen: false
        });
    }

    addList = () => {
        this.props.onAddList( this.state.text );
        this.handleClose();
    }

    changeText = (e) => {
        this.setState({
            text: e.target.value,
        }); 
    }

    render() {
        const actions = [
        <FlatButton
            label="Отмена"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        <FlatButton
            label="Добавить"
            primary={true}
            disabled={!this.state.text}
            onTouchTap={this.addList}
        />,
        ];

        return (
            <div className="searchPanel">
                <TextField
                    hintText="Поиск списков"
                />
                <FloatingActionButton mini={true} onClick={this.showDialog}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog
                    mini={true}
                    title="Добавление списка карточек"
                    actions={actions}
                    modal={true}
                    open={this.state.isOpen}
                    >
                    <TextField
                        hintText="Новый список ..."
                        onChange={this.changeText}
                    />
                    </Dialog>
            </div>
        );
    }
}

export default ListSearch;