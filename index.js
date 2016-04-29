import React from 'react';
import ReactDOM from 'react-dom';
import Tooltip from './tooltip/tooltip';
import { diffRange as replaceRange } from './replace-highlighted-text';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { range: null };

    this._onNewText = this._onNewText.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  _onTextSelected(e) {
    setTimeout(()=> {
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
        this.setState({ range });
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
    this.setState({ range: null });
  }

  render() {
    const { range } = this.state;
    const maybeTooltip = range ? <Tooltip ref="tooltip" range={range} offsetTop={-20} onNewText={this._onNewText} highlightedText={range.toString()}/> : null;

    return (
      <div className="main-content">
        <h1 className="header-main">Proofread this</h1>
        <p id="content" className="edit-text" onMouseUp={this._onTextSelected.bind(this)}>
          Your goal as a startup is to make something users love. If you do that, then you have to figure out how to get a lot more users. But this first part is critical—think about the really successful companies of today. They all started with a product that their early users loved so much they told other people about it. If you fail to do this, you will fail. If you deceive yourself and think your users love your product when they don’t, you will still fail.
          <br/><br/>
          The startup graveyard is littered with people who thought they could skip this step.
          <br/><br/>
          It’s much better to first make a product a small number of users love than a product that a large number of users like. Even though the total amount of positive feeling is the same, it’s much easier to get more users than to go from like to love.
          <br/><br/>
          A word of warning about choosing to start a startup: It sucks! One of the most consistent pieces of feedback we get from YC founders is it’s harder than they could have ever imagined, because they didn’t have a framework for the sort of work and intensity a startup entails. Joining an early-stage startup that’s on a rocketship trajectory is usually a much better financial deal.
          <br/><br/>
          On the other hand, starting a startup is not in fact very risky to your career—if you’re really good at technology, there will be job opportunities if you fail. Most people are very bad at evaluating risk. I personally think the riskier option is having an idea or project you’re really passionate about and working at a safe, easy, unfulfilling job instead.
          <br/><br/>
          To have a successful startup, you need: a great idea (including a great market), a great team, a great product, and great execution.
        </p>
        { maybeTooltip }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
