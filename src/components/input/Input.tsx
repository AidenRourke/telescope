import React, { FC, HTMLProps } from 'react';
import styled from 'styled-components';
import { white } from 'styles/colors';

interface InputProps extends HTMLProps<HTMLInputElement> {}

const InputBase = styled.input<InputProps>`
    background: none;
    border: 3px solid ${white};
    width: 50%;
    padding: 1rem;
    color: ${white};
    font-size: 1rem;
    font-family: inherit;
`;

const Input: FC<InputProps> = ({ placeholder, className }) => {
    return <InputBase placeholder={placeholder} className={className}/>;
};

export { Input };
