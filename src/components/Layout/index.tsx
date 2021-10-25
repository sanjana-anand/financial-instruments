import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Content from '../Content';

type LayoutProps = {
  children: ReactNode;
};

const LayoutWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 4rem 1fr 2rem;
`;

const Header = styled.header`
  padding: 1rem 2.5rem;
  font-size: 2rem;
`;

const Layout = ({children}: LayoutProps) => {
  return (
    <LayoutWrapper>
      <Header>Financial Instruments</Header>
      <Content> {children} </Content>
    </LayoutWrapper>
  );
}

export default Layout;