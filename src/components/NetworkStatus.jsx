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
        borderRadius: 20,
        fontSize: 10,
        opacity: isOnline ? 0.2 : 0.5,
      }}
    >
      {isOnline ? "You are online" : "You are offline"}
    </div>
  );
};

export default NetworkStatus;
