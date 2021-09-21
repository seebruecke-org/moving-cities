import { useReducer } from "react";

const initialState = {
  activeThread: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'THREAD_ITEM_ACTIVATE':
      return {activeThread: action.payload};

    default:
      throw new Error();
  }
}

export default function useMapReducer() {
  return useReducer(reducer, initialState);
}
