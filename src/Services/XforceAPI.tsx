import axios from 'axios';

const DIAGNOSTIC_API_BASE_URL = 'https://api.infermedica.com/covid19/diagnosis';
const RESULT_API_BASE_URL = 'https://api.infermedica.com/covid19/triage';
const RISK_FACTORS_API_BASE_URL = 'https://api.infermedica.com/covid19/risk_factors';
const SYMPTOMS_FACTORS_API_BASE_URL = 'https://api.infermedica.com/covid19/symptoms';
const EMERGENCY_NUMBERS_API_BASE_URL = 'http://elmer.southcentralus.cloudapp.azure.com:3700/api/emergencias';
const BOLIVIA_STATISTICS_BASE_URL = 'https://api.github.com/repos/help-covid-bolivia/data-covid-bolivia/contents/data/boliviaStatistics.json';
const GIT_API_QUERY_LIMIT = 'https://api.github.com/rate_limit';
const applicationId = process.env.REACT_APP_ID;
const applicationKey = process.env.REACT_APP_APPID;
const thisIsATest = "V1ZSTk1rNTZVbXhhVkU1cFRWZEpNbHBFV1RSWlZHUnFUV3BLYlZsdFNYaE5SRUUxVGtSQ2FrNXFRbTFQUjBwb1dUSlZlbGxuUFQwPQ==";
const headers = {
    "App-Id" : applicationId,
    "App-Key" : applicationKey,
    "Content-Type" :"application/json",
    "Model" : "infermedica-es-xl"
};

const headerOwn = {
    "Content-Type" :"application/json",
};

const headerGitAPi = {
    "Authorization": "token " + atob(atob(atob(thisIsATest))),
    "Accept": "application/vnd.github.v3+json",
    "User-Agent": "help-covid-bolivia"
};

const headerGitAPiLimit = {
    "Authorization": "token " + atob(atob(atob(thisIsATest)))
};

class ApiService {

    fetchUsers() {
        return axios.get(DIAGNOSTIC_API_BASE_URL);
    }

    fetchUserById(userId: string) {
        return axios.get(DIAGNOSTIC_API_BASE_URL + '/' + userId);
    }

    deleteUser(userId: string) {
        return axios.delete(DIAGNOSTIC_API_BASE_URL + '/' + userId);
    }

    addUser(user: any) {
        return axios.post(""+DIAGNOSTIC_API_BASE_URL, user);
    }

    getQuestion(data: any) {
        return axios.post(DIAGNOSTIC_API_BASE_URL, data, {headers: headers});
    }

    getEndResult(data: any) {
        return axios.post(RESULT_API_BASE_URL, data, {headers: headers});
    }

    editUser(user: any) {
        return axios.put(DIAGNOSTIC_API_BASE_URL + '/' + user.id, user);
    }

    getRiskFactors = () => {
        return axios.get(RISK_FACTORS_API_BASE_URL, {headers: headers});
    }

    getAllSymptoms = () => {
        return axios.get(SYMPTOMS_FACTORS_API_BASE_URL, {headers: headers});
    }

    getEmergencyNumbers = () => {
        return axios.get(EMERGENCY_NUMBERS_API_BASE_URL, {headers: headerOwn});
    }

    getBoliviaStatistics = () => {
        return axios.get(BOLIVIA_STATISTICS_BASE_URL, {headers: headerGitAPi});
    }

    getQueryLimit = () => {
        return axios.get(GIT_API_QUERY_LIMIT, {headers: headerGitAPiLimit});
    }
}

export default new ApiService();