import {MARWEL_CHARACTERS} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case MARWEL_CHARACTERS:
      return { ...state, marwelCharacters: action.payload };
    default:
      return state;
  }
}
