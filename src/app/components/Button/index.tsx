import React, { memo } from 'react';
import styled from 'styled-components/macro';

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface Props extends ButtonProps {
  id: string;
  label?: string;
  className?: string;
  text: string;
}

export const Button = memo(
  ({ id, label, className, text, ...restOf }: Props) => {
    return (
      <Wrapper className={className}>
        <button id={id} {...restOf}>
          {text}
        </button>
        <label htmlFor={id}>{label}</label>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  display: flex;

  button {
    order: 2;
    margin: 0.25rem;
    padding: 0.2rem 0.5rem;
    position: relative;
    font-size: 0.875rem;
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
