import React from "react";

//props로 className, content, onClose, onEdit 받기
const Memo = ({ memo, onClick }) => {
  if (!memo.content) return null;

  const formatDateSimple = (dateString) => {
    return dateString.replace("T", " ");
  };

  /*
  @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 메모 식별자

    @Column(nullable = false)
    private String writer;

    @Column(name = "user_id")
    private String userId; // 사용자 ID (nullable)

    @Column(nullable = false)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content; // 메모 내용

    @Column(name = "create_dt", nullable = false)
    private LocalDateTime createDt; // 작성일

    @Column(name = "updated_dt", nullable = false)
    private LocalDateTime updatedDt; // 최근 수정일

    @Column(name = "deleted_dt")
    private LocalDateTime deletedDt; // 삭제일

    @Column(length = 255)
    private String password; // 익명 작성 시 수정/삭제용 비밀번호

    @Column(nullable = false)
    private String shape; // 메모 모양

    @Column(nullable = false)
    private String color; // 메모 색상

    @Column(nullable = false)
    private boolean isSearch; // 메모 색상
  
  */

  return (
    <div className="MemoDetail-backdrop">
      <div className="MemoDetail-content" onClick={onClick}>
        <div className="memo_info">
          <div className="writer-style">by. {memo.writer}</div>
        </div>
        <div className="content-style">{memo.title}</div>
        {/* <div className="MemoDetail-buttons">
          <button onClick={onEdit}>수정</button>
          <button onClick={onDelete}>삭제</button>
          <button onClick={onClose}>닫기</button>
        </div> */}
      </div>
    </div>
  );
};

export default Memo;
