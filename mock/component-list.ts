/**
Badges
small-badge
large-badge

Banner

Bottom app bar
bottom-app-bar

Bottom sheets
standard-bottom-sheet
modal-bottom-sheet

Buttons
elevated-button
extended-fab
fab (default、small、large)
filled-button
filled-tonal-button
icon-button (standard-icon-button、contained-icon-button)
outlined-button
segmented-button (single-select-segmented-button、multi-select-segmented-button)
text-button

Cards
elevated-card
filled-card
outlined-card

Carousel

Cascader

Checkbox
checkbox

Chips
assist-chip
filter-chip
input-chip
suggestion-chip

Color pickers

Container

Date pickers
docked-date-picker
modal-date-picker
modal-date-input

Dialogs
basic-dialog
full-screen-dialog

Dividers
divider

Form

Image list

Lists
list

Navigation bar
navigation-bar

Menus
menus

Navigation bar

Navigation drawers
standard-navigation-drawer
modal-navigation-drawer

Navigation rail
navigation-rail

Pagination

Progress indicators
linear-progress-indicator
circular-progress-indicator

Radio buttons
radio

Rating

Search

Select

Side sheet

Sliders
continuous-slider
discrete-slider

Snackbar
snackbar

Switch
switch

Table

Tabs
primary-tabs
secondary-tabs

Text fields
filled-text-field
outlined-text-field

Textarea

Time pickers
time-picker-dial
time-picker-input

Tooltip

Top app bars
center-aligned-top-app-bar
small-top-app-bar
medium-top-app-bar
large-top-app-bar

Tree
*/

export const components = [
  {
    label: 'Buttons',
    name: 'buttons',
    children: [
      { label: 'Elevated button', name: 'elevated-button', icon: '' },
      { label: 'Extended fab', name: 'extended-fab', icon: '' },
      { label: 'Fab', name: 'fab', icon: '' },
      { label: 'Filled button', name: 'filled-button', icon: '' },
      { label: 'Filled tonal button', name: 'filled-tonal-button', icon: '' },
      { label: 'Icon button', name: 'icon-button', icon: '' },
      { label: 'Outlined button', name: 'outlined-button', icon: '' },
      { label: 'Segmented button', name: 'segmented-button', icon: '' },
      { label: 'Text button', name: 'text-button', icon: '' }
    ]
  },
  {
    label: 'Communication',
    name: 'communication',
    children: [
      { label: 'Badges', name: 'badge', icon: '' },
      { label: 'Progress indicators', name: '', icon: '' },
      { label: 'Snackbar', name: '', icon: '' }
    ]
  },
  {
    label: 'Containment',
    name: 'Containment',
    children: [
      { label: 'Bottom sheet', name: 'bottom-sheet', icon: '' },
      { label: 'Card', name: 'card', icon: '' },
      { label: 'Container', name: 'container', icon: '' },
      { label: 'Dialog', name: 'dialog', icon: '' },
      { label: 'Divider', name: 'divider', icon: '' },
      { label: 'List', name: 'list', icon: '' }
    ]
  },
  {
    label: 'Navigation',
    name: 'navigation',
    children: [
      { label: 'Bottom app bar', name: 'bottom-app-bar', icon: '' },
      { label: 'Navigation bar', name: 'navigation-bar', icon: '' },
      { label: 'Navigation drawer', name: 'navigation-drawer', icon: '' },
      { label: 'Navigation rail', name: 'navigation-rail', icon: '' },
      { label: 'Search', name: 'search', icon: '' },
      { label: 'Tabs', name: 'tabs', icon: '' },
      { label: 'Top app bar', name: 'top-app-bar', icon: '' }
    ]
  },
  {
    label: 'Selection',
    name: 'selection',
    children: [
      { label: 'Chips', name: '', icon: '' },
      { label: 'Date pickers', name: '', icon: '' },
      { label: 'Menus', name: '', icon: '' },
      { label: 'Radio buttons', name: '', icon: '' },
      { label: 'Sliders', name: '', icon: '' },
      { label: 'Switch', name: '', icon: '' },
      { label: 'Time pickers', name: '', icon: '' }
    ]
  },
  {
    label: 'Text inputs',
    name: 'text-inputs',
    children: [
      { label: 'Text fields', name: '', icon: '' },
    ]
  },
]
