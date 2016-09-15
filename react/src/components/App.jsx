import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends React.Component {
	render() {
		return (
      <div className="app">
        <MuiThemeProvider>
          {this.props.children}
        </MuiThemeProvider>
      </div>
		);
	}
}

export default App;
