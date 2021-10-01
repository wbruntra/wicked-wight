import { createSlice } from '@reduxjs/toolkit'

// const initialState = { value: 0 }

const initialState = {
  phrases: [],
  phraseCount: 5,
  phraseLength: 4,
  selectedPhrase: '',
  passType: 'words',
}

const counterSlice = createSlice({
  name: 'phrases',
  initialState,
  reducers: {
    updatePhrases(state, action) {
      state.phrases = action.payload
    },
    updateCount(state, action) {
      state.phraseCount = action.payload
    },
    updateLength(state, action) {
      state.phraseLength = action.payload
    },
    updateSelectedPhrase(state, action) {
      state.selectedPhrase = action.payload
    },
    updatePasstype(state, action) {
      state.passType = action.payload
    },
  },
})

// export const { updatePhrases, updateCount, updateLength, updateSelectedPhrase, updatePassType } =
//   counterSlice.actions

export const phraseActions = counterSlice.actions
export default counterSlice.reducer
