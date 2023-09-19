import { deleteById, fetchData, postData, updateById } from "@/utils"
import { useState, useEffect } from "react"

export default function useFetch(endipont: string, method: string = "GET", _data: any = null) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                let response;
                switch (method) {

                    case 'POST':
                        response = await postData(endipont, _data)

                    case 'PUT':
                        response = await updateById(endipont, _data)

                    case 'DELETE':
                        response = await deleteById(endipont)
                    default:
                        response = await fetchData(endipont)
                }

                setData(response)

            } catch (error: any) {
                setError(error)
            }
        }
        getData()

    }, [endipont,_data,method])




    return (
        {
            data,
            error
        }
    )
}
