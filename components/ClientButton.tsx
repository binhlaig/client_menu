

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
    if (currentNote === "completed") return;

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
          note: "completed",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update note");
      }

      toast.success("Note updated to 'completed'");
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
      disabled={loading || currentNote === "completed"}
    >
      {loading ? "Updating..." : "Mark completed"}
    </Button>
  );
};

export default UpdateNoteButton;
