import axios from 'axios';

export default axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'http://3.73.75.89',
});
