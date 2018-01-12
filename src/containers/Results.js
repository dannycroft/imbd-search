import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { SHOW_MOVIE_DETAIL } from '../constants';
import Result from '../components/Result';

const Link = styled.a`
  background-color: #f4f3f0;
  border: 1px solid #e6e6e6;
  cursor: pointer;
`;

const CenteredContent = css`
  grid-column: 1 / -1;
  text-align: center;
`;

const Loading = styled.div`
  ${CenteredContent};
`;

const Error = styled.div`
  ${CenteredContent};
`;

const NoResults = styled.div`
  ${CenteredContent};
`;

class Results extends PureComponent {
  onClickHandler(id) {
    const { dispatch } = this.props;
    dispatch({ type: SHOW_MOVIE_DETAIL, id });
  }

  renderLoading() {
    return <Loading>Loading...</Loading>;
  }

  renderError() {
    return <Error>Sorry there was a problem! Please try again.</Error>;
  }

  renderNoResults() {
    return <NoResults>No results found :(</NoResults>;
  }

  renderResults() {
    return this.props.results.map(movie => (
      <Link key={movie.id} onClick={() => this.onClickHandler(movie.id)}>
        <Result movie={movie} />
      </Link>
    ));
  }

  render() {
    if (this.props.isLoading) return this.renderLoading();
    if (this.props.hasResults) return this.renderResults();
    if (this.props.hasError) return this.renderError();
    if (!this.props.hasResults && this.props.isComplete) return this.renderNoResults();
    return <div />;
  }
}

function mapStateToProps({ movies }) {
  return { ...movies };
}

export default connect(mapStateToProps)(Results);
