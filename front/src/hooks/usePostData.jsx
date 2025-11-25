
// src/hooks/usePostData.js
import { useState, useCallback } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const usePostData = () => {
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const action = useCallback(
    async (path, body = {}) => {
      try {
        setLoading(true);
        setError(null);

        const currentUser = auth.currentUser;
        let token = currentUser ? await currentUser.getIdToken() : null;

        const response = await fetch(path, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if(response.status !== 200)
        {
          navigate(
            !token
            ? '/auth'
            : "/error", { state: { code: response.status, message: data.message || "Algo salió mal" } }
          );
        }

        setResponseData(data);
      } catch (err) {
        console.error(err);
        navigate("/error", { state: { code: 500, message: err.message } });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { responseData, loading, error, action };
};


