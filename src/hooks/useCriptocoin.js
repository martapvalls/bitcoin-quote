import React,  { Fragment, useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
    font-family: 'Bebas Neue', cursive;
    color: #FFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`
const SelectCoins = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
`

const useCriptocoin = (label, initalState, options) => {
    //State of the hook
    const [state, updateState] = useState(initalState)

    const SelectCripto = () => (
        <Fragment>
            <Label> {label} </Label>
            <SelectCoins
                onChange= { e => updateState(e.target.value)}
                value={state}
            >
                <option value="">Choose</option>
                {options.map(option => (
                    <option key={option.CoinInfo.Id} value={option.CoinInfo.Name}>{option.CoinInfo.FullName}</option>
                ))}
            </SelectCoins>
        </Fragment>
    );
        // return of state, interface and function to modify the state
    return [state, SelectCripto, updateState]
}

export default useCriptocoin;