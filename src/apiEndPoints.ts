import type {ProcessEndPointParams, ApiEndPoints} from "./types/funcs";

const apiEndPoints: ApiEndPoints = {
    auth : {
        'signup': {
            method: 'post',
            url: '/signup',
            withCredentials: true
        },
        'login': {
            method: 'post',
            url: '/login',
            //withCredentials: true
        },
        'logout': {
            method: 'get',
            url: '/logout',
            withCredentials: true
        },
        'getUserDetails': {
            method: 'get',
            url: '/get-user',
        },
    },
    class : {
        'create': {
            method: 'post',
            url: '/create-class',
        },
        'get': {
            baseURL: process.env.REACT_APP_BASE_URL,
            method: 'get',
            url: '/class/{slug}',
            /*urlParams: {
                slug: "physics-9th-std"
            }*/
        },
        'uploadCoverPhoto': {
            method: 'post',
            url: '/upload-cover-photo/{slug}',
        },
    }
};
export default apiEndPoints;
    
export const processEndPoint = (apiDetails: Record<string, any>, params: ProcessEndPointParams) => {
    
    apiDetails = {...apiDetails};
    //fallback
    if (params.method) {
        apiDetails.method = params.method;
    }
    if (params.url) {
        apiDetails.url = params.url;
    }

    //modify url as per params
    const url = apiDetails.url;
    if (url) {
        let newUrl = url;
        let pattern;
        params = {...apiDetails.urlParams, ...params};
        for (let key in params) {
            pattern = new RegExp('{' + key + '}', 'gi');
            newUrl = newUrl.replace(pattern, params[key as keyof typeof params]);
        }
        apiDetails.url = newUrl;
    }
    
    return apiDetails;

}