import React from 'react';
import { connect } from 'react-redux';

import { incrementCounter, decrementCounter } from '../actions/counter';

const Counter = props => {
  const { count, incrementCounter, decrementCounter } = { ...props };
  return (
    <>
      <div>Count: {count}</div>
      <button onClick={() => incrementCounter()}>Increase Count</button>
      <button onClick={() => decrementCounter()}>Decrease Count</button>
    </>
  );
};

const mapStateToProps = state => ({
  count: state.counter.count,
});

const mapDispatchToProps = dispatch => ({
  incrementCounter: () => dispatch(incrementCounter()),
  decrementCounter: () => dispatch(decrementCounter()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
