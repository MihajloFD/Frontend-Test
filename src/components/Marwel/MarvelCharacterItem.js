import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../../actions/MarwelActions';

import bookmarked from '../../images/book.png';
import unbookmarked from '../../images/unbook.png';

const CHARACTERS = 'CHARACTERS';

class MarvelCharacterItem extends Component {
  constructor (props) {
    super(props);
    this.state = {bookmark: false};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (character) {
    let existing = localStorage.getItem(CHARACTERS);
    if (!existing) {
      existing = [];
    } else {
      existing = JSON.parse(existing);
    }
    let removed = _.remove(existing, (item) => {
      return item.id === character.id;
    });
    if (removed.length === 0) {
      existing.push(character);
    }
    localStorage.setItem(CHARACTERS, JSON.stringify(existing));
    console.log('removed is ', removed);
    this.setState({bookmark: !this.state.bookmark});
    this.props.flag();
  }
  render () {
    const {character, marked} = this.props;
    const {bookmark} = this.state;
    const {path, extension} = character.thumbnail;
    if (marked && !bookmark) {
      this.setState({bookmark: true});
    }
    return (
      <div className='col-lg-3 col-md-6 col-sm-12' key={character.id}>
        <div className='marvelCharacterItem' onClick={() => this.handleClick(character)} >
          <img width={200} height={200} src={`${path}.${extension}`} alt={character.name} />
          <div>{character.name}</div>
          <div>Bookmarked {bookmark ? <img src={bookmarked} /> : <img src={unbookmarked} />}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return { marwelCharacters: state.marwelCharacters.marwelCharacters };
}

export default connect(mapStateToProps, actions)(MarvelCharacterItem);
