import { useEffect, useMemo, useRef } from 'react'
import ForceGraph2D, { NodeObject, LinkObject, ForceGraphMethods } from 'react-force-graph-2d'
import { StringLink } from './models/links/StringLink'
import { StringIdNode } from './models/nodes/Node'
import { forceCollide } from 'd3-force'

interface BlockchainGraphData {
    nodes: StringIdNode[]
    links: StringLink[]
}

interface Props {
    onNodeClick?: (node: StringIdNode, event: MouseEvent) => void
    onNodeRightClick?: (node: StringIdNode, event: MouseEvent) => void
    onNodeHover?: (node: StringIdNode | null, previousNode: StringIdNode | null) => void
    nodeCanvasObject?: (obj: StringIdNode, canvasContext: CanvasRenderingContext2D, globalScale: number) => void
    nodePointerAreaPaint?: (obj: StringIdNode, paintColor: string, canvasContext: CanvasRenderingContext2D, globalScale: number) => void
    nodeLabel?: (node: StringIdNode) => string
    linkDirectionalArrowLength?: (link: StringLink) => number
    linkDirectionalParticles?: (link: StringLink) => number
    linkDirectionalParticleSpeed?: (link: StringLink) => number
    linkDirectionalParticleWidth?: (link: StringLink) => number
    linkColor?: (link: StringLink) => string
    linkWidth?: (link: StringLink) => number
    linkLineDash?: (link: StringLink) => number[]
    dagNodeFilter?: (node: StringIdNode) => boolean
    //reff: React.MutableRefObject<ForceGraphMethods | undefined>
    graphData?: BlockchainGraphData
    width?: number
    height?: number
}

export function BlockchainForceGraph({ onNodeClick,
    onNodeRightClick,
    onNodeHover,
    nodeCanvasObject,
    nodePointerAreaPaint,
    nodeLabel,
    linkDirectionalArrowLength,
    linkDirectionalParticles,
    linkDirectionalParticleSpeed,
    linkDirectionalParticleWidth,
    linkColor,
    linkWidth,
    linkLineDash,
    dagNodeFilter,
    //reff,
    graphData, width, height, ...rest }: Props) {


    const onNodeClickFn = useMemo(() => {
        return onNodeClick ? (node: NodeObject, event: MouseEvent) => onNodeClick(node as StringIdNode, event) : undefined
    }, [onNodeClick])

    const onNodeRightClickFn = useMemo(() => {
        return onNodeRightClick ? (node: NodeObject, event: MouseEvent) => onNodeRightClick(node as StringIdNode, event) : undefined
    }, [onNodeRightClick])

    const onNodeHoverFn = useMemo(() => {
        return onNodeHover ? (node: NodeObject | null, previousNode: NodeObject | null) => onNodeHover(node ? node as StringIdNode : null, previousNode ? previousNode as StringIdNode : null) : undefined
    }, [onNodeHover])

    const nodeCanvasObjectFn = useMemo(() => {
        return nodeCanvasObject ? (obj: NodeObject, canvasContext: CanvasRenderingContext2D, globalScale: number) => nodeCanvasObject(obj as StringIdNode, canvasContext, globalScale) : undefined
    }, [nodeCanvasObject])

    const nodePointerAreaPaintFn = useMemo(() => {
        return nodePointerAreaPaint ? (obj: NodeObject, paintColor: string, canvasContext: CanvasRenderingContext2D, globalScale: number) => nodePointerAreaPaint(obj as StringIdNode, paintColor, canvasContext, globalScale) : undefined
    }, [nodePointerAreaPaint])

    const nodeLabelFn = useMemo(() => {
        return nodeLabel ? (node: NodeObject) => nodeLabel(node as StringIdNode) : undefined
    }, [nodeLabel])

    const linkDirectionalArrowLengthFn = useMemo(() => {
        return linkDirectionalArrowLength ? (link: LinkObject) => linkDirectionalArrowLength(link as StringLink) : undefined
    }, [linkDirectionalArrowLength])

    const linkDirectionalParticlesFn = useMemo(() => {
        return linkDirectionalParticles ? (link: LinkObject) => linkDirectionalParticles(link as StringLink) : undefined
    }, [linkDirectionalParticles])

    const linkDirectionalParticleSpeedFn = useMemo(() => {
        return linkDirectionalParticleSpeed ? (link: LinkObject) => linkDirectionalParticleSpeed(link as StringLink) : undefined
    }, [linkDirectionalParticleSpeed])

    const linkDirectionalParticleWidthFn = useMemo(() => {
        return linkDirectionalParticleWidth ? (link: LinkObject) => linkDirectionalParticleWidth(link as StringLink) : undefined
    }, [linkDirectionalParticleWidth])

    const linkColorFn = useMemo(() => {
        return linkColor ? (link: LinkObject) => linkColor(link as StringLink) : undefined
    }, [linkColor])

    const linkWidthFn = useMemo(() => {
        return linkWidth ? (link: LinkObject) => linkWidth(link as StringLink) : undefined
    }, [linkWidth])

    const linkLineDashFn = useMemo(() => {
        return linkLineDash ? (link: LinkObject) => linkLineDash(link as StringLink) : undefined
    }, [linkLineDash])

    const dagNodeFilterFn = useMemo(() => {
        return dagNodeFilter ? (node: NodeObject) => dagNodeFilter(node as StringIdNode) : undefined
    }, [dagNodeFilter])

    const fgRef: React.MutableRefObject<ForceGraphMethods | undefined> = useRef()

    useEffect(() => {
        const fg = fgRef.current
        if (fg) {
            const fc = forceCollide(6.5)
            fc.strength(1)
            fc.iterations(1)
            fg.d3Force('collide', fc as any);
            (fg.d3Force('charge') as any).strength(-25)
            const linkoDistanceFn = (link: StringLink) => 100
            const linkStrengthFn = (link: StringLink) => {

                switch (link.type) {
                    case "ClusterLink":
                        return Math.max(0.01, 1 / link.target.addresses.size)
                    case "AddressLink":
                        return Math.max(0.01, 1 / link.target.outputs.size)
                    case "InputLink":
                        if (link.source.spentLink) {
                            return 1
                        } else {
                            return Math.max(0.01, 1 / link.target.inputs.size)
                        }
                    case "OutputLink":
                        if (link.target.spentByLink) {
                            return 1
                        } else {
                            return Math.max(0.01, 1 / link.source.outputs.size)
                        }
                }
            }
            (fg.d3Force('link') as any).strength(linkStrengthFn)
            fg.d3Force('center', null!);
            (fg.d3Force('link') as any).distance(linkoDistanceFn)
        }
    })

    return <ForceGraph2D
        onNodeClick={onNodeClickFn}
        onNodeRightClick={onNodeRightClickFn}
        onNodeHover={onNodeHoverFn}
        graphData={graphData}
        nodeCanvasObject={nodeCanvasObjectFn}
        nodePointerAreaPaint={nodePointerAreaPaintFn}
        nodeLabel={nodeLabelFn}
        linkDirectionalArrowLength={linkDirectionalArrowLengthFn}
        linkDirectionalParticles={linkDirectionalParticlesFn}
        linkDirectionalParticleSpeed={linkDirectionalParticleSpeedFn}
        linkDirectionalParticleWidth={linkDirectionalParticleWidthFn}
        linkColor={linkColorFn}
        linkWidth={linkWidthFn}
        linkLineDash={linkLineDashFn}
        linkCurvature={0}
        linkHoverPrecision={0}
        enableNodeDrag={true}
        dagMode={"lr"}
        dagNodeFilter={dagNodeFilterFn}
        dagLevelDistance={100}
        backgroundColor={"Black"}
        linkDirectionalParticleColor={(link) => "yellow"}
        d3AlphaDecay={0.0228 / 2}
        d3VelocityDecay={0.3}
        width={width}
        height={height}
        ref={fgRef}
    />
}