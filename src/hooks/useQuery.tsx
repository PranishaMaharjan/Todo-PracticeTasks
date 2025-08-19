import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useQuery = (asyncFn: () => Promise<any>, dependencies: unknown[] = []) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [isError, setIsError] = React.useState(false)
    const [data, setData] = React.useState<unknown | null>(null)
    const [error, setError] = React.useState<unknown | null>(null)

    const asyncFunction = async () => {
        setIsLoading(true)
        try {
            const response = await asyncFn();
            setData(response)
        }
        catch (err) {
            setIsError(true)
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }
    React.useEffect(() => {
        asyncFunction()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies])
    return ({
        isError,
        isLoading,
        data,
        error
    }
    )
}

export default useQuery