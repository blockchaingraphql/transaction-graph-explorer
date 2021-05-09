import { useContext } from 'react'
import { GraphContext } from './useGraphReducer'

export function useGraph() {
    const graphContext = useContext(GraphContext)
    if (!graphContext) throw new Error("Graph not provided!")
    return graphContext
}