import React, { useCallback, useImperativeHandle, useMemo, useRef } from 'react'
import { TxNode } from './models/nodes/TxNode'
import { OutputNode } from './models/nodes/OutputNode'
import { AddressNode } from './models/nodes/AddressNode'
import { ClusterNode } from './models/nodes/ClusterNode'
import { LinkType, StringLink } from './models/links/StringLink'
import { NodeType, StringIdNode } from './models/nodes/Node'
import { useGraph } from '../hooks/useGraph'
import { BlockchainForceGraph } from './BlockchainForceGraph'
import { ForceGraphMethods } from 'react-force-graph-2d'

const DASHED_LINE: number[] = [4, 4]
const SOLID_LINE: [] = []

interface Props {
    transactionClicked?: (node: TxNode, event: MouseEvent) => any,
    outputClicked?: (node: OutputNode, event: MouseEvent) => any,
    addressClicked?: (node: AddressNode, event: MouseEvent) => any,
    clusterClicked?: (node: ClusterNode, event: MouseEvent) => any,
    onNodeContextMenu?: (e: { node: StringIdNode, mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent> }) => any
    width: number,
    height: number,
}

export const TransactionForceGraph = React.forwardRef<ForceGraphMethods | undefined, Props>(({
    transactionClicked,
    outputClicked,
    addressClicked,
    clusterClicked,
    onNodeContextMenu,
    width,
    height
}: Props, ref) => {

    const { graph } = useGraph()
    const dimensions = useMemo(() => {
        return { width: width, height: height }
    }, [width, height])


    const graph2 = useMemo(() => {
        const txs: StringIdNode[] = Array.from(graph.transactionsByTxid.values())
        const outs: StringIdNode[] = Array.from(graph.outputsByOutpoint.values())
        const addrs: StringIdNode[] = Array.from(graph.addressesById.values())
        const clusters: StringIdNode[] = Array.from(graph.clustersByClusterId.values())
        const nodes = txs.concat(outs, addrs, clusters)
        const links: StringLink[] = []
        nodes.forEach(node => {
            for (const link of node.outLinks()) {
                links.push(link)
            }
        })
        return { nodes: nodes, links: links }
    }, [graph])



    const handleClick = useCallback(async (node: StringIdNode, event: MouseEvent) => {
        if (event.button === 2) return
        switch (node.type) {
            case NodeType.Transaction:
                if (transactionClicked) await transactionClicked(node, event)
                break
            case NodeType.Output:
                if (outputClicked) await outputClicked(node, event)
                break
            case NodeType.Address:
                if (addressClicked) await addressClicked(node, event)
                break
            case NodeType.Cluster:
                if (clusterClicked) await clusterClicked(node, event)
                break
        }
    }, [transactionClicked, outputClicked, addressClicked, clusterClicked])

    const hoveredNode: React.MutableRefObject<StringIdNode | undefined> = useRef()

    const nodeHover = useCallback((node: StringIdNode | null, previousNode: StringIdNode | null) => {

        if (previousNode) {
            if (div2Ref.current) {
                div2Ref.current.style.cursor = "default"
            }
            previousNode.scale = 1
            for (const inLink of previousNode.inLinks()) {
                inLink.source.scale = 1
            }
            for (const outLink of previousNode.outLinks()) {
                outLink.target.scale = 1
            }
            hoveredNode.current = undefined
        }
        if (node) {
            if (div2Ref.current) {
                div2Ref.current.style.cursor = "context-menu"
            }
            node.scale = 1.5
            for (const inLink of node.inLinks()) {
                inLink.source.scale = 1.5
            }
            for (const outLink of node.outLinks()) {
                outLink.target.scale = 1.5
            }
            hoveredNode.current = node
        }
    }, [])

    const nodePaint = useCallback((node: StringIdNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
        if (node.x === undefined || node.y === undefined) {
            return
        }

        switch (node.type) {
            case NodeType.Transaction:
                const coinbase = node.coinbase//(node.spent_outputs.length === 0 && node.outputs.length > 0);
                ctx.fillStyle = "cyan"
                ctx.beginPath()
                ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
                ctx.fill()
                if (coinbase) {
                    ctx.strokeStyle = "steelblue"
                    ctx.lineWidth = 2
                    ctx.stroke()
                }
                break
            case NodeType.Output:
                const utxo = node.spending_txid === null
                ctx.beginPath()
                ctx.fillStyle = "yellow"
                ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
                ctx.fill()
                if (utxo) {
                    ctx.strokeStyle = "steelblue"
                    ctx.lineWidth = 2
                    ctx.stroke()
                }
                break
            case NodeType.Address:
                ctx.fillStyle = "lime"
                ctx.beginPath()
                ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
                ctx.fill()
                break
            case NodeType.Cluster:
                ctx.fillStyle = "blue"
                ctx.beginPath()
                ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
                ctx.fill()
                break
        }
    }, [])

    const nodePointerAreaPaint = useCallback((node: StringIdNode, paintColor: string, ctx: CanvasRenderingContext2D, globalScale: number) => {
        if (node.x === undefined || node.y === undefined) return

        ctx.fillStyle = paintColor
        ctx.beginPath(); ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false); ctx.fill() // circle
    }, [])

    const nodeLabel = useCallback((node: StringIdNode): string => {
        switch (node.type) {
            case NodeType.Transaction:
                const coinbase = node.coinbase//(node.spent_outputs.length === 0 && node.outputs.length > 0);
                if (coinbase) {
                    return "Coinbase Transaction <br/>" + node.id
                } else {
                    return "Transaction <br/>" + node.id
                }
            case NodeType.Output:
                const utxo = node.spending_txid === null
                if (utxo) {
                    return "Unspent Output <br/>" + node.value
                } else {
                    return "Output <br/>" + node.value
                }
            case NodeType.Address:
                return "Address <br/>" + node.address
            case NodeType.Cluster:
                return "Cluster <br/>" + node.clusterId
        }
    }, [])

    const particleCount = useCallback((link: StringLink): number => {
        let value
        switch (link.type) {
            case LinkType.InputLink:
                value = link.source.value
                break
            case LinkType.OutputLink:
                value = link.target.value
                break
            default:
                return 0
        }
        if (value < 1000) return 1
        else if (value < 10000) return 2
        else return 3
    }, [])

    const particleSpeed = useCallback((link: StringLink): number => {
        if (link.source.x === undefined || link.source.y === undefined) return 0
        if (link.target.x === undefined || link.target.y === undefined) return 0
        let length = Math.hypot(link.source.x - link.target.x, link.source.y - link.target.y)
        if (length < 100) length = 100
        switch (link.type) {
            case LinkType.InputLink:
                return Math.min(Math.log2(1.01 + link.source.value), 6) / length
            case LinkType.OutputLink:
                return Math.min(Math.log2(1.01 + link.target.value), 6) / length
            default:
                return 0
        }
    }, [])

    const particleWidth = useCallback((link: StringLink): number => {
        switch (link.type) {
            case LinkType.InputLink:
                return Math.max(Math.ceil(Math.log(link.source.value)), 3)//Doubling value results in 1 more particle
            case LinkType.OutputLink:
                return Math.max(Math.ceil(Math.log(link.target.value)), 3)
            default:
                return 0
        }
    }, [])

    const dagFilter = useCallback((node: StringIdNode): boolean => {
        switch (node.type) {
            case NodeType.Transaction:
            case NodeType.Output:
                return true
            default:
                return false
        }
    }, [])


    const arrowLength = useCallback((link: StringLink): number => {
        if (link.source instanceof AddressNode || link.target instanceof AddressNode) {
            return 0
        } else {
            return 5.5
        }
    }, [])

    const linkColor = useCallback((link: StringLink) => {
        switch (link.type) {
            case LinkType.AddressLink:
            case LinkType.ClusterLink:
                return "grey"
            case LinkType.OutputLink:
                return "red"
            case LinkType.InputLink:
                return "green"
        }
    }, [])

    const linkWidth = useCallback((link: StringLink) => {
        if (link.source.scale > 1 && link.target.scale > 1) {
            return 2
        } else {
            return 1
        }
    }, [])

    const linkDash = useCallback((link: StringLink) => {
        switch (link.type) {
            case LinkType.AddressLink:
            case LinkType.ClusterLink:
                return DASHED_LINE
            case LinkType.OutputLink:
            case LinkType.InputLink:
                return SOLID_LINE
        }
    }, [])
    const div2Ref: React.RefObject<HTMLDivElement> = useRef(null)

    const onContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (div2Ref.current) {
            div2Ref.current.style.cursor = "default"
        }
        e.preventDefault()
        if (hoveredNode.current) {
            if (onNodeContextMenu) {
                onNodeContextMenu({ node: hoveredNode.current, mouseEvent: e })
            }
        }
    }, [onNodeContextMenu])

    const fgRef: React.MutableRefObject<ForceGraphMethods | undefined> = useRef()

    useImperativeHandle(ref, () => {
        return fgRef.current
    })

    return <div
        ref={div2Ref}
        onContextMenu={onContextMenu}>
        <BlockchainForceGraph
            onNodeClick={handleClick}
            width={dimensions.width}
            height={dimensions.height}
            onNodeRightClick={handleClick}
            onNodeHover={nodeHover}
            graphData={graph2}
            nodeCanvasObject={nodePaint}
            nodePointerAreaPaint={nodePointerAreaPaint}
            nodeLabel={nodeLabel}
            linkDirectionalArrowLength={arrowLength}
            linkDirectionalParticles={particleCount}
            linkDirectionalParticleSpeed={particleSpeed}
            dagNodeFilter={dagFilter}
            linkColor={linkColor}
            linkDirectionalParticleWidth={particleWidth}
            linkWidth={linkWidth}
            linkLineDash={linkDash}
            ref={fgRef}
        />
    </div>
})