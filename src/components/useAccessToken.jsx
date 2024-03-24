import { useState, useEffect } from "react";

export default function useAccessToken() {
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    }
  }, []);
  return accessToken;
}
