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
          'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
        },
        body: body,
      });

      // access token이 유효한 경우
      if (response.status === 200 || response.status === 201) {
        var user = await response.json();
        success(user);

      // access token이 만료된 경우
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

      // 로그인 되지 않은 경우
      } else {
        fail();
      }
    
    // 오류가 발생한 경우
    } catch (error) {
      fail();
    }
  };

  // 사용자 정보를 가져오는 함수
  const getUserInfo = async () => {
    var body = JSON.stringify({});
    let userInfo = null;
  
    function success(user) {
      userInfo = user;
    };
  
    function fail() {
      userInfo = null;
    };
  
    await httpRequest('POST', '/api/authenticated/userInfo', body, success, fail);
  
    if (userInfo != null) {
      console.log("user name: " + userInfo.name);
    } else {
      console.log("비로그인한 회원입니다.")
    }
    
    return userInfo;
  };

  // async function getUserInfo() {
  //   var body = JSON.stringify({});
  //   let userInfo = null;
  
  //   function success(user) {
  //     userInfo = user;
  //   };
  
  //   function fail() {
  //     userInfo = null;
  //   };
  
  //   await httpRequest('POST', '/api/authenticated/userInfo', body, success, fail);
  
  //   if (userInfo != null) {
  //     console.log("user name: " + userInfo.name);
  //   } else {
  //     console.log("비로그인한 회원입니다.")
  //   }
    
  //   return userInfo;
  // }
  

  useEffect(() => {
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