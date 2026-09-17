import { useEffect, useRef, useState } from "react";

export function useSpeechRecognition() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition is not supported.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-IN";

    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      let finalText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript;
        }
      }

      if (finalText) {
        setTranscript((prev) =>
          `${prev} ${finalText}`.trim()
        );
      }
    };

    recognition.onend = () => {
      setListening(false);
    };

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) {
      alert(
        "Speech recognition is not supported in this browser."
      );
      return;
    }

    setTranscript("");

    try {
      recognitionRef.current.start();
      setListening(true);
    } catch (error) {
      console.error("Speech recognition error:", error);
    }
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return {
    listening,
    transcript,
    startListening,
    stopListening,
    toggleListening,
  };
}
