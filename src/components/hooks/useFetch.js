export default function useFetch(baseUrl) {
    const get = async (url) => {
         const response = await fetch(baseUrl + url)
        return await response.json()
    }

    async function post(url, body){
       const response = await fetch(baseUrl + url, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        return await response.json();
    }

    return { get, post };

};