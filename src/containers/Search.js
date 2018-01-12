import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';

import Form from './Form';
import Results from './Results';

import Detail from '../components/Detail';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: minmax(150px, auto);
  grid-gap: 10px;
`;

const Header = styled.div`
  margin: 60px 0 0;
  grid-column: 1 / -1;
`;

const Footer = styled.div`
  margin: 60px 0 0;
  grid-column: 1 / -1;
  text-align: center;
  font-size: 0.8em;
`;

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  display: inline-block;
  animation: ${rotate360} 1s linear infinite;
`;

class Search extends PureComponent {
  render() {
    const { dispatch, movies: { isComplete, hasSelected, selected, hasResults } } = this.props;
    return (
      <Wrapper>
        <Header>
          <Form />
          {hasSelected ? <Detail dispatch={dispatch} movie={selected} /> : ''}
        </Header>
        <Results />
        <Footer>
          {hasResults && !isComplete ? (
            <div>
              <Spinner>
                <FontAwesomeIcon icon={faSpinner} />
              </Spinner>  Finding matches...
            </div>
          ) : (
            ''
          )}
        </Footer>
      </Wrapper>
    );
  }
}

function mapStateToProps({ movies }) {
  return { movies };
}

export default connect(mapStateToProps)(Search);
