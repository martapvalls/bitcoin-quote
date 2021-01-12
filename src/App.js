import React, {useState, useEffect} from 'react'
import styled from '@emotion/styled'
import img from './cryptomonedas.png'
import Form from './components/Form'
import Quote from './components/Quote'
import Spinner from './components/Spinner'
import setCriptoValue from './logic/setCriptoValue'

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns:  repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Img = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {
  const [ coin, setCoin ] = useState('')
  const [ criptocoin, setCriptocoin ] = useState('')
  const [ result, setResult ] = useState({})
  const [ loading, setLoading ] = useState(false)


  useEffect(() => {
    const getCriptoValue = async () => {
      //avoid first call
      if(coin === '') return
      //api call
      
      const response = await setCriptoValue(criptocoin, coin)

      //set spinner
      setLoading(true)


      setTimeout(() => {

        //change loading to false
        setLoading(false)

        //save quote result
        setResult(response)

      }, 3000)
    }
    getCriptoValue()

  }, [coin, criptocoin])


  return (
    <Container>
      <div>
        <Img 
          src={img}
          alt='cripto image'
        />
      </div>
      <div>
        <Heading> Instant Coin Quote </Heading>

        <Form 
          setCoin={setCoin}
          setCriptocoin={setCriptocoin}
        />
        {Object.keys(result).length > 0 && !loading && <Quote result={result} />}
        {loading && <Spinner />}
      </div>
    </Container>
  );
}

export default App;
