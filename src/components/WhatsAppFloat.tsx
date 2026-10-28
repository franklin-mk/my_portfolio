
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import WhatsAppModal from "./WhatsAppModal";

export default function WhatsAppFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating WhatsApp Button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Contact us on WhatsApp"
        className="fixed bottom-6 right-6 z-50
          flex h-14 w-14 items-center justify-center
          rounded-full bg-green-500 text-white
          shadow-lg shadow-green-500/30
          transition hover:scale-110 hover:bg-green-600
          active:scale-95"
      >
        <MessageCircle size={28} />
      </button>

      {/* Existing WhatsApp Modal */}
      <WhatsAppModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}
