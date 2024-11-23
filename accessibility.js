const synth = window.speechSynthesis;

document.getElementById('startNavigation').addEventListener('click', () => {
  const utterance = new SpeechSynthesisUtterance(
    "Welcome! To go back, press the back button. You can navigate using your voice commands in supported browsers."
  );
  synth.speak(utterance);
});
