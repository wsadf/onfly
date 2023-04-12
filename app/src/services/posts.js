import useApi from "@/composables/UseApi";

export default function postsService () {
    const {list, post, update, remove, getById, search,pagination} = useApi('users')

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