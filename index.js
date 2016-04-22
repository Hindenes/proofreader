import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip/tooltip';
import replaceRange from './replace-highlighted-text';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { range: null};

    this._onNewText = this._onNewText.bind(this);
  }

  _onTextSelected() {
    const range = window.getSelection().getRangeAt(0);
    const text = range.toString();
    if (!text || text.trim() === '') {
      this.setState({ range: null });
    }

    this.setState({ range });
  }

  _onNewText(newText) {
    replaceRange(this.state.range, newText);
    this.setState({ range: null });
  }

  render() {
    const { range } = this.state;
    const maybeTooltip = range ? <Tooltip range={range} offsetTop={-20} onNewText={this._onNewText}/> : null;

    return (
      <div>
        <h1 style={{marginTop: '300px'}}>Proofread this</h1>
        <p id="content" onMouseUp={this._onTextSelected.bind(this)}>
          Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning.
        </p>
        { maybeTooltip }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
