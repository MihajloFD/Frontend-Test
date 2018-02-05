import axios from 'axios';
import {MARWEL_CHARACTERS} from '../types';
import CryptoJS from 'crypto-js';

const ROOT_URL = 'http://gateway.marvel.com';
const PUBLIC_APY_KEY = 'bad452ad1a699d2891511a8a1b0c2347';
const PRIVATE_API_KEY = 'b0b1d20696ea72a7250a2145539b9017e5ca584b';

export function fetchMarvelCharacters ({nameStartsWith, offset}) {
  let ts = new Date().getTime();
  let hash = CryptoJS.MD5(ts + PRIVATE_API_KEY + PUBLIC_APY_KEY).toString();
  let URL;
  if (offset) {
    URL = `${ROOT_URL}/v1/public/characters?nameStartsWith=${nameStartsWith}&offset=${offset}&ts=${ts}&apikey=${PUBLIC_APY_KEY}&hash=${hash}`;
  } else {
    URL = `${ROOT_URL}/v1/public/characters?nameStartsWith=${nameStartsWith}&ts=${ts}&apikey=${PUBLIC_APY_KEY}&hash=${hash}`;
  }
  return function (dispatch) {
    axios.get(URL)
      .then(function (response) {
        dispatch({ type: MARWEL_CHARACTERS, payload: response.data.data });
      })
      .catch(function (error) {
        dispatch({ type: MARWEL_CHARACTERS, payload: '' });
        console.error('Fetch error', error);
      });
  };
}

export function handlePagination ({paginationParams}) {
  return function (dispatch) {
    dispatch(fetchMarvelCharacters({nameStartsWith: paginationParams.term, offset: paginationParams.page}));
  };
}
