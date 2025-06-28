// "use client";

// import { Button } from "@/components/ui/button";
// import { useTransition } from "react";

// type Props = {
//   orderId: string;
//   itemId: string;
//   currentNote: string;
// };

// export default function UpdateNoteButton({ orderId, itemId, currentNote }: Props) {
//   const [isPending, startTransition] = useTransition();

//   const handleClick = async () => {
//     startTransition(async () => {
//       try {
//         const res = await fetch(`/api/orders/${orderId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ itemId, note: "processing" }),
//         });

//         if (!res.ok) throw new Error("Failed to update note");
//         window.location.reload(); // Or trigger a re-fetch with SWR/React Query
//       } catch (err) {
//         console.error("Error updating note:", err);
//       }
//     });
//   };

//   return (
//     <Button
//       onClick={handleClick}
//       disabled={isPending || currentNote === "processing"}
//       className="bg-blue-600 text-white hover:bg-blue-700"
//     >
//       {isPending ? "Updating..." : "Set to Processing"}
//     </Button>
//   );
// }



"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; // adjust if needed
import toast from "react-hot-toast";

interface Props {
  orderId: string;
  itemId: string;
  currentNote: string;
}

const UpdateNoteButton = ({ orderId, itemId, currentNote }: Props) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (currentNote === "processing") return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          note: "processing",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update note");
      }

      toast.success("Note updated to 'processing'");
    } catch (error) {
      toast.error("Error updating note");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      className="bg-green-600 text-white hover:bg-green-700"
      onClick={handleUpdate}
      disabled={loading || currentNote === "processing"}
    >
      {loading ? "Updating..." : "Mark Processing"}
    </Button>
  );
};

export default UpdateNoteButton;
