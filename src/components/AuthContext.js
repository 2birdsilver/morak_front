import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 쿠키를 가져오는 함수
  function getCookie(key) {
    var result = null;
    var cookie = document.cookie.split(';');
    cookie.some(function (item) {
      item = item.replace(' ', '');

      var dic = item.split('=');

      if (key === dic[0]) {
        result = dic[1];
        return true;
      }
    });

    return result;
  }

  // HTTP 요청을 보내는 함수
  const httpRequest = async (method, url, body, success, fail) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
        body: body,
      });

      if (response.status === 200 || response.status === 201) {
        var user = await response.json(); // JSON 데이터 파싱
        success(user); // 파싱된 데이터를 success 콜백에 전달
      } else if (response.status === 401 && getCookie('refresh_token')) {
        const res = await fetch('/api/token', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            refreshToken: getCookie('refresh_token'),
          }),
        });

        if (res.ok) {
          const result = await res.json();
          localStorage.setItem('access_token', result.accessToken);
          await httpRequest(method, url, body, success, fail);
        } else {
          fail();
        }
      } else {
        fail();
      }
    } catch (error) {
      fail();
    }
  };

  // 사용자 정보를 가져오는 함수
  async function getUserInfo() {
    var body = JSON.stringify({});
    let userInfo = null;

    function success(user) {
      userInfo = user;
    };

    function fail() {
    };

    await httpRequest('POST', '/api/userInfo', body, success, fail);
    return userInfo;
  }

  useEffect(() => {
    // 여기에서 초기 로직 수행
  }, []);

  return (
    <AuthContext.Provider value={{ user, getUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
