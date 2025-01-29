import React, { useEffect, useState } from "react";

const UserAPI = (token) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAdmin, setisAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/user_info", {
            headers: { Autherization: token },
          })
          setisLoggedIn(true)
          res.data.role === 1 ? setisAdmin(true) : setisAdmin(false);
        } catch (err) {
          alert(err.response.data.msg);
        }
      };
      getUser();
    }
  }, [token]);
  return {
    isLogged: [isLoggedIn, setisLoggedIn],
    isAdmin: [isAdmin, setisAdmin],
  };
};

export default UserAPI;
