"use client";

import PendingOrders from "@/components/PendingOrders";
import { useEffect, useState } from "react";

export default function Page() {
  const [showMessage, setShowMessage] = useState(false);
  const [hasShownToday, setHasShownToday] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      console.log(`Current time: ${hours}:${minutes}`); // 👈 DEBUG

      // Show at 20:11
      if (hours === 20 && minutes === 56 && !hasShownToday) {
        setShowMessage(true);
        setHasShownToday(true);

        // Hide after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 15 * 1000);
      }
      // Reset hasShownToday after midnight
      if (hours === 0 && minutes === 0) {
        setHasShownToday(false);
      }
    };

    const interval = setInterval(checkTime, 15 * 1000); // Check more frequently

    checkTime(); // Run once on load

    return () => clearInterval(interval);
  }, [hasShownToday]);

  return (
    <div>
      {showMessage && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4 text-center">
          ⏰ It's 20:11! Evening promo is live!
        </div>
      )}
      <PendingOrders />
    </div>
  );
}

