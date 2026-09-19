import { useEffect, useRef, useState } from "react";

export function useSpeechRecognition() {
  const [listening, setListening] = useState(false);
  const [liveTranscript, setLiveTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");

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
      let interimText = "";
      let finalText = "";

      for (
        let i = event.resultIndex;
        i < event.results.length;
        i++
      ) {
        const text = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalText += text;
        } else {
          interimText += text;
        }
      }

      if (interimText) {
        setLiveTranscript(interimText.trim());
      }

      if (finalText) {
        const cleanedText = finalText.trim();

        setLiveTranscript("");
        setFinalTranscript(cleanedText);

        // Stop listening once the user's turn is complete.
        // This prevents UsTalk's own voice from being captured.
        recognition.stop();
        setListening(false);
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

    setLiveTranscript("");
    setFinalTranscript("");

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
    setLiveTranscript("");
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
    liveTranscript,
    finalTranscript,
    startListening,
    stopListening,
    toggleListening,
  };
}