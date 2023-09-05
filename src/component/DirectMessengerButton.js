import { Button } from 'reactstrap';
import { Messenger } from 'react-bootstrap-icons';
import "react-chat-elements/dist/main.css"
import { MessageBox, ChatList, ChatItem, Input } from "react-chat-elements";

import { useRef, useState, useEffect} from 'react';

// npm install react-chat-elements --save --force

export default function DirectMessengerButton() {

    const textareaRef = useRef('');
    const chatContainerRef = useRef('');
    const [textareaValue, setTextareaValue] = useState('')


    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, [textareaValue]);

  /* 댓글 [입력] Change 이벤트 메소드 */
    const textAreaInputChange = (e) => {
        setTextareaValue(e.target.value)
        if (e.target.value == '') {
          textareaRef.current.style.height = '30px';
          textareaRef.current.value = null;
          chatContainerRef.current.style.height = '380px';
          return;
        }
    }
    const textAreaInputKeyDown= (e) => {
      
      if (e.key === 'Enter' && e.shiftKey) {
        e.preventDefault(); // 엔터 키의 기본 동작 방지
        // Shift + Enter를 눌렀을 때 줄개행
        setTextareaValue(textareaValue + '\n');
        textareaRef.current.style.overflow = 'auto';
        textareaRef.current.style.height = 'auto';
        console.log(textareaRef.current.scrollHeight)
        textareaRef.current.style.height = (30+textareaRef.current.scrollHeight) + 'px';
        // textareaRef.current.focus();
        chatContainerRef.current.style.height = 'auto';
        chatContainerRef.current.style.height = `calc(408px - ${textareaRef.current.scrollHeight}px)`;
        return;
      } 
      
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // 엔터 키의 기본 동작 방지
        // 여기에 메시지 전송 로직 추가
        // ...
        console.log(textareaValue)
        // 메시지 전송 후 입력창 초기화
        setTextareaValue('');
        chatContainerRef.current.style.height = '380px';
        textareaRef.current.style.height = '30px'; // 초기 높이로 설정
        return;
      }
      
    }

    const dmButtonStyle = {
        display: 'flex'
        // , flexWrap: 'nowrap'
        // , width: 'auto'
        /* 위치 */
        , position: 'fixed' //고정
        , zIndex: '10'
        , bottom: '150px'
        , right: '100px'
        /* 크기 및 색상 */
        , width:"50px"
        , height:"50px"
        // , backgroundColor:"#8B00FF"
        , background:"linear-gradient(rgb(104, 97, 236) 0%, rgb(127, 97, 236) 100%)"
        , borderRadius:"43%"
        , border:'none'
        , justifyContent: 'center'
        , alignItems: 'center'
      };

      const dmFrameStyle = {
        display: 'flex'
        , position: 'fixed' //고정
        , zIndex: '10'
        , bottom: "216px"
        , right: "100px"
        , textAlign:'left'
        , height: "calc(100% - 116px) !important"
      };

      const dataSource = [
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: '어제',
          unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          // unread: 3, // 읽지 않은 대화 갯수
        },
        {
          avatar: `/default_profile3.png`, //`profileImage/${webdevyoo@gmail.com}`
          alt: 'kursat_avatar',
          title: 'Kursat', //사용자 이름
          subtitle: "Why don't we go to the No Way Home movie this weekend ?", //마지막 대화 내용
          date: new Date(),
          // unread: 3, // 읽지 않은 대화 갯수
        },
    ]

    return (<div>
                <div className="dm-icon-button" style={dmButtonStyle}>
                    <Messenger className="inline" size={30}  style={{width:"30px", height:"30px", background:"linear-gradient(rgb(104, 97, 236) 0%, rgb(127, 97, 236) 100%)", color:"white", border:"none"}}/>
                </div>
                {/* 채팅 컴포넌트 */}
                <div style={dmFrameStyle}>
                    {/* 채팅 리스트 컴포넌트 */}
                    <div className="chat-list-div" style={{width:'452px', height:'506px', backgroundColor:'white', border : "1px solid lightgray", overflow:'auto', textAlign:'left'}}>
                      <ChatList className='chat-list' dataSource={dataSource} />
                    </div>

                    {/* 채팅방 입장 컴포넌트 */}
                    <div className="chat-into" style={{width:'450px', height:'506px', backgroundColor:'white', border : "1px solid lightgray"}}>
                      {/* 채팅방 제목 영역*/}
                      <div className="chat-into-header" style={{width:'448px', height:'73px', backgroundColor:'white', borderBottom : "1px solid lightgray"}}>
                        <ChatItem
                            avatar="https://avatars.githubusercontent.com/u/80540635?v=4"
                            alt="kursat_avatar"
                            title="Kursat"
                            subtitle=""
                            date={new Date()}
                            unread={0}
                          />;
                      </div>
                      {/* 채팅방 대화내용 리스트 영역 */}
                      <div ref={chatContainerRef} className="chat-into-body" style={{width:'448px', height:'380px', minHeight:'296px', overflow:'auto', backgroundColor:'white', borderBottom : "1px solid lightgray"}}>
                        {/* 상대방 메시지박스 */}
                        <MessageBox position='left'  title='Burhan'  type='text'  text="Hi there !"  date={new Date()}  replyButton={true}/>
                        {/* 메시지박스 */}
                        <MessageBox position="right" title="Emre" type="text" text="Click to join the meeting" date={new Date()} />
                        {/* 상대방 메시지박스 */}
                        <MessageBox position='left'  title='Burhan'  type='text'  text="Hi there !"  date={new Date()}  replyButton={true}/>
                        {/* 메시지박스 */}
                        <MessageBox position="right" title="Emre" type="text" text="Click to join the meeting" date={new Date()} />
                        {/* 상대방 메시지박스 */}
                        <MessageBox position='left'  title='Burhan'  type='text'  text="Hi there !"  date={new Date()}  replyButton={true}/>
                        {/* 메시지박스 */}
                        <MessageBox position="right" title="Emre" type="text" text="Click to join the meeting" date={new Date()} />
                      </div>
                      {/* 채팅방 대화 전송 영역 */}
                      <div className="chat-into-footer" style={{width:'448px', minHeight:'48px', overflow:'hidden', backgroundColor:'white'/* , borderBottom : "1px solid lightgray" */}}>
                        <div style={{width:"400px", minHeight:'30px', margin:'0 auto', maxHeight:"112px !important"}}>
                        {/* <Input placeholder="Type here..." multiline={true} /> */}
                            {<textarea rows={1} ref={textareaRef} onChange={textAreaInputChange} onKeyDown={(e)=>{
                              textAreaInputKeyDown(e)
                            }} value={textareaValue}
                                  style={{float:'left', display:'flex', width:'360px', height:'30px', maxHeight:"114px", margin:"10px auto", resize: 'none', outlineStyle:'none', overflow:'hidden', border: '0.1px solid lightgray'}} placeholder='내용을 입력하세요'></textarea>}
                        <div>
                          <Button size={'sm'} style={{float:'right', margin:'10px auto', background:"linear-gradient(rgb(104, 97, 236) 0%, rgb(127, 97, 236) 100%)"}}>전송</Button>
                        </div>
                        </div>
                      </div>
                  </div>
              </div>
          </div>
    )

}