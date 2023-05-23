import axios from 'axios'

const customAxios = axios.create({
    baseURL:  'http://halcyon-pms-web.test'
});

export default customAxios
