import {
  UPDATE_PHRASES,
  UPDATE_COUNT,
  UPDATE_LENGTH,
  UPDATE_SELECTED_PHRASE,
} from '../actions/types';

const initialState = {
  phrases: [],
  phraseCount: 5,
  phraseLength: 4,
  selectedPhrase: '',
}

export default (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_PHRASES:
      return {
        ...state,
        phrases: action.payload,
      }
    case UPDATE_COUNT:
      return {
        ...state,
        phraseCount: action.payload,
      }
    case UPDATE_LENGTH:
      return {
        ...state,
        phraseLength: action.payload,
      }
    case UPDATE_SELECTED_PHRASE:
      return {
        ...state,
        selectedPhrase: action.payload
      }
    default:
      return state
  }
}
