import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { useAuth } from '../components/AuthContext';

function Postit() {

    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const goback = () => {
        navigate(-1);
    };

    const { getUserInfo } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [authenticatedWriter, setAuthenticatedWriter] = useState(null);

    
    const [writer, setWriter] = useState('');
    const [password, setPassword] = useState('');
    const [content, setContent] = useState('');
    const [shape, setShape] = useState('square');
    const [color, setColor] = useState('beige');
    const [recipient, setRecipient] = useState(false);

    const [memoId, setMemoId] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const maxWriterLength = 20;
    const maxLength = 255;

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const editMode = searchParams.get('edit') === 'true';

        if (editMode) {
            setIsEditing(true);
            axios.get(`/api/memo/update/${params.id}`)
                .then((res) => {
                    const { writer, content, shape, color } = res.data;
                    setWriter(writer);
                    setContent(content);
                    setShape(shape);
                    setColor(color);
                    setMemoId(params.id);
                    // 비밀번호 관련 처리는 상황에 따라 다름
                })
                .catch((err) => console.error("Error fetching memo data:", err));
        } else {
            setRecipient(params.id)
        }

        // 페이지가 마운트될 때 사용자 정보 업데이트
        updateProfile();
    }, [params.id, location.search]);

    const updateProfile = async () => {
        const user = await getUserInfo();

        if (user) {
            setCurrentUser(user);
            setAuthenticatedWriter(user.id);
        } else {
            setCurrentUser(null);
        }
    };

    const handlePostitSubmit = async (e) => {
        e.preventDefault();

        const memoData = {
            writer,
            recipient,
            content,
            password,
            shape,
            color,
            authenticatedWriter
        };

        const headData = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
            }
        };

        if (isEditing) {
            // 수정 로직
            axios
                .put(`/api/memo/${memoId}`, memoData, headData)
                .then((res) => {
                    alert("포스트잇 수정을 완료하였습니다.");
                    navigate(-1); // 또는 수정 후 보여줄 페이지로 이동
                })
                .catch((err) => {
                    alert("포스트잇 수정이 실패하였습니다.");
                    console.log(err);
                });
        } else {
            // 등록 로직
            axios
                .post("/api/memo", memoData, headData)
                .then((res) => {
                    alert("포스트잇 등록을 완료하였습니다.");
                    navigate(-1);
                })
                .catch((err) => {
                    alert("포스트잇 등록을 실패하였습니다.");
                    console.log(err);
                })
        }
    };


    return (
        <div className='wrap memo'>
            <button className='back-btn' onClick={goback}>◀ 뒤로가기</button>
            <div className={`post-form-container ${color}`}>
                <h2 className='m-title'>메모 남기기</h2>
                <form className="post-form" onSubmit={handlePostitSubmit}>

                    <div className="form-group">
                        <label htmlFor="writer">닉네임</label>
                        {currentUser !== null ? (
                            <input
                                type="text"
                                id="nickname"
                                name="writer"
                                value={currentUser.name}
                                readOnly
                            />
                        ) : (
                            <input
                                type="text"
                                id="nickname"
                                name="writer"
                                value={writer}
                                maxLength={maxWriterLength}
                                onChange={(e) => setWriter(e.target.value)}
                            />
                        )}
                    </div>

                    {currentUser == null && (
                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder='비밀번호를 꼭 기억해주세요'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="content">내용</label>
                        <textarea
                            id="content"
                            name="content"
                            rows="10"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={maxLength}
                        ></textarea>
                    </div>
                    <div className='textCount'>글자수 {content.length} / 255</div>
                    {/* 모양 선택 */}
                    <div className="form-group">
                        <label>모양</label>
                        <div className='label-container'>
                            <label style={{ marginRight: '20px' }}>
                                <input
                                    type="radio"
                                    name="shape"
                                    value="square"
                                    checked={shape === "square"}
                                    onChange={(e) => setShape(e.target.value)} />
                                Square
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="shape"
                                    value="heart"
                                    checked={shape === "heart"}
                                    onChange={(e) => setShape(e.target.value)}
                                />
                                Heart
                            </label>
                        </div>
                    </div>
                    {/* 색상 선택 */}
                    <div className="form-group">
                        <label>색상</label>
                        <div className='label-container'>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="radio"
                                    name="color"
                                    value="beige"
                                    checked={color === "beige"}
                                    onChange={(e) => setColor(e.target.value)}
                                /> Beige
                            </label>
                            <label style={{ marginRight: '10px' }}>
                                <input
                                    type="radio"
                                    name="color"
                                    value="pink"
                                    checked={color === "pink"}
                                    onChange={(e) => setColor(e.target.value)}
                                /> Pink
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="color"
                                    value="skyblue"
                                    checked={color === "skyblue"}
                                    onChange={(e) => setColor(e.target.value)}
                                /> Skyblue
                            </label>
                        </div>
                    </div>
                    <div className="form-buttons">
                        {isEditing ? (
                            <button type="submit" className="p-btn">수정</button>
                        ) : (
                            <button type="submit" className="p-btn add-btn">등록</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Postit;