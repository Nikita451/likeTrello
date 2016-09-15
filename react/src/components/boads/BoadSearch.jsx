import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import './BoadSearch.less';

class BoadSearch extends React.Component {
	
	state= {
    isOpen: false,
    text: '',
	}
  
	inputChange = (e) => {
		const { onSearch } = this.props;
    let name = e.target.value;
    onSearch( name );
	}

	openDialog =() => {
		this.setState({
			isOpen: true
		});
	}

	handleClose = () => {
    this.setState({
			isOpen: false
		});  
	}

	handleTextChange=(e) => {
     this.setState({
     	 text: e.target.value
     });
	}

	handleSubmit=(e) => {
		let name = this.state.text;
		const {addBoad} = this.props;
		addBoad( name );
		this.handleClose();
	}

	render() {
		return (
      <div className="boad-search">
        <TextField 
          className="input"
          hintText="Назвние доски..."
          floatingLabelText="Поиск..."
          onChange={this.inputChange}
        />
        <FloatingActionButton onClick={this.openDialog}>
		      <ContentAdd />
		    </FloatingActionButton>
        
         <Dialog
	          className='BoadCreateModal'
	          contentStyle={{ maxWidth: 400 }}
	          actions={[
	              <FlatButton
	                  label='Отмена'
	                  onTouchTap={this.handleClose}
	              />,
	              <FlatButton
	                  primary
	                  label='Добавить'
	                  disabled={!this.state.text}
	                  onTouchTap={this.handleSubmit}
	              />
	          ]}
	          open={this.state.isOpen}
	          onRequestClose={this.handleClose}
	      >
	          <h3 className='TaskCreateModal__modal-title'>Добавить доску</h3>
	          <TextField
	              fullWidth
	              ref={c => this.taskInput = c}
	              value={this.state.text}
	              onChange={this.handleTextChange}
	              hintText='Расписание..'
	              floatingLabelText='Название доски'
	          />
	      </Dialog>

      </div>
		);
	}
}

export default BoadSearch;