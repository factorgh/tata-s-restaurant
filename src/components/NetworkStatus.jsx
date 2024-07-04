import { useState, useEffect } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: isOnline ? "green" : "red",
        color: "white",
        textAlign: "center",
      }}
    >
      {isOnline ? "You are online" : "You are offline"}
    </div>
  );
};

export default NetworkStatus;
