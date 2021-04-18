import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import ForceGraph2D, { NodeObject, LinkObject, ForceGraphMethods } from 'react-force-graph-2d'
import * as Immutable from 'immutable'
import { forceCollide } from 'd3-force'
import { TxNode } from './models/TxNode'
import { OutputNode } from './models/OutputNode'
import { AddressNode } from './models/AddressNode'
import { ClusterNode } from './models/ClusterNode'
import { StringLink } from './models/StringLink'
import { StringIdNode } from './models/StringIdNode'
import { OutputLink } from './models/OutputLink'
import { InputLink } from './models/InputLink'

const DASHED_LINE: number[] = [4, 4]
const SOLID_LINE: [] = []

function TransactionForceGraph({
    transactionsByTxid,
    outputsByOutpoint,
    addressesById,
    clustersById,
    transactionClicked,
    outputClicked,
    addressClicked,
    clusterClicked,
    onNodeContextMenu,
    width,
    height
}: {
    transactionsByTxid: Immutable.Map<string, TxNode>,
    outputsByOutpoint: Immutable.Map<string, OutputNode>,
    addressesById: Immutable.Map<string, AddressNode>,
    clustersById: Immutable.Map<string, ClusterNode>,
    transactionClicked?: (node: TxNode, event: MouseEvent) => any,
    outputClicked?: (node: OutputNode, event: MouseEvent) => any,
    addressClicked?: (node: AddressNode, event: MouseEvent) => any,
    clusterClicked?: (node: ClusterNode, event: MouseEvent) => any,
    onNodeContextMenu?: (e: { node: StringIdNode, mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent> }) => any
    width: number,
    height: number
}
) {

    const dimensions = useMemo(() => {
        return { width: width, height: height }
    }, [width, height])



    /*const txLinks = useMemo(() => {
        const txLinks: StringLink[] = []
        outputsByOutpoint.forEach((output) => {
            const sourceTx = transactionsByTxid.get(output.txid)
            if (sourceTx) {
                txLinks.push(new OutputLink({ source: sourceTx, target: output }))
            }
            if (output.spending_txid) {
                const targetTx = transactionsByTxid.get(output.spending_txid)
                if (targetTx) {
                    txLinks.push(new InputLink({ source: output, target: targetTx }))
                }
            }
        })
        return txLinks
    }, [outputsByOutpoint, transactionsByTxid])*/

    const links = useMemo(() => {
        const result: StringLink[] = []
        outputsByOutpoint
            .filter(output => output.address)
            .groupBy(output => output.address!.clusterId)
            .forEach((outputs, clusterId) => {
                let cn = new ClusterNode(clusterId)
                if (clustersById.has(cn.id)) {
                    cn = clustersById.get(cn.id)!
                }
                outputs
                    .groupBy(output => output.address!.address)
                    .forEach((outputs, address) => {
                        let an = addressesById.get(address)
                        if (an === undefined) {
                            an = new AddressNode(address, clusterId)
                        }
                        result.push(new StringLink({ source: an, target: cn }))
                        outputs.forEach(output => {
                            result.push(new StringLink({ source: output, target: an! }))
                        })
                    })
            })
        outputsByOutpoint
            .forEach((output) => {
                const sourceTx = transactionsByTxid.get(output.txid)
                if (sourceTx) {
                    result.push(new OutputLink({ source: sourceTx, target: output }))
                }
                if (output.spending_txid) {
                    const targetTx = transactionsByTxid.get(output.spending_txid)
                    if (targetTx) {
                        result.push(new InputLink({ source: output, target: targetTx }))
                    }
                }
            })
        return result
    }, [outputsByOutpoint, transactionsByTxid, addressesById, clustersById])

    /*const links = useMemo(() => {
        return txLinks.concat(outputAddressesAndClusters.addressLinks, outputAddressesAndClusters.clusterLinks)
    }, [txLinks, outputAddressesAndClusters.addressLinks, outputAddressesAndClusters.clusterLinks])*/

    const nodes = useMemo(() => {
        return transactionsByTxid.valueSeq().concat(outputsByOutpoint.valueSeq()).concat(addressesById.valueSeq()).concat(clustersById.valueSeq()).toArray()
    }, [transactionsByTxid, outputsByOutpoint, addressesById, clustersById])

    const graph = useMemo(() => {
        nodes.forEach(node => node.inLinks.length = node.outLinks.length = 0)
        links.forEach(link => {
            link.source.outLinks.push(link)
            link.target.inLinks.push(link)
        })
        return {
            nodes: nodes,
            links: links
        }
    }, [links, nodes])


    const handleClick = useCallback(async (node: NodeObject, event: MouseEvent) => {
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


    let hoveredNode: React.MutableRefObject<StringIdNode | undefined> = useRef()
    //const [hoveredNode, setHoveredNode] = useState<StringIdNode>();

    const nodeHover = useCallback((node: NodeObject | null, previousNode: NodeObject | null) => {
        if (previousNode instanceof StringIdNode) {
            if (div2Ref.current) {
                div2Ref.current.style.cursor = "default"
            }
            previousNode.scale = 1
            previousNode.inLinks.forEach(inLink => inLink.source.scale = 1)
            previousNode.outLinks.forEach(outLink => outLink.target.scale = 1)
            //previousNode.fx = previousNode.fy = undefined;
            hoveredNode.current = undefined
            //setHoveredNode(undefined);
        }
        if (node instanceof StringIdNode) {
            if (div2Ref.current) {
                div2Ref.current.style.cursor = "context-menu"
            }
            node.scale = 1.5
            node.inLinks.forEach(inLink => inLink.source.scale = 1.5)
            node.outLinks.forEach(outLink => outLink.target.scale = 1.5)
            hoveredNode.current = node
        }
    }, [])

    const nodePaint = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
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

    const nodePointerAreaPaint = useCallback((node: NodeObject, paintColor: string, ctx: CanvasRenderingContext2D, globalScale: number) => {
        if (node.x === undefined || node.y === undefined) return
        if (node instanceof StringIdNode) {
            ctx.fillStyle = paintColor
            ctx.beginPath(); ctx.arc(node.x, node.y, 6 * node.scale, 0, 2 * Math.PI, false); ctx.fill() // circle
        }
    }, [])

    const nodeLabel = useCallback((node: NodeObject): string => {
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


    const particleCount = useCallback((link: LinkObject): number => {
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

    const particleSpeed = useCallback((link: LinkObject): number => {
        if (link instanceof StringLink) {
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
        } else {
            return 0
        }
    }, [])

    const particleWidth = useCallback((link: LinkObject): number => {
        if (link instanceof StringLink) {

            if (link.source instanceof OutputNode && link.target instanceof TxNode) {

                return Math.max(Math.ceil(Math.log(link.source.value)), 3)//Doubling value results in 1 more particle
            } else if (link.target instanceof OutputNode && link.source instanceof TxNode) {
                return Math.max(Math.ceil(Math.log(link.target.value)), 3)
            } else {
                return 0
            }
        } else {
            return 0
        }
    }, [])

    const dagFilter = useCallback((node: NodeObject): boolean => {
        return (node instanceof TxNode || node instanceof OutputNode)
    }, [])


    const arrowLength = useCallback((link: LinkObject): number => {
        if (link instanceof StringLink) {
            if (link.source instanceof AddressNode || link.target instanceof AddressNode) {
                return 0
            } else {
                return 5.5
            }
        } else return 0
    }, [])

    const fgRef: React.MutableRefObject<ForceGraphMethods | undefined> = useRef()

    useEffect(() => {
        const fg = fgRef.current
        if (fg) {
            //fg.centerAt(5, 5, 500);
            let fc = forceCollide(6.5)
            fc.strength(1)
            fc.iterations(1)
            fg.d3Force('collide', fc as any);
            (fg.d3Force('charge') as any).strength(-25)
            const linkoDistanceFn = (link: LinkObject) => 100
            const linkStrengthFn = (link: LinkObject) => {
                if (link instanceof StringLink) {
                    if (link.target instanceof AddressNode || link.target instanceof ClusterNode) {
                        return Math.max(0.01, 1 / link.target.inLinks.length)
                    } else if (link instanceof OutputLink) {
                        let spendingTx = link.target.spending_txid ? transactionsByTxid.get(link.target.spending_txid) : undefined
                        if (spendingTx) {
                            return 1
                            /*let s = link.source.outputs.filter(output => output.spending_txid === spendingTx!.id && outputsByOutpoint.has(output.txid + output.n)).length;
                            if (s === 0) return 1;
                            return Math.max(0.01, 1 / s);*/
                        } else {
                            let s = link.source.outLinks.length
                            return Math.max(0.01, 1 / s)
                        }
                    } else if (link instanceof InputLink) {
                        let sourceTx = transactionsByTxid.get(link.source.txid)
                        if (sourceTx) {
                            return 1
                            /*let s = link.target.spent_outputs.filter(spent_output => spent_output.txid === sourceTx!.id && outputsByOutpoint.has(spent_output.txid + spent_output.n)).length;
                            return Math.max(0.01, 1 / s);*/
                        } else {
                            let s = link.target.inLinks.length
                            return Math.max(0.01, 1 / s)
                        }
                    }
                }
                return 1
            }
            fg.d3Force('center', null!);
            (fg.d3Force('link') as any).distance(linkoDistanceFn);
            (fg.d3Force('link') as any).strength(linkStrengthFn)
        }
    })

    const linkColor = useCallback((link: LinkObject) => {
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

    const linkWidth = useCallback((link: LinkObject) => {
        if (link instanceof StringLink) {
            if (link.source.scale > 1 && link.target.scale > 1) {
                return 2
            } else {
                return 1
            }
        }
        return 1
    }, [])

    const linkDash = useCallback((link: LinkObject) => {
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
        <ForceGraph2D
            onNodeClick={handleClick}
            width={dimensions.width}
            height={dimensions.height}
            onNodeRightClick={handleClick}
            onNodeHover={nodeHover}
            graphData={graph}
            nodeCanvasObject={nodePaint}
            nodePointerAreaPaint={nodePointerAreaPaint}
            nodeLabel={nodeLabel}
            linkDirectionalArrowLength={arrowLength}
            linkCurvature={0}
            linkHoverPrecision={0}
            enableNodeDrag={true}
            dagMode={"lr"}
            linkDirectionalParticles={particleCount}
            linkDirectionalParticleSpeed={particleSpeed}
            dagNodeFilter={dagFilter}
            dagLevelDistance={100}
            backgroundColor={"Black"}
            linkColor={linkColor}
            linkDirectionalParticleColor={(link) => "yellow"}
            linkDirectionalParticleWidth={particleWidth}
            linkWidth={linkWidth}
            linkLineDash={linkDash}
            d3AlphaDecay={0.0228 / 2}
            d3VelocityDecay={0.3}
            ref={fgRef}
        />
    </div>
}


export default memo(TransactionForceGraph)
