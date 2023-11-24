const get = (url, options) => {
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        switch (response.status) {
            case 200:
                return response.json();
            default:
                throw new Error(
                    JSON.stringify({
                        statusCode: response.status,
                        errorMessage: "Unable to fetch data"
                    })
                );
        }
    })
        .catch((error) => {
            // Handle errors here
            console.error("Error during GET request:", error);
            // TODO: Remove this as after Backend integration
            return undefined;
            throw error; // Rethrow the error to propagate it further if needed
        });
};

export {get};
