# react-combo-box

A React combobox component to handle primary and alternate field values.

## Installation

```
$ npm i react-combo-box
```

## Basic Usage

```
<ReactCombobox
  name='email'
  primary='john@example.com'
  alternates={['john.doe@example.com', 'john_doe@example.com']}
  onPrimaryUpdated={this.onPrimaryUpdated}
/>
```

## Supported Properties

**name** *Required*

Name of the field.

**primary** *Required*

Primary value to be displayed and edited.

**alternates**

Alternate values to be displayed.

**onPrimaryUpdated**

Callback when the primary value is altered.

**collapsed**

Initial collapsed status. Defaults to true.

**enableAnimation**

Enable "Make Primary" animation. Defaults to true.

**animationDuration**

Animation duration in ms. Defaults to 300.

**primaryInputClass**

Class to be applied to the primary input element.

**primaryInputHtmlOptions**

Object of Html options for the primary input element.

**toggleButtonClass**

Class to be applied to the toggle button class.

**alternateItemWrapperClass**

Class to be applied to the alternate values wrapping element.

**alternateValueClass**

Class to be applied to each alternate value entry.

**makePrimaryButtonClass**

Class to be applied to the "Make Primary" button.

**makePrimaryButtonText**

"Make Primary" button text. Defaults to "Make primary".

**showMoreButtonText**

"Show More" button text. Defaults to "Show N more" where N is the number of alternate values.

**showLessButtonText**

"Show less" button text. Defaults to "Show less".

## Licence

MIT
