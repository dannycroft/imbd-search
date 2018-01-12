import React from 'react';
import styled from 'styled-components';

import Search from '../containers/Search';

const Wrapper = styled.div`
  font-family: 'Roboto Slab', serif;
  margin: 0 auto;
  max-width: 940px;
  min-width: 370px;
`;

const App = () => (
  <Wrapper>
    <Search />
  </Wrapper>
);

export default App;
