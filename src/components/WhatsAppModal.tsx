import { useState, type FormEvent } from "react";
import { MessageSquare } from "lucide-react";
import { whatsappLink } from "../data";
import { btnPrimary, inputCls, Modal } from "./ui";

const topics = [
  "A new website for my business",
  "M-Pesa payments / online shop",
  "A custom system or AI tool",
  "Video editing or branding",
  "Not sure yet, just want advice",
];

export default function WhatsAppModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState(topics[0]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hello Franklin, I'm ${name || "a potential client"}. I'd like to book a strategy call about: ${topic}.`;
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} label="Book a strategy call" className="max-w-md">
      <h3 className="pr-12 font-display text-xl font-semibold">Book a strategy call</h3>
      <p className="mt-2 mb-5 text-sm text-slate-400">
        Tell me a little about what you need. This opens WhatsApp so we can agree a time to talk.
      </p>
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label htmlFor="bm-name" className="mb-1.5 block text-sm text-slate-300">
            Your name
          </label>
          <input id="bm-name" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label htmlFor="bm-topic" className="mb-1.5 block text-sm text-slate-300">
            What do you need help with?
          </label>
          <select id="bm-topic" value={topic} onChange={(e) => setTopic(e.target.value)} className={inputCls}>
            {topics.map((t) => (
              <option key={t} className="bg-slate-900">
                {t}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={`${btnPrimary} w-full`}>
          <MessageSquare size={16} /> Continue to WhatsApp
        </button>
      </form>
    </Modal>
  );
}
