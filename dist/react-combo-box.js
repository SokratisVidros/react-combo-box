'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComboBoxItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _underscore = require('underscore');

var _reactFlipMove = require('react-flip-move');

var _reactFlipMove2 = _interopRequireDefault(_reactFlipMove);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ComboBoxItem = exports.ComboBoxItem = _react2.default.createClass({

  displayName: 'ComboBoxItem',

  render: function render() {
    return this.props.children;
  }
});

var ComboBox = _react2.default.createClass({

  displayName: 'ComboBox',

  getDefaultProps: function getDefaultProps() {
    return {
      name: '',
      primary: '',
      alternates: [],
      collapsed: true,
      enableAnimation: true,
      animationDuration: 300,
      makePrimaryButtonText: 'Make primary',
      onPrimaryUpdated: function onPrimaryUpdated() {}
    };
  },
  getInitialState: function getInitialState() {
    var _props = this.props,
        primary = _props.primary,
        alternates = _props.alternates,
        collapsed = _props.collapsed;

    return { primary: primary, alternates: alternates, collapsed: collapsed };
  },
  componentWillMount: function componentWillMount() {
    var enableAnimation = this.props.enableAnimation;
    var alternates = this.state.alternates;

    this._shouldAnimateMakePrimary = enableAnimation && !(0, _underscore.isEmpty)(alternates);
  },
  componentWillUpdate: function componentWillUpdate(nextProps, nextState) {
    var enableAnimation = this.props.enableAnimation;

    if (enableAnimation) {
      var alternates = this.state.alternates;

      this._shouldAnimateMakePrimary = !(0, _underscore.isEqual)(alternates, nextState.alternates);
    } else {
      this._shouldAnimateMakePrimary = false;
    }
  },
  toggle: function toggle() {
    var collapsed = this.state.collapsed;

    this.setState({ collapsed: !collapsed });
  },
  isCollapsed: function isCollapsed() {
    return this.state.collapsed;
  },
  canToggle: function canToggle() {
    return this.isToggleVisible();
  },
  isToggleVisible: function isToggleVisible() {
    return !(0, _underscore.isEmpty)(this.props.alternates);
  },
  updatePrimary: function updatePrimary(primary) {
    var onPrimaryUpdated = this.props.onPrimaryUpdated;
    var _state = this.state,
        prevPrimary = _state.primary,
        prevAlternates = _state.alternates;

    var alternates = (0, _underscore.chain)([primary, prevPrimary].concat(prevAlternates)).compact().uniq().value().slice(1);

    this.setState({ primary: primary, alternates: alternates });

    if (onPrimaryUpdated) {
      onPrimaryUpdated(primary);
    }
  },
  onInputChange: function onInputChange(e) {
    e.preventDefault();
    this.updatePrimary(e.target.value);
  },
  onMakePrimaryClick: function onMakePrimaryClick(e) {
    e.preventDefault();
    this.updatePrimary(e.target.getAttribute('data-value'));
  },
  onToggleClick: function onToggleClick(e) {
    e.preventDefault();
    this.toggle();
  },
  renderShowMore: function renderShowMore(nMore) {
    var _props2 = this.props,
        toggleButtonClass = _props2.toggleButtonClass,
        showMoreButtonText = _props2.showMoreButtonText;

    var txt = showMoreButtonText || (nMore ? 'Show ' + nMore + ' more' : 'Show more');
    return _react2.default.createElement(
      'span',
      { 'data-ui': 'show-more', className: toggleButtonClass },
      txt
    );
  },
  renderShowLess: function renderShowLess() {
    var _props3 = this.props,
        toggleButtonClass = _props3.toggleButtonClass,
        showLessButtonText = _props3.showLessButtonText;

    var txt = showLessButtonText || 'Show less';
    return _react2.default.createElement(
      'span',
      { className: toggleButtonClass },
      txt
    );
  },
  renderToggle: function renderToggle(nMore) {
    if (this.canToggle()) {
      return _react2.default.createElement(
        'span',
        { onClick: this.onToggleClick },
        this.isCollapsed() ? this.renderShowMore(nMore) : this.renderShowLess()
      );
    }
  },
  renderPrimary: function renderPrimary() {
    var _props4 = this.props,
        name = _props4.name,
        primaryInputClass = _props4.primaryInputClass,
        primaryInputHtmlOptions = _props4.primaryInputHtmlOptions;


    return _react2.default.createElement('input', _extends({
      name: name,
      value: this.state.primary,
      className: primaryInputClass,
      onChange: this.onInputChange
    }, primaryInputHtmlOptions));
  },
  renderAlternate: function renderAlternate(name, value, index) {
    var _props5 = this.props,
        alternateItemWrapperClass = _props5.alternateItemWrapperClass,
        alternateValueClass = _props5.alternateValueClass,
        makePrimaryButtonClass = _props5.makePrimaryButtonClass,
        makePrimaryButtonText = _props5.makePrimaryButtonText;


    return _react2.default.createElement(
      'div',
      { className: alternateItemWrapperClass },
      _react2.default.createElement(
        'span',
        { className: alternateValueClass },
        value
      ),
      _react2.default.createElement(
        'span',
        { className: makePrimaryButtonClass, onClick: this.onMakePrimaryClick, 'data-value': value },
        makePrimaryButtonText
      )
    );
  },
  renderList: function renderList() {
    var _this = this;

    var name = this.props.name;
    var _state2 = this.state,
        primary = _state2.primary,
        alternates = _state2.alternates;

    var values = [primary].concat(alternates);

    return values.map(function (v, index) {
      return _react2.default.createElement(
        ComboBoxItem,
        { key: v },
        index === 0 ? _this.renderPrimary() : _this.renderAlternate(name, v, index)
      );
    });
  },
  renderTruncatedContent: function renderTruncatedContent() {
    return this.renderPrimary();
  },
  renderFullContent: function renderFullContent() {
    var animationDuration = this.props.animationDuration;

    return _react2.default.createElement(
      _reactFlipMove2.default,
      { duration: animationDuration, disableAllAnimations: !this._shouldAnimateMakePrimary },
      this.renderList()
    );
  },
  renderContent: function renderContent() {
    if (this.canToggle()) {
      return this.isCollapsed() ? this.renderTruncatedContent() : this.renderFullContent();
    }
    return this.renderFullContent();
  },
  render: function render() {
    var _props6 = this.props,
        name = _props6.name,
        className = _props6.className;
    var alternates = this.state.alternates;

    return _react2.default.createElement(
      'div',
      { className: className },
      this.renderContent(),
      this.renderToggle(alternates.length)
    );
  }
});

ComboBox.propTypes = {
  name: _react2.default.PropTypes.string.isRequired,
  primary: _react2.default.PropTypes.string.isRequired,
  onPrimaryUpdated: _react2.default.PropTypes.function,
  alternates: _react2.default.PropTypes.array,
  collapsed: _react2.default.PropTypes.bool,
  enableAnimation: _react2.default.PropTypes.bool,
  animationDuration: _react2.default.PropTypes.number,
  primaryInputClass: _react2.default.PropTypes.string,
  primaryInputHtmlOptions: _react2.default.PropTypes.object,
  toggleButtonClass: _react2.default.PropTypes.string,
  alternateItemWrapperClass: _react2.default.PropTypes.string,
  alternateValueClass: _react2.default.PropTypes.string,
  makePrimaryButtonClass: _react2.default.PropTypes.string,
  makePrimaryButtonText: _react2.default.PropTypes.string,
  showMoreButtonText: _react2.default.PropTypes.string,
  showLessButtonText: _react2.default.PropTypes.string
};

exports.default = ComboBox;
