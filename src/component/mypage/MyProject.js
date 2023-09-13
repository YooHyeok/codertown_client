import { useState, useEffect, useRef } from "react";
import {  Button, Table, FormGroup, InputGroup, Input, } from 'reactstrap';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

import { Search } from 'react-bootstrap-icons';

import axios from "axios";

export default function MyProject() {

    const selectRef = useRef(null);

    const userId = useSelector( (state) => {return state.UserId} );

    const [projectList , setProjectList] = useState([])
    const [articleCount , setArticleCount] = useState('') // 게시글 갯수

    const [pageInfo, setPageInfo] = useState({
        allPage: 10, curPage: 1, startPage: 1, endPage: 10
      });

    const pageRequest = (e) => {
        serverRequest(e.target.value, keyword);
    }

    const [keyword , setKeyword] = useState('')
    const inputChange = (e) => {
        setKeyword(e.target.value);
    }

    /**
     * 코끼리 목록 출력 - 호스트 서버 통신 메소드
     * @param {} page : 선택된 페이지 정보 파라미터
     */
    const serverRequest = (page, keyword) => {
        // axios.get(`/recruit?page=${page}&dType=Cokkiri&keyword=${keyword}&loginId=${userId}`)
        axios.get(`/joinedProject?loginId=${userId}`)
        .then((response)=> {
            console.log(response.data)
            setProjectList(response.data.projectList)
            setArticleCount(response.data.articleCount)
            setPageInfo(response.data.pageInfo)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    /**
     * 컴포넌트 생명주기 Hook
     */
    useEffect(() => {
        serverRequest(1, keyword)
      }, [])
    


    /**
     * JSX 시작
     */
    return (
    <>
        <div style = {{display:"flex", height:"60px"}}>
            <div style={{width:"140px", height:"32px", paddingTop:"5px"}}>
                <h1 style={{ width:"140px", height:"30px"}}><b>프로젝트</b></h1>
            </div>
            <span style ={{display:"flex", width:"65px", paddingTop: "20px", color:'gray'}}>{articleCount}개</span>
            <div style={{width:"1000px"}}>
                <FormGroup style={{float:"right", paddingTop: "10px"}}>
                    <InputGroup size="s">
                        <Input type="text" onChange={inputChange} placeholder='검색어를 입력하세요' style={{boxShadow: 'none', width:"200px", display: "inline-block"}} />
                        <Button outline className="d-flex align-items-center" onClick={(e)=>{serverRequest(1, keyword);}} color="secondary" style={{width:"38px", border:"0.1px solid lightgray"}}>
                            <Search className="ml-auto" style={{margin: '0 -3px 0 -2px', fontSize: '1.5rem' }}/>
                        </Button>
                    </InputGroup>
                </FormGroup>
            </div>
        </div>
        <div style={{borderTop: '0.1px solid lightgray', height:"420px", margin:"20px auto"}}>

            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>직급(팀장/팀원)</th>
                        <th>프로젝트(팀)명</th>
                        <th>목표 기간(주)</th>
                        <th>시작일</th>
                        <th>종료(예정)</th>
                        <th>전체 상태</th>
                        <th>개인 상태</th>
                        <th>현황 상세</th>
                    </tr>
                </thead>
                <tbody style={{overflow:"auto"}}>
                    { projectList.map((obj, i) => {
                        return (
                            <tr key={obj.partDto.partNo}>
                            <td>{obj.partDto.partNo}</td>
                            <td>{obj.partDto.partNo === 1 ? "팀장" : "팀원"}</td>
                            <td>{obj.projectDto.teamName}</td>
                            <td>{obj.projectDto.objectWeek}</td>
                            <td>{obj.firstRegDate}</td>
                            <td>{obj.firstRegDate}</td>
                            <td>
                            <select disabled={obj.partDto.partNo !== 1} ref={selectRef} name="" id="statusSelect" value={obj.projectDto.projectStatus} onChange={(e)=>{e.preventDefault();}}
                                style={{
                                    display: obj.partDto.partNo !== 1 ? "none" : "inline"
                                , textAlign: "center"
                                , appearance: "none"
                                , width:"50px"
                                , paddingRight:"-20px"
                                , lineHeight:"normal"
                                , height:"20px"
                                , fontSize:"15px"
                                , borderTop:"none"
                                , borderLeft:"none"
                                , borderBottom:"1px solid lightGray"
                                , borderRight:"1px solid lightGray"
                            }}>
                                <option value={"RECRUIT"}>모집</option>
                                <option value={"RUN"}>진행</option>
                                <option value={"FAIL"}>무산</option>
                                <option value={"CLOSED"}>완료</option>
                            </select>
                            </td>
                            <td>{obj.count}</td>
                            <td style={{ padding:"0.5em"}}>
                                <Button color='secondary' style={{ width: '70px', padding:"0.5em", height:"25px" }} onClick={(e)=>{e.preventDefault();}}>
                                    <span style={{position:"relative", height:"20px", top:"-9px", fontSize:"14px"}}>상세보기</span>
                                </Button>
                            </td>
                        </tr>
                        )
                    }) }
                </tbody>
            </Table>
        </div>
        <div style={{marginTop:"50px", textAlign:"center"}}>
        {(() => {
                        const array = [];
                        if(articleCount == 0) {
                            array.push(
                            <span key={1}><Button style={{border:"none"}} color='secondary' className='numberbutton' value={1} onClick={(e)=>{
                            e.preventDefault();
                            }
                            }>1</Button>&nbsp;&nbsp;</span>
                        )
                        return array;
                        }
                        for (let i = pageInfo.startPage; i <= pageInfo.endPage; i++) {
                            if (i == pageInfo.curPage) {
                            array.push(
                                <span key={i}><Button style={{border:"none"}} color='secondary' className='numberbutton' value={i} onClick={(e)=>{
                                    if(pageInfo.curPage === i) return;
                                    pageRequest(e)}}>{i}</Button>&nbsp;&nbsp;</span>
                            )
                            } else {
                            array.push(
                                <span key={i}><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={i} onClick={pageRequest}>{i}</Button>&nbsp;&nbsp;</span>
                            )
                            }
                        }
                        if(articleCount != 0)
                        array.unshift(
                            <span key={"prev"}><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={pageInfo.curPage-1} onClick={(e)=>{
                                if(pageInfo.curPage === 1) return;
                                pageRequest(e)}}>{"<"}</Button>&nbsp;&nbsp;</span>
                        )
                        if(articleCount != 0)
                        array.push(
                            <span key={"next"}><Button style={{border:"none"}} outline color='secondary' className='numberbutton' value={pageInfo.curPage+1} onClick={(e)=>{
                                if(pageInfo.curPage === Math.max(pageInfo.allPage)) return;
                                pageRequest(e)}}>{">"}</Button>&nbsp;&nbsp;</span>
                        )
                        return array;
                        })()}
        </div>
    </>)

}