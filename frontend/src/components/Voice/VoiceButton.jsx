import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import "./VoiceButton.css";

export default function VoiceButton({
  listening,
  onToggle,
}) {
  return (
    <motion.button
      className="talk-button"
      onClick={onToggle}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
    >
      <span className="mic">
        <Mic size={22} />
      </span>

      <span>
        {listening ? "Listening..." : "Start talking"}
      </span>
    </motion.button>
  );
}
