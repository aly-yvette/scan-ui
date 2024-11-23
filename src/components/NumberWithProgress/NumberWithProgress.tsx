import React from 'react'
import styles from './NumberWithProgress.module.css'

type Props = { number: string, progress: number }

export default function NumberWithProgress({ number, progress }: Props) {
    return (
        <div className={styles.container}>
            <div className={styles.number}>{number}</div>
            <div className={styles.progress}>
                <div className={styles.bar} style={{ top: `${100 - progress}%` }}></div>
            </div>
        </div>
    )
}