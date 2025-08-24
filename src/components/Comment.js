function Comment({ comment }) {
  return (
    <div className="comments-section">
      <h3>댓글</h3>

      {/* 댓글 리스트 */}
      <div className="comments-list">
        {memo.comments && memo.comments.length > 0 ? (
          memo.comments.map((comment, idx) => (
            <div key={comment.id} className="comment-item">
              <div className="comment-info">
                <span className="comment-writer">{comment.writer}</span>
                <span className="comment-date">{comment.createdDt}</span>
              </div>
              <div className="comment-content">{comment.content}</div>
            </div>
          ))
        ) : (
          <p>아직 댓글이 없습니다.</p>
        )}
      </div>

      {/* 댓글 입력 */}
      <div className="comment-form">
        <input
          type="text"
          placeholder="작성자"
          className="comment-writer-input"
        />
        <textarea
          placeholder="댓글을 입력하세요"
          className="comment-content-input"
        ></textarea>
        <button className="comment-submit">댓글 등록</button>
      </div>
    </div>
  );
}
