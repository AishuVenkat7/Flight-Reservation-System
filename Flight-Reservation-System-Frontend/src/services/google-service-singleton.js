import {GOOGLE_USER_INFO_URL, LOCAL_BACKEND_BASE_URL} from "../constants";
import axios from 'axios';

export default class GoogleServiceSingleton {
    static getUserInfo = (access_token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        };
        // https://any-api.com/googleapis_com/oauth2/docs/userinfo/oauth2_userinfo_v2_me_get
        return axios.get(GOOGLE_USER_INFO_URL, config)
            .then(firstResponse => {
                const googleResponse = firstResponse.data;
                const savePassengerURL = LOCAL_BACKEND_BASE_URL + 'passenger/savePassenger';
                const savePassengerRequest = {
                    emailId: googleResponse.email,
                    admin: 0,
                    firstName: googleResponse.given_name,
                    lastName: googleResponse.family_name,
                    phoneNumber: 1234567890,
                }
                return axios.post(savePassengerURL, savePassengerRequest)
                    .then((secondResponse) => {
                        if (!secondResponse) {
                            throw new Error('Backend response undefined');
                        }
                            return {
                                ...googleResponse,
                                userId: secondResponse.data.userId,
                                admin: secondResponse.data.admin,
                            };
                        }
                    )
                    .catch(error => {
                        console.log("Error in Backend call, setting userId as null", error);
                        return {
                            ...googleResponse,
                            userId: null,
                            admin: 0,
                        }
                    })
            })
            .catch(error => {
                console.log("Error in Google Oauth call", error);
            });
    }
}