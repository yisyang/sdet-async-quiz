import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { LoadingIndicator } from 'app/components/LoadingIndicator';

interface Props {
  name: string;
  waitTime: number;
  finalVal: number;
}

export function AsyncVal({ name, waitTime, finalVal }: Props) {
  const [loaded, setLoaded] = useState(false);
  const prom = new Promise(resolve => setTimeout(resolve, waitTime * 1000));
  prom.then(() => {
    setLoaded(true);
  });

  return (
    <Wrapper>
      <Info>
        <Name>{name}</Name>
        {loaded ? <FinalVal>{finalVal}</FinalVal> : <LoadingIndicator />}
      </Info>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1rem;
  min-height: 2.75rem;
  font-weight: 500;
  color: ${p => p.theme.text};

  &:nth-child(odd) {
    background-color: ${p => p.theme.backgroundVariant};
  }
`;

const Info = styled.div`
  display: flex;
`;

const Name = styled.div`
  flex: 1;
  padding: 0.625rem 0;
  min-width: 6rem;
`;

const FinalVal = styled.div`
  display: flex;
  align-items: center;
  min-width: 6rem;
`;
