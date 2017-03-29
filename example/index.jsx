import React from 'react';
import {render} from 'react-dom';
import ReactCombobox from '../dist/react-combo-box';

class Showcase extends React.Component {

  onUpdate(primary, alternates) {
    console.log(`New primary value: ${primary}`);
  }

  render() {
    return (
      <section>
        <header>
          <h1>React-combo-box examples</h1>
        </header>
        <div className='example'>
          <h3>Emails</h3>
          <ReactCombobox
            name='email'
            primary='john@example.com'
            alternates={['john.doe@example.com', 'john_doe@example.com']}
            onUpdate={this.onUpdate}
            primaryInputClass='primary-input'
            alternateValueClass='alternate-value'
            toggleButtonClass='toggle-btn'
            makePrimaryButtonClass='make-primary-btn'
          />
        </div>
      </section>
    );
  }
};

render(<Showcase/>, document.getElementById('showcase'));
