import { useContext } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { HeaderDropDownContext } from "../Header";
import { PersonCircle } from 'react-bootstrap-icons';

import { useDispatch } from 'react-redux'; // redux state값을 읽어온다 토큰값과 userId값을 가져온다.

export default function HeaderDropDownLogout() {

  const context = useContext(HeaderDropDownContext);
  const dispatch = useDispatch();

  const logout = (e) => { //토큰값, userId 초기화
    e.preventDefault();
    dispatch({ type: "NEWTOKEN", data: '' })
    dispatch({ type: "USERID", data: '' })
    document.location.href = '/';
  }
  return (
    <Dropdown isOpen={context.dropdownOpenLogOut} fade="true" toggle={context.toggleLogOut}>
      <DropdownToggle caret style={{ backgroundColor: "rgb(0,0,0,0)", border: "none" }}>
        <PersonCircle className="inline" size={30} style={{ color: "black" }}/> {/* 추후 프로필사진 출력 */}
      </DropdownToggle>
      <DropdownMenu>
        <Link to={'/mypage'}><DropdownItem style={{ lineHeight: "25px" }} ><b>마이페이지</b></DropdownItem></Link>
        <DropdownItem style={{ lineHeight: "25px" }} divider />
        <Link onClick={logout}><DropdownItem style={{ lineHeight: "25px" }} ><b>로그아웃</b></DropdownItem></Link>
      </DropdownMenu>
    </Dropdown>
  );
}