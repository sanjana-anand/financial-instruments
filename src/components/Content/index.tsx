import React, { ReactNode } from 'react';
import styled from 'styled-components';

type ContentProps = {
  children: ReactNode;
};

const ContentWrapper = styled.div`
    overflow-y: auto;
    padding: 0.5rem 2.5rem;
`;

const Content = ({children}: ContentProps) => {
  return (
    <ContentWrapper>{children}</ContentWrapper>
  );
}

export default Content;