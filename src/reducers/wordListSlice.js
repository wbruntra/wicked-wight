import { createSlice } from '@reduxjs/toolkit'
import gotWords from '../data/got-long-words'

const initialState = {
  // selectedList: 'got',
  // got: gotWords,
  wordList: {
    name: 'got',
    words: gotWords,
  },
}

const wordListSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {
    updateWordlist(state, action) {
      state.wordList = action.payload
    },
  },
})

export const wordListActions = wordListSlice.actions
export default wordListSlice.reducer
