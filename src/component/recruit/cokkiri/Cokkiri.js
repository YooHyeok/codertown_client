import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Table } from 'reactstrap';
import { BsFillSuitHeartFill } from "react-icons/bs"
import { Button, FormGroup, InputGroup, Input } from 'reactstrap';
import { Search } from 'react-bootstrap-icons';
import axios from "axios";

export default function Cokkiri() {
    const divStyle = {
        width: '1200px'
        , height: '700px'
        , textAlign: 'left'
        , margin: '150px auto'
        , marginBottom: '50px'
        , padding: '30px'
        , top: '100'
      };

    const [cokkiriList , setCokkiriList] = useState([])
    const [pageInfo, setPageInfo] = useState({
        allPage: 10, curPage: 1, startPage: 1, endPage: 10
      });

    const pageRequest = (e) => {
        serverRequest(e.target.value);
    }

    /**
     * 코끼리 목록 출력 - 호스트 서버 통신 메소드
     * @param {} page : 선택된 페이지 정보 파라미터
     */
    const serverRequest = (page) => {
        axios.get('/recruit/'+page+'/Cokkiri')
        .then((response)=> {
            setCokkiriList(response.data.recruitList)
            setPageInfo(response.data.pageInfo)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /**
     * useEffect - 페이지 진입시 리랜더링
     * serverRequest()를 호출하여 호스트 서버와 통신한다.
     */
    useEffect(() => {
        serverRequest(1)
      }, [])
    

    return <div style={divStyle}>

                <div style={{display:"flex", margin:'0 auto'}}>
                    <div style={{width:"155px", display:"flex"}}>
                        <h1 style={{ width:"30px", margin:"30px 0px 30px 0px"}}><b>코</b></h1>
                        <span style ={{display:"flex", width:"65px", paddingTop: "45px"}}>딩하는 사람</span>
                        <h1 style={{width:"60px", margin:"30px 0px 30px 0px"}}><b>끼리</b></h1>
                    </div>
                    <div style={{width:"985px"}}>
                        <FormGroup style={{float:"right", paddingTop: "40px"}}>
                            <InputGroup size="s">
                                <Input type="text" onKeyDown={(e)=>{}} onChange={{}} placeholder='검색어를 입력하세요' style={{boxShadow: 'none', width:"200px", display: "inline-block"}} />
                                <Button outline className="d-flex align-items-center" onClick={(e)=>{}} color="secondary" style={{width:"38px", border:"0.1px solid lightgray"}}>
                                    <Search className="ml-auto" style={{margin: '0 -3px 0 -2px', fontSize: '1.5rem' }}/>
                                </Button>
                            </InputGroup>
                        </FormGroup>
                    </div>
                </div>
                <div style={{borderTop: '0.1px solid lightgray'}}>
                    <Table >
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>작성일자</th>
                                <th>
                                    <BsFillSuitHeartFill style={{width:"20px",height:"20px",margin:"0 auto"}}/>
                                </th>
                                <th>
                                    조회수                                            
                                </th>
                            </tr>
                        </thead>
                        {console.log(cokkiriList)}

                        <tbody style={{overflow:"auto"}}>
                            {/* {this.repeatTrTd()} */}
                            {cokkiriList.map((obj) => {
                                console.log(obj);
                                return (
                                <tr key={obj.recruitDto.recruitNo}>
                                    <td>{obj.recruitDto.recruitNo}</td>
                                    <td><Link to={`/cokkiri-detail/${obj.recruitDto.recruitNo}`}>{obj.recruitDto.title}</Link></td>
                                    <td>{obj.recruitDto.writer.nickname}</td>
                                    <td>{new Date(obj.recruitDto.firstRegDate).toISOString().split('T')[0]}</td>
                                    <td>{obj.recruitDto.like}</td>
                                    <td>{obj.recruitDto.count}</td>
                                </tr> 
                                )
                            })}
                        </tbody>
                        {/* map은 각각의 요소마다 return한다. */}
                        
                    </Table>
                </div>
                <div style={{float:"right"}} >
                    <Button color='secondary'onClick={(e)=>{
                        e.preventDefault();
                        document.location.href="/cokkiri-write";
                    }}>글쓰기</Button>
                </div>
                <div style={{ clear:"both", textAlign:"center"}}>
                    {(() => {
                        const array = [];
                        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
                            if (i == pageInfo.curPage) {
                            array.push(
                                <span key={i}><Button style={{border:"none"}} color='secondary' className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
                            )
                            } else {
                            array.push(
                                <span key={i}><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
                            )
                            }
                        }
                        if(pageInfo.curPage != 1)
                        array.unshift(
                            <span ><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={pageInfo.curPage-1} onClick={pageRequest}>{"<"}</Button>&nbsp;&nbsp;</span>

                        )
                        if(pageInfo.curPage != Math.max(pageInfo.allPage))
                        array.push(
                            <span ><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={pageInfo.curPage+1} onClick={pageRequest}>{">"}</Button>&nbsp;&nbsp;</span>

                        )
                        return array;
                        })()}
                </div>
            </div>
}