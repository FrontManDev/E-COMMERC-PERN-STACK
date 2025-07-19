import axios from 'axios';
const AxiosInstance = axios.create({
    baseURL:"http://localhost:5000/api",
    withCredentials:true
});

AxiosInstance.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

AxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const res = await AxiosInstance.post("http://localhost:5000/api/refrech-token", {});

                const newAccessToken = res.data.accestoken;
                localStorage.setItem("token", newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return AxiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("Refresh token failed", refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default AxiosInstance;