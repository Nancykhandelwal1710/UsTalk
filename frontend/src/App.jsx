import { useEffect, useState } from "react";
import { useSpeechRecognition } from "./hooks/useSpeechRecognition";
import { DEFAULT_ENVIRONMENT, moodProfiles, } from "./environment";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Sun,
  CloudRain,
  Moon,
  Music2,
  Lightbulb,
  MessageCircle,
  Brain,
  Smile,
} from "lucide-react";
import "./App.css";

const moods = [
  {
    id: "talk",
    label: "Just Talk",
    icon: MessageCircle,
    message: "I'm here.",
    title: "What's on your mind?",
  },
  {
    id: "vent",
    label: "Let it Out",
    icon: CloudRain,
    message: "You don't have to make it okay.",
    title: "Let it out.",
  },
  {
    id: "understand",
    label: "Understand",
    icon: Brain,
    message: "Let's make sense of it.",
    title: "What are you trying to understand?",
  },
  {
    id: "advice",
    label: "Need Advice",
    icon: Lightbulb,
    message: "Let's think it through.",
    title: "Tell me what's going on.",
  },
  {
    id: "fun",
    label: "Have Fun",
    icon: Smile,
    message: "Let's make this interesting.",
    title: "What are we getting into?",
  },
];

export default function App() {
  /*
   * =========================================================
   * ENVIRONMENT STATE
   * =========================================================
   */

  const [environment, setEnvironment] = useState(
    DEFAULT_ENVIRONMENT
  );

  /*
   * Voice state
   */

  const {
  listening,
  transcript,
  toggleListening,
} = useSpeechRecognition();
  /*
   * Current clock
   */

  const [time, setTime] = useState("");

  /*
   * =========================================================
   * ENVIRONMENT ACTIONS
   * =========================================================
   */

  const changeMood = (newMood) => {
  const profile = moodProfiles[newMood];

  if (!profile) return;

  setEnvironment((env) => ({
    ...env,

    mood: newMood,

    background: profile.background,

    lighting: profile.lighting,

    energy: profile.energy,

    music: profile.music,

    weather: profile.weather,
  }));
};


  /*
   * =========================================================
   * CLOCK
   * =========================================================
   */

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, []);

  /*
   * =========================================================
   * CURRENT ENVIRONMENT
   * =========================================================
   */

  const mood = environment.mood;

  const light = environment.lighting;

  const music = environment.music !== "off";

  /*
   * =========================================================
   * MOOD → GIF BACKGROUND
   * =========================================================
   *
   * These files are inside:
   *
   * frontend/public/
   *
   * The mood decides which environment GIF is displayed.
   */

  const currentBackground =
    environment.background ||
    moodProfiles.talk.background;

  /*
   * =========================================================
   * CURRENT MOOD
   * =========================================================
   */

  const currentMood =
    moods.find((m) => m.id === mood) || moods[0];

  
  /*
   * =========================================================
   * DEBUG
   * =========================================================
   */

  console.log("Environment:", environment);

  return (
    <>

      {/* =====================================================
          MAIN APP
          ===================================================== */}

      <main
        className={`
          app
          mood-${mood}
          light-${light}
          ${music ? "music-on" : ""}
          ${listening ? "listening" : ""}
        `}
      >
        {/* ===================================================
            ACTUAL GIF BACKGROUND
            =================================================== */}
        <AnimatePresence mode="sync">
        <motion.div
          key={currentBackground}
          className="reference-scene"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2, ease: "easeInOut", }, }}
          style={{
            backgroundImage: `url("${currentBackground}")`,
          }}
        />
        </AnimatePresence>

        {/* ===================================================
            BACKGROUND ATMOSPHERE
            =================================================== */}

        <div className="atmosphere" />

        {/* ===================================================
            HEADER
            =================================================== */}

        <header className="header">
          <div className="brand-mini">
            <b>Us</b>Talk
          </div>

          <div className="divider" />

          <div className="tagline">
            A space for real conversations.
          </div>

          <div className="header-right">
            

            <div className="time">
              {time}
            </div>

            <div className="date">
              mon, 16 sep
            </div>

            <div className="avatar">
              ●
            </div>
          </div>
        </header>

  

        
        {/* ===================================================
            CENTER US TALK
            =================================================== */}

        <section className="center">
          <div className="presence">
            <span />

            {listening
              ? "SOMEONE'S LISTENING"
              : "SOMEONE'S HERE"}
          </div>

          <div className="ustalk-wordmark">
            <span>Us</span>Talk
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${mood}-${listening}`}
              className="conversation"
              initial={{
                opacity: 0,
                y: 8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -8,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <div className="mood-line">
                {listening
                  ? "I'm listening."
                  : currentMood.message}
              </div>

              <h1>
                {listening
                  ? "Tell me."
                  : currentMood.title}
              </h1>
            </motion.div>
          </AnimatePresence>

          <motion.button
            className="talk-button"
            onClick={toggleListening}
            whileHover={{
              scale: 1.035,
            }}
            whileTap={{
              scale: 0.97,
            }}
          >
            <span className="mic">
              <Mic size={22} />
            </span>

            <span>
              {listening
                ? "Listening..."
                : "Start talking"}
            </span>
          </motion.button>

          {transcript && (
  <motion.div
    className="transcript"
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
  >
    {transcript}
  </motion.div>
)}
<div className="no-pressure">
            NO PRESSURE. JUST TALK.
          </div>
        </section>

        {/* ===================================================
            COFFEE
            =================================================== */}

        <button
          className="coffee-control"
          onClick={() => changeMood("talk")}
        >
          <span>☕</span>
        </button>

        {/* ===================================================
            MOOD BAR
            =================================================== */}

        <nav className="mood-bar">
          {moods.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                className={
                  mood === item.id
                    ? "active"
                    : ""
                }
                onClick={() =>
                  changeMood(item.id)
                }
              >
                <Icon size={18} />

                <div>
                  <strong>
                    {item.label}
                  </strong>

                  <small>
                    {item.id === "talk" && (
                      <>
                        No reason.
                        <br />
                        Just here.
                      </>
                    )}

                    {item.id === "vent" && (
                      <>
                        You don't have
                        <br />
                        to make it okay.
                      </>
                    )}

                    {item.id === "understand" && (
                      <>
                        Let's make
                        <br />
                        sense of it.
                      </>
                    )}

                    {item.id === "advice" && (
                      <>
                        Let's think
                        <br />
                        it through.
                      </>
                    )}

                    {item.id === "fun" && (
                      <>
                        Let's make this
                        <br />
                        interesting.
                      </>
                    )}
                  </small>
                </div>
              </button>
            );
          })}
        </nav>

        {/* ===================================================
            CORNER DETAILS
            =================================================== */}

        <div className="corner-note left">
          GOOD
          <br />
          <i>
            conversations,
            <br />
            brighter days.
          </i>
        </div>

        <div className="corner-note right">
          You + Us. &nbsp;—
        </div>
      </main>
    </>
  );
}
