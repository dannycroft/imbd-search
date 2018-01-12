import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled, { css } from 'styled-components';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/fontawesome-free-solid';

import { fetchMovies } from '../actions/index';

const FieldGroupBorder = css`
  border: 1px solid hsla(31, 15%, 50%, 0.25);
`;

const FieldGroup = styled.div`
  display: flex;
`;

const FieldIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 0.75em;
  background-color: rgba(147, 128, 108, 0.1);
  ${FieldGroupBorder};
  border-right: 0;
`;

const Field = styled.input`
  flex: 1;
  padding: 0.5em 0.75em;
  font-family: 'Roboto Slab', serif;
  background-color: #fff;
  color: #000;
  ${FieldGroupBorder};
`;

const Button = styled.button`
  border-radius: 0 2px 2px 0;
  background-color: rgba(147, 128, 108, 0.1);
  padding: 0.5em 0.75em;
  cursor: pointer;
  font-family: 'Roboto Slab', serif;
  ${FieldGroupBorder};
  border-left: 0;
  color: #000;
`;

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  onFormSubmit = event => {
    event.preventDefault();
    let query = this.state.query.replace(/\s+/g, '');

    if (query === '') return;

    this.props.fetchMovies(query);
    this.setState({ query: '' });
    event.currentTarget.querySelector('input').blur();
  };

  onInputChange = event => {
    this.setState({
      query: event.target.value,
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <FieldGroup>
          <FieldIcon>
            <FontAwesomeIcon icon={faSearch} />
          </FieldIcon>
          <Field
            value={this.state.query}
            onChange={this.onInputChange}
            placeholder="Find your favourite movie"
          />
          <Button onClick={this.handleSubmit}>Search</Button>
        </FieldGroup>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMovies }, dispatch);
}

export default connect(null, mapDispatchToProps)(Form);
