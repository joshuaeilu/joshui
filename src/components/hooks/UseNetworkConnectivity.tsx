import { useEffect, useState } from "react";

export default function useNetworkConnectivity() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    window.addEventListener("online", () => setIsConnected(true))
    window.addEventListener("offline", () => setIsConnected(false))
  }, [])

  return isConnected;
}