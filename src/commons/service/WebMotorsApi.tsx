import axios from "axios";
import { CardComponentModel } from "../../models/CardComponentModel";
import { SelectComponentModel } from "../../models/SelectComponentModel";

axios.interceptors.response.use(response => response.data);

function useWebMotorsApi() {

    axios.interceptors.request.use(function (config) {

        // spinning start to show
        // UPDATE: Add this code to show global loading indicator
        document.body.classList.add('loading-indicator');

        return config
    }, function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use(function (response) {

        // spinning hide
        // UPDATE: Add this code to hide global loading indicator
        document.body.classList.remove('loading-indicator');

        return response;
    }, function (error) {
        return Promise.reject(error);
    });

    const getMake = (): Promise<SelectComponentModel[]> => {
        return axios.get('/api/OnlineChallenge/Make');
    }

    const getModel = (makeId: number): Promise<SelectComponentModel[]> => {
        return axios.get('/api/OnlineChallenge/Model', { params: { MakeID: makeId } });
    }

    const getVersion = (modelId: number): Promise<SelectComponentModel[]> => {
        return axios.get('/api/OnlineChallenge/Version', { params: { ModelID: modelId } });
    }

    const getVehicles = (page: number): Promise<CardComponentModel[]> => {
        return axios.get('/api/OnlineChallenge/Vehicles', { params: { Page: page } });
    }

    return {
        getMake: getMake,
        getModel: getModel,
        getVersion: getVersion,
        getVehicles: getVehicles
    }
}

export { useWebMotorsApi }