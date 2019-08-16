// @flow

interface ReactBootstrapColProps {
  lg?: | {| span: number; offset: number |},
  md?: | {| span: number; offset: number |} | number,
  sm?: | {| span: number; offset: number |} | number,
}

declare module 'react-bootstrap' {
  declare export class Col extends React$Component<ReactBootstrapColProps, {}> {

  }

  declare export class Table extends React$Component<{}, {}> {

  }

  declare export class Button extends React$Component<{}, {}> {

  }

  declare export class ButtonGroup extends React$Component<{}, {}> {

  }

  declare export class FormControl extends React$Component<{}, {}> {

  }

  declare export class Popover extends React$Component<{}, {}> {

  }

  declare export class OverlayTrigger extends React$Component<{}, {}> {

  }
  declare export class Dropdown extends React$Component<{}, {}> {
    static Menu: typeof React$Component;
    static Toggle: typeof React$Component;
    static Item: typeof React$Component;
  }
}
