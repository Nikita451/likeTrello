import React from 'react';
import dateformat from 'dateformat';
import ListStore from '../../stores/ListStore.js';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List, ListItem} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRedo from 'material-ui/svg-icons/content/redo';
import ContentCopy from 'material-ui/svg-icons/content/content-copy';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';

import "./CardViewDet.less";

import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {blue500, yellow600} from 'material-ui/styles/colors';

class CardViewDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    handleClose = () => {
        const {id} = this.props.params;
        this.context.router.push(`/boad/${id}`);
    }

    handleRequestDelete() {

    }

    handleTouchTap() {

    }

    setDefaultValueForTodolist(tasks) {
        let completeTasks = tasks.reduce( (sum, task) => {
            if (task.complete) {
                return sum + 1
            } else {
                return sum;
            }
        },0);
        return completeTasks / tasks.length;
    }


    render() {
        let card = ListStore.getCard( this.props.params.id_card );
        const actions = [
      <FlatButton
            label="Закрыть"
            primary={true}
            onTouchTap={this.handleClose}
        />,
        ];
        const styles = {
            chip: {
                margin: 4,
                float: "left"
            }};
        
        return (
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
                        <ListItem primaryText="Метка" leftIcon={<ContentAdd />} />
                        <ListItem primaryText="Чек-лист" leftIcon={<ContentAdd />} />
                    </List>
                </div>
                <div className="rightSide">
                <Tabs>
                    <Tab
                      label="Карточка"
                      className="tab"
                      >
                        <div className="labels">
                        {
                            card.labels.map( (label) =>  
                                <Chip
                                    backgroundColor={label.color}
                                    labelColor="#fff"
                                    onRequestDelete={this.handleRequestDelete}
                                    onTouchTap={this.handleTouchTap}
                                    style={styles.chip}
                                    >
                                    { label.name }
                                </Chip>
                            )
                        }
                        </div>
                    </Tab>
                    <Tab
                      label="Чек-листы">
                        <div className="todolists">
                        {
                            card.todolists.map( (todolist) =>
                                <div>
                                    <h5> {todolist.name} </h5>
                                    <Slider 
                                        defaultValue={this.setDefaultValueForTodolist(todolist.tasks)} 
                                     />
                                    <div>
                                        {
                                            todolist.tasks.map( (task) =>
                                                <div>
                                                  <Checkbox
                                                        label={task.name}
                                                        defaultChecked={task.complete}
                                                        />  
                                                 </div>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                        </div>
                    </Tab>
                    <Tab
                      label="Комментарии"
                     >
                        <List className="comments">
                            <Subheader>Комментарии</Subheader>    
                            {
                                card.comments.map( (comment) =>
                                     <ListItem
                                        //leftAvatar={<Avatar src="images/ok-128.jpg" />}
                                        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
                                        secondaryText={ dateformat(comment.date_create, "hh:MM dd.mm.yyyy") }
                                        primaryText={comment.text} 
                                        secondaryTextLines={2}
                                        />
                                )
                            }
                        </List>
                    </Tab>
                </Tabs>
                </div>
            </Dialog>
        );
    }
}

export default CardViewDetail;