import api from '@/services/api';

export default function useApi(url) {

    const list = async () => {
        try {
            const { data } = await api.get(url)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const search = async (value) => {
        try {
            const { data } = await api.get(`${url}?name=${value}`)
            console.log(data)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }    

    const pagination = async (page) => {
        try {
            const { data } = await api.get(`${url}?page=${page.value}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    } 

    const getById = async (id) => {
        try {
            const { data } = await api.get(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const post = async (form) => {
        try {
            const { data } = await api.post(url, form)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const update = async (form) => {
        try {
            const { data } = await api.put(`${url}/${form.id}`, form)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    const remove = async (id) => {
        try {
            const { data } = await api.delete(`${url}/${id}`)
            return data
        } catch (error) {
            throw new Error(error)
        }
    }

    return {
        list,
        post,
        update,
        remove,
        getById,
        search,
        pagination
    }
}