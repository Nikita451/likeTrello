import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import "./BoadView.less";

const ENTER_CODE = 13;
const ESCAPE_CODE = 27;

class BoadView extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state = {
	    isEditing: false,
	    name: this.props.name
		};
		
	}
    
  startEdit = () => {
    this.setState({ isEditing: true }, () => this._inputText.focus() );
    this.oldValue = this.state.name;
  }

  cancelEdit = () => {
    this.setState({ isEditing: false, name: this.oldValue });
  }

  changeText = (e) => {
    this.setState({ name: e.target.value });	
  }
  
  onKeyDown=(e) => {
  	if (e.keyCode == ESCAPE_CODE) {
    	this.cancelEdit();
    } else if (e.keyCode == ENTER_CODE ) {
      this.saveEdit();
    }
  }
  
  saveEdit =() => {
  	const { changeText } = this.props;
  	this.setState({
  		isEditing: false,
  	});
    
    changeText( {name: this.state.name} );
  }
  
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  
  gotoLists = () => {
    this.context.router.push( `/boad/${this.props.id}` );
  }

	render() {
		const {id, name} = this.props;
		const styleCard = {
			background: "#fefefe",
			width: "265px",
			float: "left",
			margin: "10px",
		};
		const styleCardHeader = {
			background: "#736467",
			color: "rgba(255,255,255)"
		}
		const styleCardText = {
			paddingTop: "0px",
			paddingBottom: "0px",
			overflow: "auto"
		};
		const styleAction={
      marginTop: "0px",
      paddingTop: "0px"
		};
		return (
      <Card className="boad" style={styleCard}>
       {this.state.isEditing
        ?
        <div>
          <input
            className="changeInput"
            value={this.state.name}
            onKeyDown={this.onKeyDown}
            ref={(c) => this._inputText=c }
            onChange={this.changeText}
           />
          <FlatButton onClick={this.cancelEdit} label="Отмена" />
          <FlatButton disabled={!this.state.name} primary={true} onClick={this.saveEdit} label="Сохранить" />
        </div>
        :
        <CardHeader
         style={styleCardHeader}
         title={this.state.name}
         subtitle="доска/группа"
         avatar="/images/jsa-128.jpg"
         className="cardHeader"
         onClick={this.startEdit}
         />
       }
          
         <CardText className="cardText" style={styleCardText}>
           <div className="left">
             <p> Списков <span>999</span> </p>
             <p> Карточек <span>999</span> </p>
           </div>
           <div className="right">
             <p> Файлов <span>999</span> </p>
             <p> Комментариев <span>999</span> </p>
           </div>
         </CardText>
         <CardActions style={styleAction}>
           <IconMenu className="iconMenu" iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
              <MenuItem onClick={this.startEdit}>Изменить</MenuItem>
              <MenuItem onClick={this.props.deleteBoad}>Удалить</MenuItem>
           </IconMenu>
           <FlatButton label="Войти" onClick={this.gotoLists} />
         </CardActions>
      </Card>
		);
	}
}


export default BoadView;