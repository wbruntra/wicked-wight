import axios from 'axios';

import {
  SHOW_MODAL,
  HIDE_MODAL,
  UPDATE_PHRASES,
  UPDATE_COUNT,
  UPDATE_LENGTH,
  UPDATE_SELECTED_PHRASE,
  UPDATE_WORDLIST,
  UPDATE_SELECTED_WORDLIST,
} from './types';

export const showModal = name => ({
  type: SHOW_MODAL,
  modal: name,
});

export const hideModal = name => ({
  type: HIDE_MODAL,
  modal: name,
});

export const updatePhrases = phrases => ({
  type: UPDATE_PHRASES,
  payload: phrases,
});

export const updateCount = count => ({
  type: UPDATE_COUNT,
  payload: count,
});

export const updateLength = len => ({
  type: UPDATE_LENGTH,
  payload: len,
});

export const updateSelectedPhrase = phrase => ({
  type: UPDATE_SELECTED_PHRASE,
  payload: phrase,
});

export const updateSelectedWordlist = key => ({
  type: UPDATE_SELECTED_WORDLIST,
  payload: key,
});

export const fetchWordlist = key => async dispatch => {
  try {
    const words = await axios.get(`/api/wordlist/${key}`).then(res => res.data);
    return dispatch({
      type: UPDATE_WORDLIST,
      payload: {
        key,
        words,
      }
    });
  } catch (err) {
    return Promise.reject(err.message)
  }
};
