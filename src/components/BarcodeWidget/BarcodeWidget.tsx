import React from 'react'
import styles from './BarcodeWidget.module.css'

type Props = { code: string, type: string }

export default function BarcodeWidget({ code, type }: Props) {
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