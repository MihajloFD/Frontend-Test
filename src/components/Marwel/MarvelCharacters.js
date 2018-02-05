import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions/MarwelActions';

import MarvelCharacterItem from './MarvelCharacterItem';

import paginationLeft from '../../images/pag-arrow-left.svg';
import paginationRight from '../../images/pag-arrow-right.svg';

import './MarvelCharactersStyle.scss';
const PAGINATION_FORWARD = 'pagination_forward';
const PAGINATION_BACKWARD = 'pagination_backward';
const CHARACTERS = 'CHARACTERS';

class MarvelCharacters extends Component {
  constructor (props) {
    super(props);
    this.state = {
      term: '',
      page: 0,
      flag: false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.flag = this.flag.bind(this);
  }
  flag () {
    this.props.fetchMarvelCharacters({nameStartsWith: this.state.term});
    this.setState({flag: !this.state.flag});
  }
  onInputChange (e) {
    let value = e.target.value;
    this.setState({ term: value });
    let debounceSearch = _.debounce(this.props.fetchMarvelCharacters, 300, { 'trailing': true, 'leading': false });
    debounceSearch({nameStartsWith: value});
  }
  renderMarwelCharacters (character, marked) {
    return <MarvelCharacterItem marked={marked} flag={this.flag} key={character.id} character={character} />;
  }
  handlePaginationParams (paginationDirection) {
    const { page, term } = this.state;
    const {marwelCharacters} = this.props;
    let total = marwelCharacters ? marwelCharacters.total : 1;
    let limit = marwelCharacters ? marwelCharacters.limit : 1;
    let count = marwelCharacters ? marwelCharacters.count : 1;
    let offset = marwelCharacters ? marwelCharacters.offset : 0;
    let totalPage = total / limit;
    totalPage = Math.ceil(totalPage);
    let params = {};
    // params.page = page;
    params.term = term;
    if (paginationDirection && paginationDirection === PAGINATION_FORWARD && page < (totalPage - 1)) {
      let newPage = page + 1;
      params.page = offset + count;
      this.setState({page: newPage});
    } else if (paginationDirection && paginationDirection === PAGINATION_BACKWARD && page > 0 && offset >= limit) {
      let newPage = page - 1;
      params.page = offset - limit;
      this.setState({page: newPage});
    }
    this.props.handlePagination({paginationParams: params});
  }
  render () {
    let {marwelCharacters} = this.props;
    const { page } = this.state;

    // const page = marwelCharacters ? marwelCharacters.offset : 1;
    let total = marwelCharacters ? marwelCharacters.total : 0;
    const limit = marwelCharacters ? marwelCharacters.limit : 1;
    let existing = localStorage.getItem(CHARACTERS);
    if (existing) {
      existing = JSON.parse(existing);
      if (marwelCharacters && marwelCharacters.results && existing) {
        existing.map((item) => {
          let removed = _.remove(marwelCharacters.results, (n) => {
            return n.id === item.id;
          });
          console.log('removed', removed);
        });
      }
    };
    // console.log('dupli', duplicate);
    let noPage = total / limit;
    noPage = Math.ceil(noPage);
    return (
      <div className='container'>
        <div className='row'>
          <input className='form-control'
            type='text'
            placeholder='Search Marvel Characters'
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </div>
        {marwelCharacters || existing
          ? <div className='row'>
            <div className='col-sm-12'>
              <div className='pagination'>
                <span>{page + 1}</span> <span>of</span> <span>{noPage}</span>
                <span className='pointer' onClick={() => this.handlePaginationParams(PAGINATION_BACKWARD)} >
                  <img src={paginationLeft} alt='pagination-left' />
                </span>
                <span className='pointer' onClick={() => this.handlePaginationParams(PAGINATION_FORWARD)}>
                  <img src={paginationRight} alt='pagination-right' />
                </span>
              </div>
            </div>
            {existing && existing.length > 0 ? existing.map((character) => this.renderMarwelCharacters(character, true)) : ''}
            {marwelCharacters ? marwelCharacters.results.map((character) => this.renderMarwelCharacters(character)) : ''}
          </div>
          : <div className='row'>
            <div>You didn't bookmark any character. Please search and bookmark character</div>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { marwelCharacters: state.marwelCharacters.marwelCharacters };
}

export default connect(mapStateToProps, actions)(MarvelCharacters);
