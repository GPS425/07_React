import React, { useEffect, useState }  from "react";
import { axiosApi } from "../api/axiosAPI";

export default function Statistics() {
  const [readCountData, setReadCountData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [likeCountData, setLikeCountData] = useState(null);
  const [commentCountData, setCommentCountData] = useState(null);

  // 가장 조회수 많은 게시글
  const getMaxReadCount = async() => {
    try {
      const resp = await axiosApi.get("/admin/maxReadCount");

      if(resp.status === 200) {
        // 상태 세팅
        setReadCountData(resp.data);

      }

    } catch (error) {
      console.error("가장 조회수 많은 게시글 조회 오류 발생 : ", error);
    }
  }

  // 가장 좋아요 많은 게시글
  const getMaxLikeCount = async() => {
    try {
      const resp = await axiosApi.get("/admin/maxLikeCount");
      if(resp.status === 200) {
        // 상태 세팅
        setLikeCountData(resp.data);
      }
    } catch(error) {
      console.error("가장 좋아요 많은 게시글 조회 오류 발생 : ", error);
    }

  }

  // 가장 댓글 많은 게시글
  const getMaxCommentCount = async() => {
    try {
      const resp = await axiosApi.get("/admin/maxCommentCount");
      if(resp.status === 200) {
        // 상태 세팅
        setCommentCountData(resp.data);
      }
    } catch(error) {
      console.error("가장 댓글 많은 게시글 조회 오류 발생 : ", error);
    }
  }

  // 컴포넌트가 처음 마운트될 때 1번 실행
  useEffect(() => {
    getMaxReadCount();
    getMaxLikeCount();
    getMaxCommentCount();
  }
  , []);

  // readCountData, likeCountData, commentCountData 상태에 변화가 감지될 때
  // >> isLoading 상태값을 false 로 변경
  useEffect(() => {
    if(readCountData != null && likeCountData != null && commentCountData != null) {
      setIsLoading(false);
    }
  }, [readCountData, likeCountData, commentCountData]);

  if(isLoading) {
    return <h1>Loading...</h1>
  } else {

    return (
    <div>
      <section className="statistics-section">
        <h2>가장 조회수 많은 게시글</h2>
        <p>게시판 종류 : {readCountData.boardName}</p>
        <p>게시글 번호/제목 : No.{readCountData.boardNo} / {readCountData.boardTitle}</p>
        <p>게시글 조회 수 : {readCountData.readCount}</p>
        <p>작성자 닉네임 : {readCountData.memberNickname}</p>
      </section>

      <section className="statistics-section">
        <h2>가장 좋아요 많은 게시글</h2>
        <p>게시판 종류 : {likeCountData.boardName}</p>
        <p>게시글 번호/제목 : No.{likeCountData.boardNo} / {likeCountData.boardTitle}</p>
        <p>게시글 좋아요 수 : {likeCountData.likeCount}</p>
        <p>작성자 닉네임 : {likeCountData.memberNickname}</p>
      </section>

      <section className="statistics-section">
        <h2>가장 댓글 많은 게시글</h2>
        <p>게시판 종류 : {commentCountData.boardName}</p>
        <p>게시글 번호/제목 : No.{commentCountData.boardNo} / {commentCountData.boardTitle}</p>
        <p>게시글 댓글 수 : {commentCountData.commentCount}</p>
        <p>작성자 닉네임 : {commentCountData.memberNickname}</p>
      </section>
    </div>
    );
  }

  
}
