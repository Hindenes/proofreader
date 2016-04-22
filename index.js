import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip/tooltip';
import { diffRange as replaceRange } from './replace-highlighted-text';

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
    } else {
      this.setState({ range });
    }
  }

  _onNewText(newText) {
    replaceRange(this.state.range, newText);
    this.setState({ range: null });
  }

  render() {
    const { range } = this.state;
    const maybeTooltip = range ? <Tooltip range={range} offsetTop={-20} onNewText={this._onNewText} highlightedText={range.toString()}/> : null;

    return (
      <div>
        <h1 style={{marginTop: '300px'}}>Proofread this</h1>
        <p id="content" className="edit-text" onMouseUp={this._onTextSelected.bind(this)}>
          Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning. Her kommer teksten. Dette er en setning.
        </p>
        { maybeTooltip }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
