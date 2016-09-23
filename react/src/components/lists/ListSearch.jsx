import React from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import './ListSearch.less';

class ListSearch extends React.Component {
    render() {
        return (
            <div className="searchPanel">
                <TextField
                    hintText="Поиск списков"
                />
                <FloatingActionButton mini={true}>
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }
}

export default ListSearch;