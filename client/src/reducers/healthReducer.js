import { HEALTH_CHECK } from '../actions';

export default (state={}, action) => {
  switch (action.type) {
    case HEALTH_CHECK:
      return action.payload
    default:
      return state
  }
}
