import React from 'react';
import {render} from 'react-dom';
import ReactCombobox from '../dist/react-combo-box';

class Showcase extends React.Component {

  onPrimaryUpdated(primaryValue) {
    const output = document.querySelector('span.output');
    output.innerHTML = `New primary value: ${primaryValue}`;
  }

  render() {
    return (
      <section>
        <header>
          <h1>React-combo-box examples</h1>
        </header>
        <div className='example'>
          <h3>Basic Usage</h3>
          <ReactCombobox
            name='email'
            primary='john@example.com'
            alternates={['john.doe@example.com', 'john_doe@example.com']}
            onPrimaryUpdated={this.onPrimaryUpdated}
          />
          <span className='output'></span>
        </div>
      </section>
    );
  }
};

render(<Showcase/>, document.getElementById('showcase'));
