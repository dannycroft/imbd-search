import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  height: 100%;
  background-size: cover;
  background-position: center;
  border-radius: 2px;
`;

const Info = styled.div`
  position: absolute;
  width: calc(100% - 1em);
  padding: 0.5em;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.5);
  text-align: center;
  font-size: 1em;
  color: #000;
  border-top: 1px solid #ccc;
`;

function parseBackdrop(img) {
  if (img.includes('/null')) return '';
  return img.replace('/w500//', '/w300/');
}

const Result = ({ movie }) => (
  <Wrapper style={{ backgroundImage: `url(${parseBackdrop(movie.full_backdrop_path)})` }}>
    <Info>{movie.title}</Info>
  </Wrapper>
);

export default Result;
