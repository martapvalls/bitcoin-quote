import axios from 'axios'

const setCriptoValue = async (criptocoin, coin) => {
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptocoin}&tsyms=${coin}`

    const response = await axios.get(url)
    const result = response.data.DISPLAY[criptocoin][coin]

    return result
}

export default setCriptoValue