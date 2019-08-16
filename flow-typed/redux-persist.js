declare module 'redux-persist' {
  declare export var REHYDRATE: 'persist/REHYDRATE';
  declare export var persistReducer: any;
  declare export var persistStore: any;
}

declare module 'redux-persist/es/integration/react' {
  declare module.exports: any;
}

declare module 'redux-persist/lib/storage' {
  declare module.exports: any;
}