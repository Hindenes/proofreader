import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip/tooltip';
import { diffRange as replaceRange, wrapRange } from './replace-highlighted-text';

class ProofreadMode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { range: null, unwrappedRange: null };

    this._onNewText = this._onNewText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  clearHighlightedText() {
    const highlightedText = document.getElementsByClassName('text-highlighted');
    Array.prototype.forEach.call(highlightedText, elem => elem.outerHTML = elem.innerHTML);
  }

  _onTextSelected(e) {
    this.clearHighlightedText();
    setTimeout(() => {
      const selection = window.getSelection();
      if(!selection || selection.rangeCount === 0) {
        this.setState({ range: null });
        return;
      }

      const range = selection.getRangeAt(0);
      const text = range.toString();
      if (!text || text.trim() === '') {
        this.setState({ range: null });
      } else {
        const unwrappedRange = wrapRange(range, 'span');
        this.setState({ range, unwrappedRange });
      }
    }, 0);
  }

  handleClick(e){
    const domNode = ReactDOM.findDOMNode(this.refs.tooltip);
    if (!domNode || !domNode.contains(e.target)) {
        this.setState({ range: null });
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick, true);
  }

  _onNewText(newText) {
    replaceRange(this.state.range, newText);
    this.clearHighlightedText();
    this.setState({ range: null });
  }

  render() {
    const { range } = this.state;
    const maybeTooltip = range ? <Tooltip ref="tooltip" range={range} offsetTop={-20} onNewText={this._onNewText} highlightedText={range.toString()}/> : null;

    const html = this.props.textToBeEdited.split('\n').map((text, i) => `${text}<br/>`).join('');

    return (
      <div className="main-content">
        <h1 className="header-main">Highlight some text to start editing</h1>
        <p id="content" className="edit-text" onMouseUp={this._onTextSelected.bind(this)} dangerouslySetInnerHTML={{__html: html}}></p>
        { maybeTooltip }
      </div>
    );
  }
}

export default ProofreadMode;
