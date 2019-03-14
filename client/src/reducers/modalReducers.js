import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  settings: false,
  box: false,
}

export default (state=initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        [action.modal]: true,
      }
    case HIDE_MODAL:
      return {
        ...state,
        [action.modal]: false,
      }
    default:
      return state
  }
}
