import API from "./API";


class BackendService {
    static async postLogin(user){
        const response=await API().post("/login",user);
        console.log(response);
        return response.data;
    }
}


export default BackendService;