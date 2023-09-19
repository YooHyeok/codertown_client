import { useState, useEffect, useRef } from "react";
import { Form, Label, Input, Button, Col, FormGroup, Row } from 'reactstrap';
import { useSelector } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.
import axios from "axios";

export default function MyInfoEdit() {

    const userId = useSelector( (state) => {return state.UserId} );

    const [profileInputValue, setProfileInputValue] = useState({
        originalProfile:'/default_profile3.png', attachFile: null,  nickname: '', originalPwd: '', changePwd: '', changePwdChk: ''
    })

    /**
     * 컴포넌트 생명주기 Hook
     */
    useEffect(() => {
        /* 프로필 조회 */
        axios.get(`/profileImage/${userId}`)
        .then((response)=>{
            if (response.data == '') setProfileInputValue({originalProfile:'/default_profile3.png'})
            else {
            setProfileInputValue({...profileInputValue, originalProfile:`/profileImage/${userId}`})
            
            /* 프로필 데이터를 받아온 후 user정보 조회 */
            if (profileInputValue.originalProfile != '/default_profile3.png') {
                const formData = new FormData();
                formData.append('loginEmail', userId)
                /* user정보 조회 */
                axios.post('/user-info', formData)
                .then(response => {
                    setProfileInputValue({...profileInputValue, nickname:response.data.nickname, attachFile:response.data.attachFile})
                })
                .catch(error =>{
                })
            }
            }
        })
        
    }, [])

    /**
     * 컴포넌트 생명주기 Hook
     */
    useEffect(() => {
        /* 프로필 데이터를 받아온 후 user정보 조회 */
        if (profileInputValue.originalProfile != '/default_profile3.png') {
            const formData = new FormData();
            formData.append('loginEmail', userId)
            /* user정보 조회 */
            axios.post('/user-info', formData)
            .then(response => {
                setProfileInputValue({...profileInputValue, nickname:response.data.nickname, attachFile:response.data.attachFile})
            })
            .catch(error =>{
            })
        }
    }, [profileInputValue.originalProfile])

    /**
     * 첨부파일
     */
    const fileChange = (e) => {
        setProfileInputValue({ ...profileInputValue, attachFile: e.target.files[0] })
        readImage(e.target);

    }

    /* 파일 이미지 클릭 */
    const fileInputRef = useRef(null);
    const handleImageClick = () => {
        fileInputRef.current && fileInputRef.current.click();
    };

    /**
     * 프로필 
     */
    const readImage = (input) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                // setSrc(e.target.result);
                setProfileInputValue({originalProfile:e.target.result});
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    const nicknameForbidRegRef = useRef('');
    const nicknameForbidExistRef = useRef('');
    const nicknamePermitExistRef = useRef('');
    const pwdPermitRef = useRef();
    const pwdForbidRef = useRef();
    const pwdChkPermitRef = useRef();
    const pwdChkForbidRef = useRef();

    /**
     * 유효성 검증 여부 3개 출력/숨김 메소드
     * @param {*} onRef - 출력 ref
     * @param {*} offRef - 숨김 ref
     */
    const validThreeCase = (onRef,offRef1,offRef2) => {
        onRef.current.style.display = 'block';
        offRef1.current.style.display = 'none';
        offRef2.current.style.display = 'none';
    }

    /**
     * 유효성 검증 여부 2개 출력/숨김 메소드
     * @param {*} onRef - 출력 ref
     * @param {*} offRef - 숨김 ref
     */
    const validTwoCase = (onRef,offRef) => {
        onRef.current.style.display = 'block';
        offRef.current.style.display = 'none';
    }

    /**
     * 닉네임 OFF
     * @param {*} firstRef 
     * @param {*} secondRef 
     * @param {*} thirdRef 
     */
    const threeWayRefOff = (firstRef, secondRef, thirdRef) => {
        firstRef.current.style.display = 'none';
        secondRef.current.style.display = 'none';
        thirdRef.current.style.display = 'none';
    }

    /**
     * 패스워드 OFF
     * @param {*} firstRef 
     * @param {*} secondRef 
     * @param {*} thirdRef 
     */
    const twoWayRefOff = (firstRef, secondRef) => {
        firstRef.current.style.display = 'none';
        secondRef.current.style.display = 'none';
    }

    /**
         * 패스워드 일치 여부 공통 메소드
         * arg1 - 입력된 값 (패스워드 혹은 패스워드Chk)
         * arg2 - 패스워드 일치여부 비교대상
         * arg3 - NotNull : 패스워드 / null : 패스워드Chk
         * @param {*} currentValue - 입력된 값 
         * @param {*} equalPwd - 비교할 대상
         * @param {*} passwordRegFlag - pwd정규표현식 플래그
         * @returns 
         */
    const pwdChkEqual = (currentValue, equalPwd, passwordRegFlag) => {
        if (equalPwd != '') {
            let passwordChkFlag = (currentValue != '' && currentValue == equalPwd) ? true : false ;
            if (passwordChkFlag) { // 패스워드 일치 true
                validTwoCase(pwdChkPermitRef, pwdChkForbidRef);
                passwordRegFlag == null ? setFlag({...flag, passwordChkFlag: passwordChkFlag}) : setFlag({...flag, passwordRegFlag:passwordRegFlag, passwordChkFlag: passwordChkFlag});
                return;
            }
            if (!passwordChkFlag) {// 패스워드 일치 false
                validTwoCase(pwdChkForbidRef, pwdChkPermitRef);
                passwordRegFlag == null ? setFlag({...flag, passwordChkFlag: passwordChkFlag}) : setFlag({...flag, passwordRegFlag:passwordRegFlag, passwordChkFlag: passwordChkFlag});
                return;
            }
        }
        if (passwordRegFlag != null) return;
        pwdChkForbidRef.current.style.display = 'none';
        setFlag({...flag, passwordChkFlag: false}); //Flag에 false저장
    }

    /* 유효성 검증 Flag 배열 */
    const [flag, setFlag] = useState({nicknameRegFlag:true, nicknameExsitsFlag:true, passwordRegFlag:true, passwordChkFlag:true})

    const inputChange = (e) => {
        let currentName = e.target.name;
        let currentValue = e.target.value;
        setProfileInputValue({...profileInputValue, [currentName] : currentValue})

        /* 닉네임 유효성 검증 */
        if(currentName == 'nickname') {
            const nicknameRegExp = new RegExp(/^[a-zA-Z가-힣][a-zA-Z가-힣0-9]{0,9}$/);// 닉네임에 대한 정규표현식
            let nicknameRegFlag = nicknameRegExp.test(currentValue) ? true : false;

             /* 백스페이스로 모두 지웠을 경우 */
            if (currentValue == '') {
                validThreeCase(nicknameForbidRegRef,nicknameForbidExistRef,nicknamePermitExistRef);
                return;
            }
            /* 닉네임 중복여부 조회 */
            if (currentValue != '') {
                if (nicknameRegFlag) {// 정규표현식 결과 true
                    threeWayRefOff(nicknameForbidRegRef, nicknameForbidExistRef, nicknamePermitExistRef)
                    setFlag({...flag, nicknameRegFlag: nicknameRegFlag}); //Flag에 true저장

                    const formData = new FormData();
                    formData.append('nickname', currentValue)
                    axios.post('/nickname-exists', formData)
                    .then(response => {
                        if(response.data.exists) {
                            validThreeCase(nicknameForbidExistRef, nicknameForbidRegRef, nicknamePermitExistRef);
                            return;
                        }
                        if(!response.data.exists) {
                            validThreeCase(nicknamePermitExistRef, nicknameForbidRegRef, nicknameForbidExistRef);
                            return;
                        }
                    })
                    .catch(error => {

                    })
                    if (flag.nicknameRegFlag && flag.nicknameExsitsFlag) {
                        validThreeCase(nicknamePermitExistRef, nicknameForbidRegRef, nicknameForbidExistRef);
                    }
                    
                    return;
                    
                }
                if (!nicknameRegFlag) {// 정규표현식 결과 false
                    validThreeCase(nicknameForbidRegRef, nicknamePermitExistRef, nicknameForbidExistRef);
                    return;
                }
                
            }
        }
        /* 패스워드 유효성 검증 */
        if (currentName == 'changePwd') {
            setProfileInputValue({...profileInputValue, changePwd:currentValue});
            const passwordRegExp = new RegExp(/^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\-])(?=.*[A-Z]).{9,}$/);// 비밀번호에 대한 정규표현식
            let passwordRegFlag = passwordRegExp.test(currentValue) ? true : false;
            if (currentValue != '') { // 입력된 경우
                if (passwordRegFlag) { 
                    // 정규표현식 결과 true
                    validTwoCase(pwdPermitRef, pwdForbidRef);
                    setFlag({...flag, passwordRegFlag: passwordRegFlag}); //Flag에 true저장
                    pwdChkEqual(currentValue, profileInputValue.changePwdChk, passwordRegFlag);
                    return;
                    
                }
                if (!passwordRegFlag) {
                    // 정규표현식 결과 false
                    validTwoCase(pwdForbidRef, pwdPermitRef);
                    setFlag({...flag, passwordRegFlag:passwordRegFlag}); //Flag에 flase저장            
                    pwdChkEqual(currentValue, profileInputValue.changePwdChk, passwordRegFlag);
                    return;
                }
                return;
            }
            if (currentValue == '') {
                // 백스페이스로 모두 지웠을경우
                pwdChkEqual(currentValue, profileInputValue.changePwdChk, passwordRegFlag);
                twoWayRefOff(pwdPermitRef, pwdForbidRef);
                // setFlag({...flag, passwordRegFlag: passwordRegFlag});
                return;
            }
        }
        /* 패스워드 확인 유효성 검증 */
        if (currentName == 'changePwdChk') {
            setProfileInputValue({...profileInputValue, changePwdChk:currentValue});
            pwdChkEqual(currentValue, profileInputValue.changePwd, null);
            if (currentValue == '') {// 백스페이스로 모두 지웠을경우
                twoWayRefOff(pwdChkPermitRef, pwdChkForbidRef);
                return;
            }
        }
    }



    /**
     * JSX 시작
     */
    return (
        <Form style={{ width: "300px", height:'500px', margin: '20px auto'}}>
            {/* 프로필 */}
            <FormGroup row  style={{margin:'20px auto', width:'200px', height:'150px'}} >
                <Col sm={12}>
                    <input ref={fileInputRef} type="file" name="file" id="file" onChange={fileChange} accept='image/*' style={{ display:'none'}}/> 
                    <img className="profile" src={profileInputValue.originalProfile} alt="profile" onClick={handleImageClick}/>
                    <img style={{filter: 'hue-rotate(6deg)', position:'relative', bottom:'45px', left:'55px', width:'32px', height:'32px'}} src="/free-icon-pencil.png" alt="profile edit"/>
                </Col>
            </FormGroup>
            {/* 닉네임 */}
            <FormGroup >
                <Col sm={12}>
                    <Label htmlFor='nickname' style={{width:'75px', textAlign:'left', float:'left'}}>닉&nbsp;&nbsp;네&nbsp;&nbsp;임</Label>
                    <span ref={nicknameForbidRegRef} style={{display:'none', color:'red'}}>&#10060; 닉네임 양식 오류</span>
                    <span ref={nicknameForbidExistRef} style={{display:'none', color:'red'}}>&#10060; 이미 사용중 입니다</span>
                    <span ref={nicknamePermitExistRef} style={{display:'none', color:'#0d6efd'}}>&#10004; 사용가능</span>
                    <Input type='text' name='nickname' id='nickname' value={profileInputValue.nickname} placeholder="첫글자 한or영문자 & 특수문자를 제외한 10자리 " onChange={inputChange} required />
                </Col>
            </FormGroup>
            {/* 패스워드 */}
            <FormGroup >
                <Col sm={12}>
                    <Label htmlFor='changePwd' style={{width:'75px', textAlign:'left', float:'left'}}>패스워드 변경</Label>
                    <span ref={pwdPermitRef} style={{display:'none', color:'#0d6efd'}}>&#10004; 사용가능</span>
                    <span ref={pwdForbidRef} style={{display:'none', color:'red'}}>&#10060; 패스워드 사용불가</span>
                    <Input type='text' name='changePwd' id='changePwd' value={profileInputValue.changePwd} placeholder="특수문자/대문자 각각 1자 이상 & 최소 10자리" onChange={inputChange} required />
                </Col>
            </FormGroup>
            <FormGroup >
                <Col sm={12}>
                    <Label htmlFor='changePwdChk' style={{width:'75px', textAlign:'left',float:'left'}}>패스워드 확인</Label>
                    <span ref={pwdChkPermitRef} style={{display:'none', color:'#0d6efd'}}>&#10004; 패스워드 일치</span>
                    <span ref={pwdChkForbidRef} style={{display:'none', color:'red'}}>&#10060; 패스워드 불일치</span>
                    <Input type='text' name='changePwdChk' id='changePwdChk' value={profileInputValue.changePwdChk} placeholder="재입력" onChange={inputChange} required />
                </Col>
            </FormGroup>
            <FormGroup>
                <Col sm={12}>
                    <Label htmlFor='originalPwd' style={{float:'left'}} >기존 패스워드</Label>
                    <Input type='text' name='originalPwd' id='originalPwd' value={profileInputValue.originalPwd} placeholder="정보 변경시 본인확인 필수입력" onChange={inputChange} required />
                </Col>         
            </FormGroup>
            {/* 수정 완료 버튼 */}
            <FormGroup row>
                <Col sm={6}>
                    <Button color='primary' outline style={{width:'139px'}} onClick={(e)=>{e.preventDefault();}}>초기화</Button>
                </Col>
                <Col sm={6}>
                    <Button color='secondary' style={{width:'139px'}} onClick={(e)=>{e.preventDefault();
                    console.log(flag)
                    }}>저장</Button>
                </Col>
            </FormGroup>
            <FormGroup row >
                <Col sm={15} >
                    <Button color='danger' outline style={{width:'300px'}} onClick={(e)=>{e.preventDefault();}}>회원탈퇴</Button>
                </Col>
            </FormGroup>
        </Form>
    )
}