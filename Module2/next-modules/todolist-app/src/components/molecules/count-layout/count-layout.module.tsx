"use client"
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useCount } from '@/custom-hooks/useCount'
import Button from '@/components/atomics/button/button.module'

export default function CountLayout() {

    const { count, addCount, decreaseCount } = useCount()
    const [renderCount, setRenderCount] = useState(0)
    const [number, setNumber] = useState(0)
    const countRef = useRef(0)

    // -- penggunaan use effect --
    // useEffect(() => {
    //     console.log('mounting component CountLayout ...') // -> fase ketika komponen mengalami mounting
    //     // console.log('updating count : ', count) // -> fase ketika komponen mengalami updating

    //     return () => {
    //         console.log('unmounting component CountLayout ...') // -> fase ketika komponen mengalami unmounting
    //     }
    // }, [])

    // -- penggunaan use ref --
    function increaseCount() {
        countRef.current += 1;
    }

    function removeCount() {
        countRef.current -= 1;
    }

    // -- penggunaan use callback --
    const incrementCallback = useCallback(() => {
        setNumber((prev) => prev + 1)
    }, [])


    const decrementCallback = useCallback(() => {
        setNumber((prev) => prev - 1)
    }, [])



    return (
        <div className='w-full h-full bg-slate-200 flex flex-col justify-center items-center'>
            <h2 className='font-semibold text-lg text-center text-black my-5'> ---- Count with useState ---- </h2>
            <div className='flex w-full gap-x-5 bg-slate-700 p-5 rounded-md'>
                <Button
                    id='add-count-state'
                    title='Add Count with useState'
                    onClick={addCount}
                />
                <p className='font-semibold text-black mx-5'>Count with useState : {count}</p>
                <Button
                    id='decrease-count-state'
                    title='Decrease Count with useState'
                    onClick={decreaseCount}
                />
            </div>
            <h2 className='font-semibold text-lg text-center text-black my-5'> ---- Count with useRef --- </h2>
            <div className='flex w-full gap-x-5 bg-slate-700 p-5 rounded-md'>
                <Button
                    id='add-count-ref'
                    title='Add Count with useRef'
                    onClick={increaseCount}
                />
                <Button
                    id='re-render-countref'
                    title='Re-render countRef'
                    onClick={() => setRenderCount(renderCount + 1)}
                />
                <p className='font-semibold text-black mx-5'>Count with useRef : {countRef.current}</p>
                <Button
                    id='decrease-count-ref'
                    title='Decrease Count with useRef'
                    onClick={removeCount}
                />
            </div>
            <div>
                <h2 className='font-semibold text-lg text-center text-black my-5'> ---- Count with useCallback --- </h2>
                <div className='flex w-full gap-x-5 bg-slate-700 p-5 rounded-md'>
                    <Button
                        id='add-count-callback'
                        title='Add Count with useCallback'
                        onClick={incrementCallback}
                    />
                    <p className='font-semibold text-black mx-5'>Count with useCallback : {number}</p>
                    <Button
                        id='decrease-count-callback'
                        title='Decrease Count with useCallback'
                        onClick={decrementCallback}
                    />
                </div>
            </div>
        </div>
    )
}
