import React, { useEffect, useState } from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Restore() {
  const [withdrawnMembers, setWithdrawnMembers] = useState(null);
  const [deleteBoards, setDeleteBoards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 탈퇴한 회원 목록 조회용 함수
  const getWithdrawnMemberList = async() => {
    try {
      const resp = await axiosApi.get("/admin/withdrawnMemberList");
      if(resp.status === 200) {
        setWithdrawnMembers(resp.data);
      }

    } catch (error) {
      console.error("탈퇴한 회원 목록 조회 오류 발생 : ", error);
    }
  }

  // 탈퇴한 회원 복구 요청 함수
  const restoreMember = async(member) => {
    if(window.confirm(member.memberNickname + " 님을 탈퇴 복구시키시겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreMember", { memberNo : member.memberNo});
        if(resp.status === 200) {
          alert("탈퇴 회원 복구가 완료되었습니다.");
          // 탈퇴 회원 목록 다시 조회
          getWithdrawnMemberList();
        }
      } catch (error) {
        console.error("탈퇴 회원 복구 오류 발생 : ", error);
      }
    }
  }

  // 삭제된 게시글 목록 조회용 함수
  const getDeleteBoardsList = async() => {
    try {
      const resp = await axiosApi.get("/admin/deletedBoardsList");
      if(resp.status === 200) {
        setDeleteBoards(resp.data);
      }
    } catch (error) {
      console.error("삭제된 게시글 목록 조회 오류 발생 : ", error);
    }
  }

  // 삭제된 게시글 복구 요청 함수
  const restoreBoard = async(board) => {
    if(window.confirm(board.boardNo + "번 게시글을 복구시키시겠습니까?")) {
      try {
        const resp = await axiosApi.put("/admin/restoreBoard", { boardNo : board.boardNo});
        if(resp.status === 200) {
          alert("삭제된 게시글 복구가 완료되었습니다.");
          // 삭제된 게시글 목록 다시 조회
          getDeleteBoardsList();
        }
      } catch (error) {
        console.error("삭제된 게시글 복구 오류 발생 : ", error);
      }
    }
  }

  // Restore 컴포넌트가 처음 마운트될 때 실행
  useEffect(() => {
    getWithdrawnMemberList();
    getDeleteBoardsList();
  }, []);

  // withdrawnMembers, deletedBoards 상태에 변화가 감지될 때
  // >> isLoading 상태값을 false 로 변경
  useEffect(() => { 
    if(withdrawnMembers != null && deleteBoards != null) {
      setIsLoading(false);
    }
  }, [withdrawnMembers, deleteBoards]);

  if(isLoading) {
    return <h1>Loading...</h1>
  } else {
    return (
    <div className="menu-box">
      <section className="section-border">
        <h2>탈퇴 회원 복구</h2>

        <h3>탈퇴한 회원 목록</h3>

        {withdrawnMembers.length === 0 ? (
          <p>탈퇴한 회원이 없습니다.</p>
        ) : (
        withdrawnMembers.map((member, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>회원 번호 : {member.memberNo}</li>
              <li>회원 이메일 : {member.memberEmail}</li>
              <li>회원 닉네임 : {member.memberNickname}</li>
              <button className="restore-btn" onClick={() => restoreMember(member)}>복구</button>
            </ul>
          )
        })
      )}
      </section>

      <section className="section-border">
        <h2>삭제 게시글 복구</h2>

        <h3>삭제된 게시글 목록</h3>

        {deleteBoards.length === 0 ? (
          <p>삭제된 게시글이 없습니다.</p>
        ) : (
        deleteBoards.map((board, index) => {
          return (
            <ul className="ul-board" key={index}>
              <li>게시글 번호 : {board.boardNo}</li>
              <li>게시글 제목 : {board.boardTitle}</li>
              <li>게시판 종류 : {board.boardName}</li>
              <button className="restore-btn" onClick={() => restoreBoard(board)}>복구</button>
            </ul>
          )
        })
      )}
      </section>
    </div>
  );
  }
}
