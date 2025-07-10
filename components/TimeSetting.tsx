// "use client";

// import { useEffect, useState } from "react";

// const TimeSetting = () => {
//   const [showMessage, setShowMessage] = useState(false);

//   useEffect(() => {
//     const checkTime = () => {
//       const now = new Date();
//       const hours = now.getHours();
//       const minutes = now.getMinutes();

//       if (hours === 19 && minutes === 58) {
//         setShowMessage(true);

//         // Hide message after 5 seconds
//         setTimeout(() => setShowMessage(false), 5000);
//       }
//     };
//     // Check every 30 seconds
//     const interval = setInterval(checkTime, 30 * 1000);

//     // Run once immediately
//     checkTime();

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       {showMessage && (
//         <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
//           The kitchen will be closed in 30 minutes. Please place your orders
//           now.
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeSetting;

"use client";

import { useEffect, useState } from "react";
import MenuList from "@/components/Memu/MenuList";

const TimeSetting =() =>{
  const [showMessage, setShowMessage] = useState(false);
  const [hasShownToday, setHasShownToday] = useState(false);

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Only trigger at 20:00 once per day
      if (hours === 20 && minutes === 0 && !hasShownToday) {
        setShowMessage(true);
        setHasShownToday(true);

        // Hide after 5 seconds
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      }

      // Reset flag after midnight
      if (hours === 0 && minutes === 0) {
        setHasShownToday(false);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkTime, 30 * 1000);

    // Run once immediately
    checkTime();

    return () => clearInterval(interval);
  }, [hasShownToday]);

  return (
    <div>
      {showMessage && (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
          ⏰ It's 20:00! Evening promo is live!
        </div>
      )}

      <MenuList />
    </div>
  );
}

export default TimeSetting;