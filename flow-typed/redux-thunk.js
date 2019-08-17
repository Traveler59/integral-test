// @flow
import type { Middleware } from 'redux';

declare module 'redux-thunk' {
  declare var thunk: Middleware;
}
