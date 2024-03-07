import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


function Print() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const { memos, name } = state;

    useEffect(() => {
       
        const timer = setTimeout(() => {
            window.print();
            window.close();
            navigate(-1);
        }, 250);

        return () => clearTimeout(timer); 
    }, []);


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