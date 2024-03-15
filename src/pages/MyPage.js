import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function MyPage() {

    const navigate = useNavigate();
    const [id, setId] = useState();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [intro, setIntro] = useState('');
    const [keyboard, setKeyboard] = useState('');
    const [mouse, setMouse] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const { getUserInfo } = useAuth();

    const handleLogout = () => {
        alert("로그아웃되었습니다.");
        localStorage.clear();
        navigate('/');
    }

    const fetchDataFromServer = async () => {
        try {
            const response = await axios.get(`/api/user`); // Modify the URL according to your API endpoint
            const userData = response.data; // Assuming the response contains user data
            setCurrentUser(userData);
        } catch (error) {
            console.error(error);
        }
    };

    const handleMyInfoSubmit = async () => {
        console.log("내 정보 수정");

        // 리뷰 수정 데이터 보내기
        let data = new FormData();
        data.append('id', id);
        data.append('Introduction', intro);

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `/api/user`,
            data: data
        };

        try {
            const res = await axios.request(config);
            console.log("res: " + res)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const user = await getUserInfo();
            setCurrentUser(user);
            if (user) {
                setId(user.id); // Assuming user.id exists in your user object
                await fetchDataFromServer();
            }
        };

        fetchData(); // 컴포넌트 마운트 시 호출

        return () => {
        };
    }, [getUserInfo]);

    return (
        <div className='wrap memo'>
            <button className='logout-btn' onClick={handleLogout}>로그아웃</button>
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
                            value={keyboard}
                            onChange={(e) => setKeyboard(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="intro">내 마우스</label>
                        <input
                            type="file"
                            id="mouse"
                            name="mouse"
                            value={mouse}
                            onChange={(e) => setMouse(e.target.value)}
                        />
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
