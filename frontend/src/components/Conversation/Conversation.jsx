import { motion } from "framer-motion";
import "./Conversation.css";

export default function Conversation({ transcript }) {
  if (!transcript) return null;

  return (
    <motion.div
      className="conversation"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <span className="conversation-label">You</span>

      <p className="conversation-text">
        {transcript}
      </p>
    </motion.div>
  );
}
