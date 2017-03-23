import { API_ENDPOINT } from '../constants';

export const FETCH_REQUEST = async (ENDPOINT, method, body) => {
    try {
        let FETCH = async () => {
            let request = await fetch(API_ENDPOINT.concat(ENDPOINT));
            if (method || method && body) {
                if (!body) body = {};
                request = await fetch(API_ENDPOINT.concat(ENDPOINT), {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: method,
                    body: JSON.stringify(body)
                });
            }

            return request;
        };

        return FETCH()
            .then(data => data.json());
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default { FETCH_REQUEST };
