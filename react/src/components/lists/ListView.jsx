import React from 'react';
import CardStore from '../../stores/CardStore';


import CardList from '../cards/CardList.jsx';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import "./ListView.less";

class ListView extends React.Component {
    constructor(props) {
        super( props );
        this.state = {
          openModal: false,
          text: "",
          isEdit: false,
          updateTextList: this.props.name,
          cards: [],
        };
        this.oldTextUpdate = "";
        CardStore.addChangeListener(this._change)
    }

    changeText = (e) => {
      this.setState({
        text: e.target.value,
      });
    }

    _change = () => {
        this.setState( { cards: CardStore.getCards( this.props.id )});     
    }

    componentWillUnmount() {
      CardStore.removeChangeListener( this._change );
    }

    openModal = (e) => {
      this.setState({
        openModal: true,
      });
    }

    handleClose = (e) => {
      this.setState({
        openModal: false,
      });
    }

    addCard = () => {
      this.props.addCard( this.state.text );
      this.handleClose();
    }

    editStart = () => {
      this.setState({
        isEdit: true,
      });
      this.oldTextUpdate = this.props.name.substring(0);
    }

    editEnd = () => {
      this.setState({
        isEdit: false,
      });
    }

    cancelEditUpdateList = () => {
      this.setState({
        updateTextList: this.props.name,
      });
      this.editEnd();
      this.handleClose();
    }

    changeUpdateList = (e) => {
      this.setState({
        updateTextList: e.target.value
      });
    }

    saveUpdateList = () => {
      this.editEnd();
      this.props.updateList( this.props.id, this.state.updateTextList );
    }

    render() {
      const {name} = this.props;
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
          onTouchTap={this.addCard}
      />,
      ];
      return (
        <div className="list">
            {this.state.isEdit? 
              <div>
                <input
                  value={this.state.updateTextList}
                  onChange={this.changeUpdateList}
                />
                <FlatButton onClick={this.cancelEditUpdateList} label="Отмена" />
                <FlatButton disabled={!this.state.updateTextList} primary={true} onClick={this.saveUpdateList} label="Сохранить" />
              </div>
              
            :
              <h4 onClick={this.editStart}> {name} </h4>   
            }
           
           <CardList
             cards={this.state.cards}
             id_boad={this.props.id_boad}
            />
            <p onClick={this.openModal} className="last_punkt">Добавить карточку</p>
            <Dialog
                mini={true}
                title="Добавление карточки"
                actions={actions}
                modal={true}
                open={this.state.openModal}
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

export default ListView;