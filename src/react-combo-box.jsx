import React from 'react';
import {chain, isEmpty, isEqual, uniq} from 'underscore';
import FlipMove from 'react-flip-move';

export const ComboBoxItem = React.createClass({

  displayName: 'ComboBoxItem',

  render() {
    return this.props.children;
  }

});

const ComboBox = React.createClass({

  displayName: 'ComboBox',

  getDefaultProps() {
    return {
      name: '',
      primary: '',
      alternates: [],
      collapsed: true,
      enableAnimation: true,
      animationDuration: 300,
      makePrimaryButtonText: 'Make primary',
      onPrimaryUpdated: () => {}
    };
  },

  getInitialState() {
    const {primary, alternates, collapsed} = this.props;
    return {primary, alternates, collapsed};
  },

  componentWillMount() {
    const {enableAnimation} = this.props;
    const {alternates} = this.state;
    this._shouldAnimateMakePrimary = enableAnimation && !isEmpty(alternates);
  },

  componentWillUpdate(nextProps, nextState) {
    const {enableAnimation} = this.props;
    if (enableAnimation) {
      const {alternates} = this.state;
      this._shouldAnimateMakePrimary = !isEqual(alternates, nextState.alternates);
    } else {
      this._shouldAnimateMakePrimary = false;
    }
  },

  toggle() {
    const {collapsed} = this.state;
    this.setState({collapsed: !collapsed});
  },

  isCollapsed() {
    return this.state.collapsed;
  },

  canToggle() {
    return this.isToggleVisible();
  },

  isToggleVisible() {
    return !isEmpty(this.props.alternates);
  },

  updatePrimary(primary) {
    const {onPrimaryUpdated} = this.props;
    const {primary: prevPrimary, alternates: prevAlternates} = this.state;
    const alternates = chain([primary, prevPrimary].concat(prevAlternates)).compact().uniq().value().slice(1);

    this.setState({primary, alternates});

    if (onPrimaryUpdated) {
      onPrimaryUpdated(primary);
    }
  },

  onInputChange(e) {
    e.preventDefault();
    this.updatePrimary(e.target.value);
  },

  onMakePrimaryClick(e) {
    e.preventDefault();
    this.updatePrimary(e.target.getAttribute('data-value'));
  },

  onToggleClick(e) {
    e.preventDefault();
    this.toggle();
  },

  renderShowMore(nMore) {
    const {toggleButtonClass, showMoreButtonText} = this.props;
    const txt = showMoreButtonText || (nMore ? `Show ${nMore} more` : 'Show more');
    return (
      <span data-ui='show-more' className={toggleButtonClass}>
        {txt}
      </span>
    );
  },

  renderShowLess() {
    const {toggleButtonClass, showLessButtonText} = this.props;
    const txt = showLessButtonText || 'Show less';
    return (
      <span className={toggleButtonClass}>
        {txt}
      </span>
    );
  },

  renderToggle(nMore) {
    if (this.canToggle()) {
      return (
        <span onClick={this.onToggleClick}>
          {this.isCollapsed() ? this.renderShowMore(nMore) : this.renderShowLess()}
        </span>
      );
    }
  },

  renderPrimary() {
    const {
      name,
      primaryInputClass,
      primaryInputHtmlOptions
    } = this.props;

    return (
      <input
        name={name}
        value={this.state.primary}
        className={primaryInputClass}
        onChange={this.onInputChange}
        {...primaryInputHtmlOptions}
      />
    );
  },

  renderAlternate(name, value, index) {
    const {
      alternateItemWrapperClass,
      alternateValueClass,
      makePrimaryButtonClass,
      makePrimaryButtonText
    } = this.props;

    return (
      <div className={alternateItemWrapperClass}>
        <span className={alternateValueClass}>
          {value}
        </span>
        <span className={makePrimaryButtonClass} onClick={this.onMakePrimaryClick} data-value={value}>
          {makePrimaryButtonText}
        </span>
      </div>
    );
  },

  renderList() {
    const {name} = this.props;
    const {primary, alternates} = this.state;
    const values = [primary].concat(alternates);

    return values.map((v, index) => {
      return (
        <ComboBoxItem key={v}>
          {index === 0 ? this.renderPrimary() : this.renderAlternate(name, v, index)}
        </ComboBoxItem>
      );
    });
  },

  renderTruncatedContent() {
    return this.renderPrimary();
  },

  renderFullContent() {
    const {animationDuration} = this.props;
    return (
      <FlipMove duration={animationDuration} disableAllAnimations={!this._shouldAnimateMakePrimary}>
        {this.renderList()}
      </FlipMove>
    );
  },

  renderContent() {
    if (this.canToggle()) {
      return this.isCollapsed() ? this.renderTruncatedContent() : this.renderFullContent();
    }
    return this.renderFullContent();
  },

  render() {
    const {name, className} = this.props;
    const {alternates} = this.state;
    return (
      <div className={className}>
        {this.renderContent()}
        {this.renderToggle(alternates.length)}
      </div>
    );
  }
});

ComboBox.propTypes = {
  name:                      React.PropTypes.string.isRequired,
  primary:                   React.PropTypes.string.isRequired,
  onPrimaryUpdated:          React.PropTypes.function,
  alternates:                React.PropTypes.array,
  collapsed:                 React.PropTypes.bool,
  enableAnimation:           React.PropTypes.bool,
  animationDuration:         React.PropTypes.number,
  primaryInputClass:         React.PropTypes.string,
  primaryInputHtmlOptions:   React.PropTypes.object,
  toggleButtonClass:         React.PropTypes.string,
  alternateItemWrapperClass: React.PropTypes.string,
  alternateValueClass:       React.PropTypes.string,
  makePrimaryButtonClass:    React.PropTypes.string,
  makePrimaryButtonText:     React.PropTypes.string,
  showMoreButtonText:        React.PropTypes.string,
  showLessButtonText:        React.PropTypes.string
}

export default ComboBox;
