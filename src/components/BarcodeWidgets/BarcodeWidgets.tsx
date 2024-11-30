import BarcodeWidget from '../BarcodeWidget/BarcodeWidget'
import { useTransition, animated } from '@react-spring/web'

export type Barcodes = Barcode[]
export type Barcode = { code: string, type: string }

type Props = { barcodes: Barcodes }

export default function BarcodeWidgets({ barcodes }: Props) {

    // Animate the list as it grows and shrinks
    const transitions = useTransition(barcodes, {
        key: (item: Barcode) => item.code,
        from: { opacity: 0.5, transform: 'translate3d(0,10%,0)' },
        enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
        leave: { opacity: 0, transform: 'translate3d(0,10%,0)' },
    })

    return transitions((style, barcode) => (
        <animated.div style={style}>
            <BarcodeWidget barcode={barcode} />
        </animated.div>
    ))

}