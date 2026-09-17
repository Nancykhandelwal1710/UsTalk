import { motion } from "framer-motion";
import "./Conversation.css";

export default function Conversation({ messages = [] }) {
  if (messages.length === 0) return null;

  return (
    <div className="conversation">
      {messages.map((message, index) => (
        <motion.div
          key={message.id ?? index}
          className={`conversation-message ${message.role}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <span className="conversation-label">
            {message.role === "user" ? "You" : "UsTalk"}
          </span>

          <p className="conversation-text">
            {message.content}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
