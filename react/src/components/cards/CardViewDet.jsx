import React from 'react';
import LabelInCardDet from '../../containers/CardDet/Labels.jsx';
import TodolistInCardDet from '../../containers/CardDet/Todolists.jsx';
import CommentsContainer from '../../containers/CardDet/Comments.jsx';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRedo from 'material-ui/svg-icons/content/redo';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Subheader from 'material-ui/Subheader';

import "./CardViewDet.less";

function getState() {
    return {
        updateText: "",
        isEdit: false,
        isNewObject: false,
        newObject: "",
        labelObject: "",
        newObjText: "",
    };
}

class CardViewDetail extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = getState( );
    }

    editStart = () => {
        this.setState({
            isEdit: true,
            updateText: this.props.card.name,
        });
    }

    editEnd = () => {
        this.setState({
            isEdit: false,
        });
    }

    saveUpdateCard = () => {
        let updateText = this.state.updateText;
        this.editEnd();
        this.props.saveUpdateCard( updateText );
    }

    onChangeText = (e) => {
        this.setState({
            updateText: e.target.value,
        });
    }

    cancelUpdateCard = () => {
        this.setState({
            updateText: this.props.card.name,
        });
        this.editEnd();
    }

    handleRequestDelete() {

    }

    handleTouchTap() {

    }

    onAddLabel = () => {
        this.setState({
            isNewObject: true,
            newObject: "label",
            labelObject: "Метка"
        });
    }

    closeAdd = () => {
        this.setState({
            isNewObject: false,
            newObject: "",
            newObjText: "",
        });
    }

    changeNewObj = (e) => {
        this.setState({
            newObjText: e.target.value,
        });
    }

    addLabel = () => {
        this.props.addLabel( this.props.card._id, this.refs._input.value, this.refs._color.value   );
        this.closeAdd();
    }

    render() {
      const actions = [
      <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={this.props.handleClose}
        />,
        ];
        
        return (
            <div>
            {this.props.card? 
            <Dialog
                actions={actions}
                modal={true}
                open={true}
                className="DetailCard"
            >
                <div className="leftSide">
                    <List>
                        <Subheader>Функции</Subheader>
                        <ListItem primaryText="Копировать" leftIcon={<ContentCopy />} />
                        <ListItem primaryText="Переместить" leftIcon={<ContentRedo />} />
                        <ListItem onTouchTap={this.onAddLabel} primaryText="Метка" leftIcon={<ContentAdd />} />
                        <ListItem primaryText="Чек-лист" leftIcon={<ContentAdd />} />
                        {this.state.isNewObject?    
                        <ListItem>
                            <label> {this.state.labelObject} </label> <br />
                            <input onChange={this.changeNewObj} ref="_input" /> <br />
                            <input ref="_color" type="color" /> <br />
                            <FlatButton secondary={true} onTouchTap={this.closeAdd} label="Отмена" />
                            <FlatButton disabled={!this.state.newObjText} 
                            primary={true} onTouchTap={this.addLabel} label="ОК" />
                        </ListItem>
                        :
                        <div></div>
                        }
                    </List>
                </div>
                <div className="rightSide">
                <Tabs>
                    <Tab
                      label="Карточка"
                      className="tab"
                      >
                      <div className="cardName">
                      {this.state.isEdit?
                         <div>
                            <input 
                                value={this.state.updateText}
                                onChange={this.onChangeText}
                            />
                            <FlatButton onClick={this.cancelUpdateCard} label="Отмена" />
                            <FlatButton disabled={!this.state.updateText} primary={true} onClick={this.saveUpdateCard} label="Сохранить" />
                         </div>
                        :
                        <p onClick={this.editStart} className="nameLiSpan"> {this.props.card.name} </p>
                      }
                      </div>
                        <LabelInCardDet 
                            id_card={this.props.card._id}
                         />
                    </Tab>
                    <Tab label="Чек-листы">
                        <TodolistInCardDet 
                            id_card={this.props.card._id}
                         />
                    </Tab>
                    <Tab
                      label="Комментарии"
                     >
                        <CommentsContainer 
                            id_card={this.props.card._id}
                         />
                     </Tab>
                </Tabs>
                </div>
            </Dialog>
            :
            <div></div>
            }
            </div>
        );
    }
}

export default CardViewDetail;