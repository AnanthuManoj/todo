import { BaseUrl } from "./baseUrl"
import { commonAPI } from "./commonApi"

export const addTodoApi = async(reqBody)=>{
   return await commonAPI("POST",`${BaseUrl}/todos/add`,reqBody,'')
}

export const getTodosApi = async(searchKey)=>{
    return await commonAPI("GET",`${BaseUrl}/todos/userTodo?search=${searchKey}`)
}
export const getUserTodosApi = async(email)=>{
    return await commonAPI("GET",`${BaseUrl}/todos/${email}`)
}

export const addFavTodoApi = async(reqBody)=>{
    return await commonAPI("POST",`${BaseUrl}/todos/fav`,reqBody,'')
}
export const addDeleTodoApi = async(reqBody)=>{
    return await commonAPI("POST",`${BaseUrl}/todos/del`,reqBody,'')
}
export const addCompletedTodoApi = async(reqBody)=>{
    return await commonAPI("POST",`${BaseUrl}/todos/completed`,reqBody,'')
}

export const delTodoApi = async(id)=>{
    return await commonAPI("DELETE",`${BaseUrl}/todos/${id}`)
}

export const getFavTodoApi = async(email)=>{
    return await commonAPI("GET",`${BaseUrl}/todos/fav/get/${email}`)
}
export const getDelTodoApi = async(email)=>{
    return await commonAPI("GET",`${BaseUrl}/todos/del/get/${email}`)
}
export const getCompletedTodoApi = async(email)=>{
    return await commonAPI("GET",`${BaseUrl}/todos/completedTodo/get/${email}`)
}
export const deleteAllTodoApi = async(email)=>{
    return await commonAPI("DELETE",`${BaseUrl}/todos/delete/${email}`)
}
