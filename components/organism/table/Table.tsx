'use client'
import React, { MouseEvent, useEffect, useState } from 'react'

type dataType = [
    
]

const Table = () => {
    const [tarn, setTarn] = useState(1)
    const [resultFlg, setResultFlg] = useState(false)
    // 1: ○, 2: ×, null
    const [data, setData] = useState([
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ])
    useEffect(() => {
        const random: number = Math.floor(Math.random() * 2 + 1)
        if(random === 1) {
            setTarn(1)
        }else{
            setTarn(2)
        }
    }, [])
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event?.preventDefault()
        const target = event.currentTarget
        const x: number = Number(target.dataset.x)
        const y: number = Number(target.dataset.y)
        if(data[x][y] !== null) return
        let tempData = [...data]
        tempData[x][y] = tarn
        setData([...tempData]) 
        if(isResultJudge(tempData)) {
            setResultFlg(true)
            return
        }
        if(tarn === 1) {
            setTarn(2)
        }else{
            setTarn(1)
        }
    }
    const isResultJudge = (arr: any) => {
        // ベースケース
        if(arr[1][0] === null && arr[1][1] === null && arr[1][2] === null && arr[0][1] && arr[2][1]) {
            return false
        }
        // 斜め判定
        if((arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2]) || (arr[2][0] === arr[1][1] && arr[1][1] === arr[0][2])) {
            return true
        }
        let flg: boolean = false
        // 縦判定 横判定
        for(let i = 0; i < 3; i++) {
            if(arr[i][0] === arr[i][1] && arr[i][1] === arr[i][2] || arr[0][i] === arr[1][i] && arr[1][i] === arr[2][i]) {
                flg = true
                return true
            }
        }
        return flg
    }
    return (
        <section>
            <table>
                <tbody>
                    {data.map((arr, index) => (
                        <tr key={`tr-${index}`}>
                            {arr.map((item, i) => (
                                <td key={`td-${i}`}>
                                    {item === 1 ? "○" : item === 2 ? "×" : 
                                        <button
                                            onClick={handleClick}
                                            data-x={i + 1}
                                            data-y={index + 1}
                                        />
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default Table