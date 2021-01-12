import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useCoin from '../hooks/useCoin'
import useCriptocoin from '../hooks/useCriptocoin'
import Error from './Error'
import getCriptoCoin from '../logic/getCriptoCoin'

const Button = styled.input`
    margin-top: 20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover {
        background-color: #326AC0;
        cursor: pointer;
    }
`

const Form = ({ setCoin, setCriptocoin }) => {

    //state 
    const [ criptolist, setCripto ] = useState([])
    const [ error, setError ] = useState(false)

    const COINS = [
        {code: 'USD', name: 'U.S. Dollar'},
        {code: 'MXN', name: 'Mexican Peso'},
        {code: 'EUR', name: 'Euro'},
        {code: 'GBP', name: 'Pound Sterling'}
    ]
    //Custom hook useCoin
    const [coin, CoinSelect] = useCoin('Choose your coin', '', COINS)
    const [ criptocoin, CriptoSelect] = useCriptocoin('Choose your criptocoin', '', criptolist)

    // call the API

    useEffect(() => {
        const callAPI = async () => {
    
            const response = await getCriptoCoin()
            setCripto(response)
        }
        callAPI()
    }, [])
    //on submit

    const quoteCurrency = e => {
        e.preventDefault()

        //no empty fields
        if(coin === '' || criptocoin === ''){
            setError(true)
            return
        }
        //get data to principal component
        setError(false)

        setCoin(coin)
        setCriptocoin(criptocoin)
    }

    return ( 
        <form
            onSubmit={quoteCurrency}
        >
            {error && <Error msg="All fields are required"/>}
            <CoinSelect />
            <CriptoSelect />
            <Button 
                type="submit"
                value="calculate"
            />
        </form>
    );
}
 
export default Form;