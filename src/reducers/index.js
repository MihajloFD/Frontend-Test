import { combineReducers } from 'redux';

import marwelCharactersReducer from './marwel_characters_reducer';

const rootReducer = combineReducers({
  marwelCharacters: marwelCharactersReducer
});

export default rootReducer;
