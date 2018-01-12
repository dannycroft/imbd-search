import React from 'react';
import styled from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendar, faStar, faTimes } from '@fortawesome/fontawesome-free-solid';

import { HIDE_MOVIE_DETAIL } from '../constants';

const Wrapper = styled.div`
  position: relative;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 100px);
  margin: 1em 0 0.5em;
  background-color: #f4f3f0;
  border: 1px solid #e6e6e6;
`;

const Title = styled.h1`
  font-size: 1.5em;
  padding-top: 1.1em;
`;

const PosterImage = styled.div`
  grid-column: 1 / 3;
  width: 100%;
  height: 300px;
  background-position: center;
  background-size: cover;
  background-color: #ccc;
`;

const Info = styled.div`
  grid-column: 3 / 10;
`;

const MetaList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const MetaItem = styled.li`
  padding: 6px 0;
`;

const MetaIcon = styled.i`
  display: inline-block;
  width: 25px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 28px;
  height: 25px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 2px;
  cursor: pointer;
`;

const Overview = styled.p`
  @media (max-width: 700px) {
    font-size: 0.7em;
  }
`;

function parsePosterImage(img) {
  if (img.includes('/null')) return '';
  return img.replace('/w500//', '/w300/');
}

function onCloseHandler(dispatch) {
  dispatch({ type: HIDE_MOVIE_DETAIL });
}

const Detail = ({ dispatch, movie }) => (
  <Wrapper>
    <PosterImage style={{ backgroundImage: `url(${parsePosterImage(movie.full_poster_path)})` }} />
    <Info>
      <Title>{movie.title}</Title>
      <MetaList>
        <MetaItem>
          <MetaIcon>
            <FontAwesomeIcon icon={faCalendar} />
          </MetaIcon>
          <strong>Release Date: </strong>
          <em>{movie.release_date}</em>
        </MetaItem>
        <MetaItem>
          <MetaIcon>
            <FontAwesomeIcon icon={faStar} />
          </MetaIcon>
          <strong>Rating: </strong>
          <em>{movie.vote_average}</em>
        </MetaItem>
      </MetaList>
      <Overview>{movie.overview}</Overview>
    </Info>
    <CloseButton onClick={() => onCloseHandler(dispatch)}>
      <FontAwesomeIcon icon={faTimes} />
    </CloseButton>
  </Wrapper>
);

export default Detail;
