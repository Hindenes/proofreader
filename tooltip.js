import React from 'react';

const styles = {
  tooltip: {
    border: '2px solid black',
    position: 'absolute',
    width: '50px',
    height: '50px'
  }
};

class Tooltip extends React.Component {
  render() {
    const { range, offsetTop } = this.props;
    const { top, left, width} = range.getBoundingClientRect();
    const position = {
      top: (top - 50 + offsetTop) + 'px',
      left: (left - 25 + width/2) + 'px'
    };
    const toolTipStyles = { ...styles.tooltip, ...position };
    return (
      <div style={toolTipStyles}>test</div>
    );
  }
}

export default Tooltip;
