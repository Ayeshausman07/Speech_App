const listenBtn = document.getElementById('listenBtn');
const speakBtn = document.getElementById('speakBtn');
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');

const synth = window.speechSynthesis;

// Load Voices for Text-to-Speech
if (voiceSelect) {
  const loadVoices = () => {
    const voices = synth.getVoices();
    voiceSelect.innerHTML = voices.map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`).join('');
  };
  loadVoices();
  synth.onvoiceschanged = loadVoices;
}

// Text-to-Speech
if (speakBtn) {
  speakBtn.addEventListener('click', () => {
    const text = textInput.value.trim();
    if (!text) return alert('Please enter some text to speak!');
    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voiceSelect.value;
    utterance.voice = synth.getVoices().find(voice => voice.name === selectedVoice);
    synth.speak(utterance);
  });
}

// Speech-to-Text
if (listenBtn) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.addEventListener('result', (event) => {
    textInput.value = event.results[0][0].transcript;
  });
  listenBtn.addEventListener('click', () => recognition.start());
}
