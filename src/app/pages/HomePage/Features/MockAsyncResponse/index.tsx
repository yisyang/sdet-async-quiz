import React, { useState } from 'react';
import { FormLabel } from 'app/components/FormLabel';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';
import styled from 'styled-components/macro';
import { SubTitle } from '../../components/SubTitle';
import { P } from '../../components/P';
import { AsyncVal } from './components/AsyncVal';

export function MockAsyncResponse() {
  const [seed, setSeed] = useState('');
  const [reqBtnDisabled, setReqBtnDisabled] = useState(true);
  const [reqRunning, setReqRunning] = useState(false);
  const [resFired, setResFired] = useState(false);
  const [resState, setResState] = useState({
    seedUsed: '',
    maxWait: 0,
    waitTimes: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
    },
    values: {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
    },
  });
  const results = resState;

  const handleSeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string;

    setSeed(value);
    setResFired(false);

    if (value.length > 0) {
      setReqBtnDisabled(false);
    } else {
      setReqBtnDisabled(true);
    }
  };

  // Hack to prevent certain keys for integer-only input.
  const handleSeedKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (['Minus', 'Space', 'KeyE', 'Period'].includes(event.code)) {
      event.preventDefault();
    }
  };

  const handleStartRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Disable button.
    setReqRunning(true);
    setReqBtnDisabled(true);

    // Send request.
    makeMockRequest(seed);

    // Change state.
    setResFired(true);

    // Re-enable button after some time.
    setTimeout(() => {
      setReqRunning(false);
      setReqBtnDisabled(false);
    }, results.maxWait * 1000);
  };

  const makeMockRequest = (seed: string) => {
    const seedInt = parseInt(seed);
    const waitTimes = [
      ((seedInt * 2) % 29) + 1,
      ((seedInt * 3) % 28) + 2,
      ((seedInt * 5) % 27) + 3,
      ((seedInt * 8) % 26) + 4,
      ((seedInt * 13) % 25) + 5,
    ];
    const values = [
      (seedInt * 2 + 33) % 5,
      (seedInt * 3 + 44) % 8,
      (seedInt * 5 + 55) % 13,
      (seedInt * 8 + 66) % 21,
      (seedInt * 13 + 77) % 34,
    ];

    results.maxWait = Math.max(...waitTimes);
    const indices: string[] = ['a', 'b', 'c', 'd', 'e'];
    for (let i = 0; i < indices.length; i++) {
      results.waitTimes[indices[i]] = waitTimes[i];
      results.values[indices[i]] = values[i];
    }
    setResState(results);
  };

  return (
    <Wrapper>
      <SubTitle>Form</SubTitle>
      <FormLabel>Fill in seed, then click the button</FormLabel>
      <Input
        id="seed"
        label="Numeric Seed"
        inputType="number"
        className="input"
        name="seed"
        min="0"
        onKeyDown={handleSeedKeyDown}
        onChange={handleSeedChange}
        disabled={reqRunning}
      />
      <Button
        id="request"
        label="Button"
        text="Start Request"
        onClick={handleStartRequest}
        disabled={reqBtnDisabled}
      />
      <br />
      <SubTitle>Response Area</SubTitle>
      <div id="results">
        {resFired ? (
          <>
            <AsyncVal
              name="a"
              waitTime={resState.waitTimes.a}
              finalVal={resState.values.a}
            />
            <AsyncVal
              name="b"
              waitTime={resState.waitTimes.b}
              finalVal={resState.values.b}
            />
            <AsyncVal
              name="c"
              waitTime={resState.waitTimes.c}
              finalVal={resState.values.c}
            />
            <AsyncVal
              name="d"
              waitTime={resState.waitTimes.d}
              finalVal={resState.values.d}
            />
            <AsyncVal
              name="e"
              waitTime={resState.waitTimes.e}
              finalVal={resState.values.e}
            />
          </>
        ) : (
          <P>Start request to see response here.</P>
        )}
        {resFired && !reqRunning ? (
          <P>
            Seed {seed}: Request complete. Max wait time is {resState.maxWait}{' '}
            seconds.
          </P>
        ) : (
          <></>
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FormLabel} {
    margin-bottom: 0.625rem;
  }
`;
