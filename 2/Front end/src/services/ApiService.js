import axios from 'axios';
import localStorageService from './localStorageService';
import fileDownload from 'js-file-download'

// import qs from 'qs';
const baseUrl = 'http://localhost:28080';

export const signup = async (data) => {
    let res = await axios({
        method: 'POST',
        url: baseUrl + "/addUser/",
        data:data
    })
    return res
}



export const getAuthonticated = async (user, password) => {
 
    let res = await axios({
        method: 'get',
        url: baseUrl + "/me",
        auth: {
            username: user,
            password: password
        }
    })
    
    return res
}

export const getFolders = async () => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'get',
        url: baseUrl + `/folders/parent/${user.id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const createFolder = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'POST',
        url: baseUrl + "/folders/creeRepo",
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const uploadDocs = async (file,id) =>{
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    const formData = new FormData();
    formData.append("files", file); 
    formData.append("idRep", id);
    formData.append("idUser", user.id);

    let res= axios.post(baseUrl+ "/doc/uploadFiles",
        formData,
            {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            auth: {
                username: userName,
                password: password
            }
            }
        
        )
    return res;
}



export const handleDocDownload = (id,filename) => {
    const userName=localStorageService.getItem("username");
const password=localStorageService.getItem("password");

    axios.get(baseUrl + `/doc/downloadFile/${id}`, {
      responseType: 'blob',
      auth: {
        username: userName,
        password: password
    }
    })
    .then((res) => {
      fileDownload(res.data, filename)
    })
}


export const updateFolderName = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'PUT',
        url: baseUrl + `/folders/updateName/${data.id}`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const updateDocsName = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'PUT',
        url: baseUrl + `/doc/updateName/${data.idDoc}`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const updateDocsPath = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'PUT',
        url: baseUrl + `/doc/updatePath/${data.path}/${data.idDoc}`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const deleteDoc = async (id) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'DELETE',
        url: baseUrl + `/doc/deleteDoc/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const deleteFolder = async (id) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    let res = await axios({
        method: 'DELETE',
        url: baseUrl + `/folders/deleteRepo/${id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getHistory = async () => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'get',
        url: baseUrl + `/history/${user.id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getProfile = async () => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'get',
        url: baseUrl + `/${user.id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const getAddress = async () => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'get',
        url: baseUrl + `/AdresseUser/${user.id}`,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const updateUser = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'put',
        url: baseUrl + `/updateUser/`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const updatePassword = async (data) => {

    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    var bodyFormData = new FormData();
    bodyFormData.append('password', data); 

    let res = await axios({
        method: 'put',
        url: baseUrl + `/updatePasswordUser/${user.id}`,
        data:bodyFormData,
        auth: {
            username: userName,
            password: password
        }
    })
    return res

}

export const updateAddress = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'put',
        url: baseUrl + `/updateAdresse`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}

export const addAddress = async (data) => {
    const userName=localStorageService.getItem("username");
    const password=localStorageService.getItem("password");
    const user=localStorageService.getItem("user");
    let res = await axios({
        method: 'POST',
        url: baseUrl + `/addAddres`,
        data:data,
        auth: {
            username: userName,
            password: password
        }
    })
    return res
}
// ====================================================================================================


