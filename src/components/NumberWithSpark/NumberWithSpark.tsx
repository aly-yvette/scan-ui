import React, { useEffect, useState } from 'react'
import styles from './NumberWithSpark.module.css'
import { Sparklines, SparklinesLine } from 'react-sparklines'

type Props = {
    number: number,
    suffix?: string,
    history: number[],
    min?: number,
    max?: number,
    samples?: number
}

export default function NumberWithSpark({ number, history, suffix, min = undefined, max = undefined, samples = 10 }: Props) {

    const filledHistory = Array.from({ length: samples - history.length }, () => 0).concat(history)

    return (
        <div className={styles.container}>
            <div className={styles.number}>{number}{suffix}</div>
            <div className={styles.progress}>
                <Sparklines data={filledHistory} height={50} width={50} limit={samples} min={min} max={max}>
                    <SparklinesLine color='white' />
                </Sparklines>
            </div>
        </div>
    )
}