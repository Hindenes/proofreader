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
      <div className="main-content">
        <h1 style={{marginTop: '300px'}}>Proofread this</h1>
        <p id="content" className="edit-text" onMouseUp={this._onTextSelected.bind(this)}>
          Determining an ideal number of characters per line and accompanying line space is a subject of much debate. While some suggest that 45-75 characters per line is the ideal length, other studies show that longer line lengths can result in faster reading speeds. Even though people may read longer lines more quickly, readers report that they actually prefer shorter line lengths.
          <br /><br />
          Perhaps there really is an ideal number of characters per line and we simply haven’t found it yet (or at least agreed on it), but it’s almost assuredly related to other properties such as line spacing. Line spacing (leading), or line height, determines the height of a line of text. A taller line height means more space between lines.
        </p>
        { maybeTooltip }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
