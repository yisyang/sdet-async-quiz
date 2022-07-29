import * as React from 'react';
import { Title } from '../components/Title';
import { MockAsyncResponse } from './MockAsyncResponse';
import { P } from '../components/P';
import { SubTitle } from '../components/SubTitle';

export function Features() {
  return (
    <>
      <Title as="h2">Quiz</Title>
      <SubTitle>Instructions</SubTitle>
      <P>
        Fill in a <strong>seed value</strong>, then click on the{' '}
        <strong>button</strong>.
      </P>
      <P>
        The page will fire <strong>async requests</strong>.
        <br />
        The page will then display a list with{' '}
        <strong>five loading icons</strong>.
        <br />
        Within the next 30 seconds, each loading icon will turn into{' '}
        <strong>pseudo-random values</strong>.
      </P>
      <SubTitle>Task</SubTitle>
      <P>
        Your task is to write a <strong>time-efficient</strong> test to fill out
        the form, click the button, and to{' '}
        <strong>obtain the list of results</strong>.
      </P>
      <hr />
      <br />
      <MockAsyncResponse />
    </>
  );
}
