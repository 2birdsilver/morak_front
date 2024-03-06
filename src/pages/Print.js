import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';


function Print() {
    const {state} = useLocation();
    const { memos, name } = state;

    useEffect(()=>{
         window.print();
    },[])


    return (
        <div className='wrap print'>
            <h1>To. {name}</h1>
            <div className='p-container'>
                {memos.map(memo => (
                    <div className='each-memo'
                         key={memo.id}>
                        <div className='p-writer'>from. {memo.writer}</div>   
                        <div className='p-content'>{memo.content}</div>     
                    </div>
                ))}
            </div>
           
        </div>
    )
}

export default Print