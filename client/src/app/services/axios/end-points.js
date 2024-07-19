import { toast } from "sonner"
import axiosInstance from "./Axios-instance"



export const getAllDoctors=async()=>{
    try {
        const response= await axiosInstance.get('user/get-doctors')
        
        if(response?.data?.success){
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}
export const getPatient=async(id)=>{
    try {
        console.log(id,)
        const response= await axiosInstance.get(`user/get-patient/${id}`)
        console.log(response)
        if(response?.data?.success){
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}
export const getDoctor=async(id)=>{
    try {
        console.log(id,"--------")
        const response= await axiosInstance.get(`user/get-doctor/${id}`)
        console.log(response)
        if(response?.data?.success){
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}

export const getAllPatients=async()=>{
    try {
        const response= await axiosInstance.get(`doc/get-patients`)
        console.log(response)
        if(response?.data?.success){
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}

export const uploadFile=async(id,data)=>{
    try {
        console.log(id,data,"--------")
        const response= await axiosInstance.post(`doc/upload/${id}`,data)
        console.log(response)
        if(response?.data?.success){
            toast.success(response?.data?.message)
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}


export const linkPatient=async(data)=>{
    try {

        const response= await axiosInstance.post(`doc/link-patient`,data)
        console.log(response)
        if(response?.data?.success){
            toast.success(response?.data?.message)
            return response?.data
        }else{
            toast.error(response?.data?.message)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response?.data?.message || error.message ||"en unknown error occurred")
    }
}