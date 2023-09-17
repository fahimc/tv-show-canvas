export class NarratorManager {
  // ... other properties or methods ...

  speak(text: string, callback: () => void) {
    // Check if the browser supports the SpeechSynthesis API
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      console.log(voices);
      utterance.voice = voices[3];
      // The 'end' event is triggered when the speech completes
      utterance.addEventListener("end", function () {
        if (callback) {
          callback();
        }
      });

      // Handle any errors that arise
      utterance.addEventListener("error", function (e) {
        console.error("Error with SpeechSynthesis:", e);
        if (callback) {
          callback();
        }
      });

      // Set the speech properties, these can be adjusted as per requirements
      utterance.lang = "en-US"; // language
      utterance.rate = 1.0; // speed
      utterance.volume = 1.0; // volume

      // Now, speak!
      speechSynthesis.speak(utterance);
    } else {
      console.error("This browser does not support the SpeechSynthesis API.");
      if (callback) {
        callback();
      }
    }
  }
}
