import { useState, useEffect } from "react"

const BASE_URL = ""
const headers = {
    "Content-Type": "application/json"
}

export function useFetch(endipont:string) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function getData() {
            try {
                let fetchedData = await (await fetch(endipont, { headers })).json()
                setData(fetchedData)

            } catch (error:any) {
                setError(error)
            }
        }
        getData()

    }, [endipont])




    return (
        {
            data,
            error
        }
    )
}
