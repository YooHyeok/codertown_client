import { Messenger, X } from 'react-bootstrap-icons';
import "react-chat-elements/dist/main.css"
import { useRef, useState, useEffect } from 'react';
import Chat from './Chat.js';
import SockJS from "sockjs-client";
import {Stomp} from "@stomp/stompjs";
export default function MessengerFrame() {

  const chatOpenBtnRef = useRef('');
  const chatCloseBtnRef = useRef('');
  const chatComponentRef = useRef('');  
  const [chatFrameOnOff, setChatFrameOnOff] = useState(false);
  const [client, setClient] = useState(null);

  useEffect(() => {
    if(chatFrameOnOff == true) {
      // Set up the STOMP client
      const sockJSClient = new SockJS('/ws'); // Proxy설정으로 인해 http://localhost:8080 생략
      const stompClient = Stomp.over(sockJSClient);
      stompClient.connect({}, (frame) => {
          setClient(stompClient);
          console.log(frame)
          const messageData = {
              sender: '보내는 사람', // 보내는 사람의 이름 또는 ID로 수정
              content: '연결 성공',
          };
          if(frame.command == 'CONNECTED') {
            console.log("연결완료!")
            stompClient.send(`/pub/chat/connect`, {}, JSON.stringify(messageData)); // 데이터 전송
            stompClient.subscribe('/connected-success', function (e) { //데이터 수신
              //e.body에 전송된 data가 들어있다 JSON Text형태이므로 parsing한 후 props에 접근한다.
              // alert(JSON.parse(e.body).content);
            });
          }
      });

      /* useEffect 클린업 함수 호출 */
      return () => {
          /* 로그아웃시 연결 종료된다. */
          if (chatFrameOnOff == false) {
              console.log("연결종료!")
              stompClient.disconnect(); //연결 종료
          }
      };
    }
  }, [chatFrameOnOff])

    /* 메시지 구독  */
    /* useEffect(() => {
      console.log(client)
      if (client) {
          client.subscribe('/connected-success', function (e) {
              alert(JSON.parse(e.body).content);
          });
  
      }
      }, [client]); */


    return (<div>
                {/* 버튼 영역 */}
                <div ref={chatOpenBtnRef} className="dm-icon-open-button" style={dmButtonOnStyle} onClick={(e)=>{
                  chatOpenBtnRef.current.style.display='none';
                  chatCloseBtnRef.current.style.display='flex';
                  chatComponentRef.current.style.display='flex';
                  setChatFrameOnOff(true)
                }}>
                    <Messenger className="inline" size={30}  style={{width:"30px", height:"30px", background:"linear-gradient(rgb(104, 97, 236) 0%, rgb(127, 97, 236) 100%)", color:"white", border:"none"}}/>
                </div>
                <div ref={chatCloseBtnRef} className="dm-icon-close-button" style={dmButtonOffStyle} onClick={(e)=>{
                  chatOpenBtnRef.current.style.display='flex';
                  chatCloseBtnRef.current.style.display='none';
                  chatComponentRef.current.style.display='none';
                  setChatFrameOnOff(false)
                }}>
                    <X className="inline" size={30}  style={{width:"30px", height:"30px", background:"linear-gradient(rgba(247, 247, 248, 0.9) 0%, rgba(247, 247, 248, 0.9) 100%)", color:"rgba(0, 0, 0, 0.6)"}}/>
                </div>

                {/* 채팅 컴포넌트 */}
                <div ref={chatComponentRef} style={dmFrameStyle}>
                  {
                    chatFrameOnOff && <Chat chatFrameOnOff={chatFrameOnOff} client={client}/>
                  }
                </div>
          </div>
    )
}
const dmButtonOnStyle = {
  display: 'flex'
  /* 위치 */
  , position: 'fixed' //고정
  , zIndex: '10'
  , bottom: '30px'
  , right: '30px'
  /* 크기 및 색상 */
  , width:"50px"
  , height:"50px"
  , background:"linear-gradient(rgb(104, 97, 236) 0%, rgb(127, 97, 236) 100%)"
  , borderRadius:"43%"
  , border:'none'
  , justifyContent: 'center'
  , alignItems: 'center'
  , cursor: 'pointer'
  , transition: 'visibility 400ms ease 0s'
  , boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 8px 30px'
};
const dmButtonOffStyle = {
  display: 'none'
  /* 위치 */
  , position: 'fixed' //고정
  , zIndex: '10'
  , bottom: '30px'
  , right: '30px'
  /* 크기 및 색상 */
  , width:"50px"
  , height:"50px"
  , background:"linear-gradient(rgba(247, 247, 248, 0.9) 0%, rgba(247, 247, 248, 0.9) 100%)"
  , borderRadius:"43%"
  , border:'none'
  , justifyContent: 'center'
  , alignItems: 'center'
  , cursor: 'pointer'
  , transition: 'visibility 400ms ease 0s'
  , animation: '400ms cubic-bezier(0.36, 0, 0, 1) 0s 1 normal both running jiroXv'
  , boxShadow: 'rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.1) 0px 4px 6px, rgba(0, 0, 0, 0.15) 0px 8px 30px'
};
const dmFrameStyle = {
  display: 'none'
  , position: 'fixed' //고정
  , zIndex: '10'
  , bottom: "90px"
  , right: "30px"
  , textAlign:'left'
  , height: "calc(100% - 116px) !important"
  , background: 'lightgray'
  , boxShadow: 'rgba(255, 255, 255, 0.12) 0px 0px 2px 0px inset, rgba(0, 0, 0, 0.05) 0px 0px 2px 1px, rgba(0, 0, 0, 0.3) 0px 12px 60px'
};

