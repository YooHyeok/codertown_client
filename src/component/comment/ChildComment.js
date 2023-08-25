import axios from "axios";
import { useState, useEffect } from 'react';

/**
 * 무한반복 댓글을 위한 재귀호출 컴포넌트
 * @returns 
 */
export default function ChildComment({ commentNo, writer, nickname, content, firstRegDate, children }) {
/*     const [showChildComments, setShowChildComments] = useState(false);
    const toggleChildComments = () => {
      setShowChildComments(prevState => !prevState);
    }; */
    useEffect(()=> {
    },[])
return (
    <div>
    <div style={{width:'1100px', margin:"30px auto", borderBottom: '0.1px solid lightgray'}}>
        <div key={commentNo} style={{width:'1000px', margin:"30px auto"}}>
            <img src='/default_profile2.png' style={{width:'40px', height:'40px', margin:'5px', borderRadius:'50%', float:"left"}}/> 
            <div>
                <span>{nickname}</span> <span>{'2023-08-21'}</span>
                <div>
                    <p>{content}</p>
                </div>
                <span>{'댓글'}</span> <span>{'수정'}</span> <span>{'지우기'}</span>
            </div>
        </div>
    </div>
    {children.map(child => (
        <ChildComment
            key={child.commentNo}
            writer={child.writer}
            nickname={child.writer.nickname}
            content={child.content}
            firstRegDate={child.firstRegDate}
            children={child.children}
        />
        ))}

    </div>
    );
}