import React, { memo } from 'react';
import styled from 'styled-components/macro';

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface Props extends InputProps {
  id: string;
  label: string;
  inputType?: string;
  className?: string;
}

export const Input = memo(
  ({ id, label, inputType, className, ...restOf }: Props) => {
    return (
      <Wrapper className={className}>
        <input type={inputType ?? 'text'} id={id} {...restOf} />
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  display: flex;

  input {
    order: 2;
    margin: 0.25rem;
    padding: 0.2rem 0.5rem;
    position: relative;
    color: ${p => p.theme.text};
    background-color: ${p => p.theme.backgroundVariant};
    border: 2px solid ${p => p.theme.border};

    + label {
      order: 1;
      margin: 0;
      display: inline-block;
      padding-top: 0.45rem;
      padding-right: 0.5rem;
      position: relative;
      cursor: pointer;
      font-size: 0.875rem;
      color: ${p => p.theme.text};
      z-index: 1;

      a {
        color: ${p => p.theme.text};
        text-decoration: none;
      }
    }

    &:disabled {
      opacity: 0.6;

      + label {
        opacity: 0.6;
        cursor: auto;
      }
    }
  }
`;
