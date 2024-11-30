import React from 'react'
import styles from './BarcodeWidget.module.css'
import { Barcode } from '../BarcodeWidgets/BarcodeWidgets'

type Props = { barcode: Barcode }

export default function BarcodeWidget({ barcode }: Props) {
    const { code, type } = barcode
    return (
        <div className={styles.container}>
            <div className={styles.code}>{code}</div>
            <dl>
                <DataItem label='Format' value='1D' />
                <DataItem label='Type' value={type} />
                <DataItem label='Standard' value="SmartLabel™️" />
            </dl>
        </div>
    )
}

function DataItem({ label, value }: { label: string, value: string }) {
    return <div className={styles.dataItem}>
        <dt><span>{label}</span></dt>
        <dd>{value}</dd>
    </div>
}