import axios from "axios";
import { createContext, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export const AuthContext = createContext();

// Context는 Provider와 Consumer로 구성됨.

// 전역 상태 제공자(Provider)
export const AuthProvider = ({children}) => {
	// 상태값, 함수
	// 전역적으로 현재 로그인한 회원의 정보를 기억할 상태 정의
	const [user, setUser] = useState(() => {
		const storeUser = localStorage.getItem("userData");
		return storeUser ? JSON.parse(storeUser) : null;
	});

	const [email,setEmail] = useState("");
	const [password,setPassword] = useState("");

	// 이메일 입력 핸들러
	const changeInputEmail = (e) => {
		setEmail(e.target.value);
	}

	// 패스워드 입력 핸들러
	const changeInputPw = (e) => {
		setPassword(e.target.value);
	}

	// 로그인 처리 함수
	const handleLogin = async(e) => {
		e.preventDefault();
		// 기본적으로 발생하는 이벤트 막기

		// 비동기 로그인 요청 >> 서버로
		const response = await axiosApi.post("/admin/login", 
			{ memberEmail : email, memberPw : password }
		);

		console.log(response);

		// response JS OBJ 형태로 저장됨
		// response.status : 200
		// response.data : 응답데이터

		const adminInfo = response.data;

		if(adminInfo.length === 0) {
			alert("이메일 또는 비밀번호가 일치하지 않습니다.");
			return;
		}
		// 상태에 세팅
		setUser(adminInfo);

		// 데이터를 로컬 스토리지에 저장
		localStorage.setItem("userData", JSON.stringify(adminInfo));

		// 만료시간 지정(1시간 뒤에 로그아웃) 타이머 설정
		setTimeout(() => {
			localStorage.removeItem("userData");
			setUser(null);
			alert("세션이 만료되어 자동 로그아웃 되었습니다.");
			window.location.href = "/";
		}, 3600000); // 1시간 = 3600000밀리초
	}

	// 로그아웃 처리 함수
	const handleLogout = async() => {
		try {
			const resp = await axiosApi.get("/admin/logout");

			if(resp.status == 200) {
				localStorage.removeItem("userData");
				setUser(null);
				alert("로그아웃 되었습니다.");
				window.location.href = "/";
			}
		} catch (error) {
			console.error("로그아웃 중 문제 발생 : ", error);
		}
	}

	// 자식(하위) 컴포넌트에게 전달할 데이터를 하나로 묶기
	const globalState = {
		user,	// ==  (user : user(State 값))
		email,
		password,
		changeInputEmail,
		changeInputPw,
		handleLogin,
		handleLogout
	}

	return (
		<AuthContext.Provider value={globalState}>
			{children}
		</AuthContext.Provider>

	)
}

// 브라우저에서 현재 로그인한 회원(관리자)의 정보를 기억하도록 해야 함.
// localStorage :
// - 브라우저를 닫아도 데이터가 영구적으로 유지
// - 브라우저 전역에서 사용(모든 탭과 창에서 공유됨)
// - 유효기간 만료 기능 없음

// - sessionStorage :
// - 브라우저 탭 또는 창을 닫으면 데이터가 즉시 삭제
// - 현재 탭 또는 창에서만 데이터가 유지됨
// - 유효기간 만료 기능 없음