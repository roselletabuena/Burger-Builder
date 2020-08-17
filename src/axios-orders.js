import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-a73bf.firebaseio.com/'
})

export default instance