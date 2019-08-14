// @flow
const initialState = {

};

interface AppState{}

interface AppAction{
  type: string
}

const tasks = (state:AppState = initialState, action: AppAction) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default tasks;
