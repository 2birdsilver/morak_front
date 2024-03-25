import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuth } from '../components/AuthContext';

function MyPage() {

    const [intro, setIntro] = useState('');
    const [keyboard, setKeyboard] = useState('');
    const [mouse, setMouse] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { getUserInfo } = useAuth();

    const maxLength = 50;

    const handleMyInfoSubmit = async (e) => {
        e.preventDefault();

        // 내 정보 수정
        let data = new FormData();
        data.append('userId', currentUser.id);
        data.append('introduction', intro ? intro : currentUser.introduction);
        if (keyboard) data.append("keyboard", keyboard);
        if (mouse) data.append("mouse", mouse);

        let config = {
            method: 'POST', // POST 메서드로 변경
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'multipart/form-data',
            },
            maxBodyLength: Infinity,
            url: `/auth/myinfo/update`,
            data: data,
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                alert("정보가 수정되었습니다.")
            })
            .catch((error) => {
                console.log(error);
                alert("정보 수정에 실패하였습니다.")
            });
    }


    // 사용자 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserInfo();
            setCurrentUser(user);
        };

        fetchData();

        return () => {
        };
    }, [getUserInfo]);

    return (
        <div className='wrap memo'>
            {/* <button className='logout-btn' onClick={handleLogout}>로그아웃</button> */}
            <div className='post-form-container'>
                <h1>마이페이지</h1>
                <form className="post-form" onSubmit={handleMyInfoSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={currentUser ? currentUser.name : ''}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder=''
                            value={currentUser ? currentUser.email : ''}
                            disabled
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro">프로필 글</label>
                        <input
                            type="text"
                            id="intro"
                            name="intro"
                            maxLength={maxLength}
                            // value={currentUser ? currentUser.introduction : ''}
                            placeholder={currentUser ? currentUser.introduction : ''}
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="keyboard">내 키보드</label>
                        <input
                            type="file"
                            id="keyboard"
                            name="keyboard"
                            onChange={(e) => setKeyboard(e.target.files[0])}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="mouse">내 마우스</label>
                        <input
                            type="file"
                            id="mouse"
                            name="mouse"
                            onChange={(e) => setMouse(e.target.files[0])}
                        />
                    </div>

                    <div className='fileText'>
                        <div>⚠ 1MB 이하 이미지를 첨부해주세요.</div>
                        <div>⚠ 키보드는 가로가 더 긴 이미지로</div>
                        <div>⚠ 배경을 제거하는 것을 추천</div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="p-btn my-btn">수정</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MyPage;