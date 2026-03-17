import {
  useRef,
  type FC,
  useState,
  useEffect,
  type MouseEvent,
  type TouchEvent,
  type ReactNode,
} from 'react'
import './style.css'

export interface ImageData {
  url: string
  title?: string
}

export interface LightboxProps {
  images: ImageData[] | string[]
  isOnlyOneImage?: boolean
  imageIndex?: number
  image?: string
  title?: string
  onClose?: (e?: MouseEvent) => void
  onNavigateImage?: (index: number) => void
  zoomStep?: number
  allowZoom?: boolean
  doubleClickZoom?: number
  clickOutsideToExit?: boolean
  keyboardInteraction?: boolean
  allowRotate?: boolean
  showTitle?: boolean
  allowReset?: boolean
}

export interface LightboxState {
  x: number
  y: number
  zoom: number
  rotate: number
  loading: boolean
  moving: boolean
  current: number
  multi: boolean
}

export interface ConditionProps {
  condition:
    | string
    | boolean
    | LightboxState
    | ((...args: MouseEvent[]) => void)
  children: ReactNode
}

const getXY = (e: MouseEvent | TouchEvent): { x: number; y: number } => {
  let x = 0
  let y = 0
  if ('touches' in e && e?.touches?.length) {
    x = e?.touches?.[0]?.pageX
    y = e?.touches?.[0]?.pageY
  } else if ('pageX' in e) {
    x = e?.pageX
    y = e?.pageY
  }
  return { x, y }
}

const Cond: FC<ConditionProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null
}

const getCurrentImage = (s: LightboxState, p: LightboxProps): string => {
  if (!s?.multi) return p?.image ?? ''
  return (
    (p?.images[s?.current] as ImageData)?.url ?? p?.images?.[s?.current] ?? ''
  )
}

const Lightbox: FC<LightboxProps> = (props) => {
  const [state, setState] = useState<LightboxState>({
    x: 0,
    y: 0,
    zoom: 1,
    rotate: 0,
    loading: true,
    moving: false,
    current: props?.imageIndex ?? 0,
    multi:
      Array.isArray(props?.images) &&
      props?.images?.length > 1 &&
      !props?.isOnlyOneImage,
  })
  const DEFAULT_ZOOM_STEP = 0.3
  const DEFAULT_LARGE_ZOOM = 4

  const initX = useRef(0)
  const initY = useRef(0)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const _cont = useRef<HTMLDivElement | null>(null)

  const createTransform = (
    x: number,
    y: number,
    zoom: number,
    rotate: number
  ) => `translate3d(${x}px,${y}px,0px) scale(${zoom}) rotate(${rotate}deg)`

  const stopSideEffect = (e: MouseEvent | TouchEvent) => e.stopPropagation()

  const getCurrentTitle = (s: LightboxState, p: LightboxProps) => {
    if (!s?.multi) return p?.title ?? ''
    return (p?.images[s?.current] as ImageData)?.title ?? ''
  }

  const resetZoom = () => setState({ ...state, x: 0, y: 0, zoom: 1 })

  const shockZoom = (e: MouseEvent | TouchEvent) => {
    const {
      zoomStep = DEFAULT_ZOOM_STEP,
      allowZoom = true,
      doubleClickZoom = DEFAULT_LARGE_ZOOM,
    } = props
    if (!allowZoom || !doubleClickZoom) return false
    stopSideEffect(e)
    if (state?.zoom > 1) return resetZoom()

    const _z =
      (zoomStep < 1 ? Math.ceil(doubleClickZoom / zoomStep) : zoomStep) *
      zoomStep
    const _xy = getXY(e)
    const _cbr = _cont?.current?.getBoundingClientRect()
    const _ccx = _cbr ? _cbr?.x + _cbr?.width / 2 : 0
    const _ccy = _cbr ? _cbr?.y + _cbr?.height / 2 : 0
    const x = (_xy?.x - _ccx) * -1 * _z
    const y = (_xy?.y - _ccy) * -1 * _z
    setState({ ...state, x, y, zoom: _z })
  }

  const navigateImage = (
    direction: 'next' | 'prev',
    e: MouseEvent | TouchEvent
  ) => {
    stopSideEffect(e)
    let current = state?.current
    const { images } = props

    const isPDF = (index: number) => {
      const url = (images[index] as ImageData)?.url ?? (images[index] as string)
      return url?.toLowerCase().endsWith('.pdf')
    }

    do {
      if (direction === 'next') {
        current = (current + 1) % images?.length
      } else {
        current = (current - 1 + images?.length) % images?.length
      }
    } while (isPDF(current))

    setState({
      ...state,
      current,
      x: 0,
      y: 0,
      zoom: 1,
      rotate: 0,
      loading: true,
    })

    if (props?.onNavigateImage) {
      props?.onNavigateImage(current)
    }
  }

  const startMove = (e: MouseEvent | TouchEvent) => {
    if (state?.zoom <= 1) return
    setState({ ...state, moving: true })
    const xy = getXY(e)
    initX.current = xy?.x - state?.x
    initY.current = xy?.y - state?.y
  }

  const duringMove = (e: MouseEvent | TouchEvent) => {
    if (!state?.moving) return
    const xy = getXY(e)
    lastX.current = xy?.x - initX?.current
    lastY.current = xy?.y - initY?.current
    setState({
      ...state,
      x: xy?.x - initX?.current,
      y: xy?.y - initY?.current,
    })
  }

  const endMove = () => setState({ ...state, moving: false })

  const applyZoom = (type: 'in' | 'out' | 'reset') => {
    const { zoomStep = DEFAULT_ZOOM_STEP } = props
    let newZoom = state?.zoom

    if (type === 'in') newZoom += zoomStep
    else if (type === 'out') newZoom -= zoomStep
    else resetZoom()

    setState({
      ...state,
      zoom: newZoom < 1 ? 1 : newZoom,
      ...(newZoom === 1 && { x: 0, y: 0 }),
    })
  }

  const applyRotate = (type: 'cw' | 'acw') => {
    const angle = type === 'cw' ? 90 : -90
    setState({ ...state, rotate: state?.rotate + angle })
  }

  const reset = (e: MouseEvent) => {
    stopSideEffect(e)
    setState({ ...state, x: 0, y: 0, zoom: 1, rotate: 0 })
  }

  const exit = (e: MouseEvent) => {
    if (props?.onClose) props?.onClose(e)
    else console.error('No Exit function passed on prop: onClose.')
  }

  const shouldShowReset = () =>
    state?.x || state?.y || state?.zoom !== 1 || state?.rotate !== 0

  const canvasClick = (e: MouseEvent) => {
    const { clickOutsideToExit = true } = props
    if (clickOutsideToExit && state?.zoom <= 1) exit(e)
  }

  useEffect(() => {
    document.body.classList.add('lb-open-lightbox')
    const { keyboardInteraction = true } = props
    const keyboardNavigation = (e: KeyboardEvent) => {
      if (keyboardInteraction) {
        switch (e?.key) {
          case 'Escape':
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reset(e as any)
            break
          default:
        }
      }
    }

    document.addEventListener('keyup', keyboardNavigation)
    return () => {
      document.body.classList.remove('lb-open-lightbox')
      document.removeEventListener('keyup', keyboardNavigation)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, state])

  const image = getCurrentImage(state, props)
  const title = getCurrentTitle(state, props)

  if (!image) {
    console.warn('No image(s) supplied')
    return null
  }

  const { showTitle = true, allowZoom = true, allowRotate = true } = props
  const _reset = shouldShowReset()

  return (
    <div className='lb-container'>
      <div className='lb-header'>
        <Cond condition={showTitle && title}>
          <div className='lb-title'>
            <span title={title} className='lb-title'>
              {title}
            </span>
          </div>
        </Cond>
        <Cond condition={reset}>
          <div
            title='Reset'
            className={`lb-button lb-icon-reset lb-hide-mobile reload ${
              _reset ? '' : 'lb-disabled'
            }`}
            onClick={reset}
          ></div>
        </Cond>
        <Cond condition={state?.multi}>
          <div
            title='Previous'
            className='lb-button lb-icon-arrow prev lb-hide-mobile'
            onClick={(e) => navigateImage('prev', e)}
          ></div>
          <div
            title='Next'
            className='lb-button lb-icon-arrow next lb-hide-mobile'
            onClick={(e) => navigateImage('next', e)}
          ></div>
        </Cond>
        <Cond condition={allowZoom}>
          <div
            title='Zoom In'
            className='lb-button lb-icon-zoomin zoomin'
            onClick={() => applyZoom('in')}
          ></div>
          <div
            title='Zoom Out'
            className={`lb-button lb-icon-zoomout zoomout ${
              state?.zoom <= 1 ? 'lb-disabled' : ''
            }`}
            onClick={() => applyZoom('out')}
          ></div>
        </Cond>
        <Cond condition={allowRotate}>
          <div
            title='Rotate left'
            className='lb-button lb-icon-rotate rotatel'
            onClick={() => applyRotate('acw')}
          ></div>
          <div
            title='Rotate right'
            className='lb-button lb-icon-rotate rotater'
            onClick={() => applyRotate('cw')}
          ></div>
        </Cond>
        <div
          title='Close'
          className='lb-button lb-icon-close close'
          onClick={(e) => exit(e)}
        ></div>
      </div>
      <div
        className={`lb-canvas${state?.loading ? ' lb-loading' : ''}`}
        ref={_cont}
        onClick={(e) => canvasClick(e)}
      >
        <img
          draggable='false'
          style={{
            transform: createTransform(
              state?.x,
              state?.y,
              state?.zoom,
              state?.rotate
            ),
            cursor: state?.zoom > 1 ? 'grab' : 'unset',
            transition: state?.moving ? 'none' : 'all 0.1s',
          }}
          onMouseDown={(e) => startMove(e)}
          onTouchStart={(e) => startMove(e)}
          onMouseMove={(e) => duringMove(e)}
          onTouchMove={(e) => duringMove(e)}
          onMouseUp={() => endMove()}
          onMouseLeave={() => endMove()}
          onTouchEnd={() => endMove()}
          onClick={(e) => stopSideEffect(e)}
          onDoubleClick={(e) => shockZoom(e)}
          onLoad={() => setState({ ...state, loading: false })}
          className={`lb-img${state?.loading ? ' lb-loading' : ''}`}
          title={title}
          src={image}
          alt={title}
        />
        <div className='mobile-controls lb-show-mobile'>
          {state?.multi ? (
            <div
              title='Previous'
              className='lb-button lb-icon-arrow prev'
              onClick={(e) => navigateImage('prev', e)}
            ></div>
          ) : null}
          {_reset ? (
            <div
              title='Reset'
              className='lb-button lb-icon-reset reload'
              onClick={reset}
            ></div>
          ) : null}
          {state?.multi ? (
            <div
              title='Next'
              className='lb-button lb-icon-arrow next'
              onClick={(e) => navigateImage('next', e)}
            ></div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Lightbox
