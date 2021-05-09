import { memo, useCallback, useMemo, useRef } from 'react'
import { TxNode } from './models/nodes/TxNode'
import { OutputNode } from './models/nodes/OutputNode'
import { AddressNode } from './models/nodes/AddressNode'
import { ClusterNode } from './models/nodes/ClusterNode'
import { StringLink } from './models/links/StringLink'
import { StringIdNode } from './models/nodes/Node'
import { OutputLink } from './models/links/OutputLink'
import { InputLink } from './models/links/InputLink'
import { useGraph } from '../hooks/useGraph'
import { BlockchainForceGraph } from './BlockchainForceGraph'

const DASHED_LINE: number[] = [4, 4]
const SOLID_LINE: [] = []

interface Props {
    transactionClicked?: (node: TxNode, event: MouseEvent) => any,
    outputClicked?: (node: OutputNode, event: MouseEvent) => any,
    addressClicked?: (node: AddressNode, event: MouseEvent) => any,
    clusterClicked?: (node: ClusterNode, event: MouseEvent) => any,
    onNodeContextMenu?: (e: { node: StringIdNode, mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent> }) => any
    width: number,
    height: number
}

function TransactionForceGraph({
    transactionClicked,
    outputClicked,
    addressClicked,
    clusterClicked,
    onNodeContextMenu,
    width,
    height
}: Props
) {

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
        if (node instanceof TxNode) {
            if (transactionClicked) await transactionClicked(node, event)
        } else if (node instanceof OutputNode) {
            if (outputClicked) await outputClicked(node, event)
        } else if (node instanceof AddressNode) {
            if (addressClicked) await addressClicked(node, event)
        } else if (node instanceof ClusterNode) {
            if (clusterClicked) await clusterClicked(node, event)
        }
    }, [transactionClicked, outputClicked, addressClicked, clusterClicked])


    const hoveredNode: React.MutableRefObject<StringIdNode | undefined> = useRef()
    //const [hoveredNode, setHoveredNode] = useState<StringIdNode>();

    const nodeHover = useCallback((node: StringIdNode | null, previousNode: StringIdNode | null) => {
        if (previousNode) {
            switch (previousNode.type) {
                case "address":
                    break
                case "cluster":
                    break
                case "output":
                    break
                case "transaction":
                    break
                default: throw new Error("wololo")
            }
        }


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
            //previousNode.fx = previousNode.fy = undefined;
            hoveredNode.current = undefined
            //setHoveredNode(undefined);
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
        if (node instanceof TxNode) {
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
        } else if (node instanceof OutputNode) {
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
        } else if (node instanceof AddressNode) {
            ctx.fillStyle = "lime"
            ctx.beginPath()
            ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
            ctx.fill()
        } else if (node instanceof ClusterNode) {
            ctx.fillStyle = "blue"
            ctx.beginPath()
            ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false)
            ctx.fill()
        }
    }, [])

    const nodePointerAreaPaint = useCallback((node: StringIdNode, paintColor: string, ctx: CanvasRenderingContext2D, globalScale: number) => {
        if (node.x === undefined || node.y === undefined) return

        ctx.fillStyle = paintColor
        ctx.beginPath(); ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false); ctx.fill() // circle
    }, [])

    const nodeLabel = useCallback((node: StringIdNode): string => {
        if (node instanceof TxNode) {
            const coinbase = node.coinbase//(node.spent_outputs.length === 0 && node.outputs.length > 0);
            if (coinbase) {
                return "Coinbase Transaction <br/>" + node.id
            } else {
                return "Transaction <br/>" + node.id
            }
        } else if (node instanceof OutputNode) {
            const utxo = node.spending_txid === null
            if (utxo) {
                return "Unspent Output <br/>" + node.value
            } else {
                return "Output <br/>" + node.value
            }
        } if (node instanceof AddressNode) {
            return "Address <br/>" + node.address
        } if (node instanceof ClusterNode) {
            return "Cluster <br/>" + node.clusterId
        } else {
            return ""
        }
    }, [])

    const particleCount = useCallback((link: StringLink): number => {
        let value
        if (link instanceof InputLink) {
            value = link.source.value
        } else if (link instanceof OutputLink) {
            value = link.target.value
        }
        if (value === undefined) return 0
        else if (value < 1000) return 1
        else if (value < 10000) return 2
        else return 3
    }, [])

    const particleSpeed = useCallback((link: StringLink): number => {
        if (link.source.x === undefined || link.source.y === undefined) return 0
        if (link.target.x === undefined || link.target.y === undefined) return 0
        let length = Math.hypot(link.source.x - link.target.x, link.source.y - link.target.y)
        if (length < 100) length = 100

        if (link instanceof InputLink) {
            return Math.min(Math.log2(1.01 + link.source.value), 6) / length
        } else if (link instanceof OutputLink) {
            return Math.min(Math.log2(1.01 + link.target.value), 6) / length
        } else {
            return 0
        }
    }, [])

    const particleWidth = useCallback((link: StringLink): number => {
        if (link.source instanceof OutputNode && link.target instanceof TxNode) {

            return Math.max(Math.ceil(Math.log(link.source.value)), 3)//Doubling value results in 1 more particle
        } else if (link.target instanceof OutputNode && link.source instanceof TxNode) {
            return Math.max(Math.ceil(Math.log(link.target.value)), 3)
        } else {
            return 0
        }
    }, [])

    const dagFilter = useCallback((node: StringIdNode): boolean => {
        return (node instanceof TxNode || node instanceof OutputNode)
    }, [])


    const arrowLength = useCallback((link: StringLink): number => {
        if (link.source instanceof AddressNode || link.target instanceof AddressNode) {
            return 0
        } else {
            return 5.5
        }
    }, [])

    const linkColor = useCallback((link: StringLink) => {
        if (link.source instanceof AddressNode) {
            return "grey"
        } else if (link.target instanceof AddressNode) {
            return "grey"
        } else if (link.source instanceof TxNode) {
            return "red"
        } else if (link.target instanceof TxNode) {
            return "green"
        } else {
            return "black"
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
        if (link.source instanceof AddressNode) {
            return DASHED_LINE
        } else if (link.target instanceof AddressNode) {
            return DASHED_LINE
        } else if (link.source instanceof TxNode) {
            return SOLID_LINE
        } else if (link.target instanceof TxNode) {
            return SOLID_LINE
        } else {
            return SOLID_LINE
        }
    }, [])
    const div2Ref: React.RefObject<HTMLDivElement> = useRef(null)

    //const [contextMenuNode, setContextMenuNode] = useState<StringIdNode>();

    const onContextMenu = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (div2Ref.current) {
            div2Ref.current.style.cursor = "default"
        }
        e.preventDefault()
        if (hoveredNode.current) {
            if (onNodeContextMenu) {
                onNodeContextMenu({ node: hoveredNode.current, mouseEvent: e })
                //setContextMenuNode(hoveredNode.current);
            }
        }
    }, [onNodeContextMenu])

    return <div
        //style={{ height: "100%", width: "100%" }}
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
        //reff={fgRef}
        />
    </div>
}


export default memo(TransactionForceGraph)
