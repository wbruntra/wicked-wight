import {
  UPDATE_WORDLIST,
  UPDATE_SELECTED_WORDLIST,
} from '../actions/types';
import gotWords from '../data/got-long-words';

const initialState = {
  selectedList : 'got',
  got: gotWords
}

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_WORDLIST:
      return {
        ...state,
        [action.payload.key]: action.payload.words,
      }
    case UPDATE_SELECTED_WORDLIST:
      return {
        ...state,
        selectedList: action.payload,
      }
    default:
      return state
  }
}
