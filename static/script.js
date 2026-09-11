document.addEventListener('DOMContentLoaded', () => {

    // ==================================================
    // DOM ELEMENTS
    // ==================================================

    const chatForm = document.getElementById('chatForm');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    const micBtn = document.getElementById('micBtn');

    const landingState = document.getElementById('landingState');
    const messagesList = document.getElementById('messagesList');
    const typingIndicator = document.getElementById('typingIndicator');
    const chatContainer = document.getElementById('chatContainer');

    const speechStatus = document.getElementById('speechStatus');
    const speechStatusText = document.getElementById('speechStatusText');

    const voiceToggleBtn = document.getElementById('voiceToggleBtn');
    const voiceIcon = document.getElementById('voiceIcon');
    const stopVoiceBtn = document.getElementById('stopVoiceBtn');

    const unrelatednessValue =
        document.getElementById('unrelatednessValue');

    const chaosPercentage =
        document.getElementById('chaosPercentage');

    const chaosMeterFill =
        document.getElementById('chaosMeterFill');

    const modePills =
        document.querySelectorAll('.mode-pill');

    const suggestionChips =
        document.querySelectorAll('.chip');


    // ==================================================
    // APP STATE
    // ==================================================

    let conversationHistory = [];

    let currentMode = 'normal';

    // AI voice is ON by default
    let isVoiceEnabled = true;

    // Microphone state
    let isListening = false;

    // Speech Recognition object
    let recognition = null;

    // Browser Speech Synthesis
    let synth = window.speechSynthesis;

    // Available voices
    let availableVoices = [];


    // ==================================================
    // SPEECH RECOGNITION
    // ==================================================

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (SpeechRecognition) {

        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;

        // English that works reasonably well with Indian accent
        recognition.lang = 'en-US';

        recognition.maxAlternatives = 1;


        // ----------------------------------------------
        // MICROPHONE STARTED
        // ----------------------------------------------

        recognition.onstart = () => {

            isListening = true;

            micBtn.classList.add('recording');

            speechStatus.classList.remove('hidden');

            speechStatusText.textContent =
                'Listening to your voice... Speak now!';

        };


        // ----------------------------------------------
        // SPEECH RESULT
        // ----------------------------------------------

        recognition.onresult = (event) => {

            const transcript =
                event.results[0][0].transcript;

            console.log('Recognized speech:', transcript);

            userInput.value = transcript;

            speechStatus.classList.remove('hidden');

            speechStatusText.textContent =
                `Recognized: "${transcript}"`;


            // Stop microphone
            setTimeout(() => {

                stopListening();

                // Automatically send recognized text
                if (transcript.trim()) {

                    sendMessage(transcript.trim());

                }

            }, 500);

        };


        // ----------------------------------------------
        // SPEECH ERROR
        // ----------------------------------------------

        recognition.onerror = (event) => {

            console.warn(
                'Speech Recognition error:',
                event.error
            );

            stopListening();


            if (event.error === 'not-allowed') {

                showToast(
                    '🎤 Microphone permission denied. Please allow microphone access.'
                );

            }

            else if (event.error === 'network') {

                showToast(
                    '🌐 Speech service unavailable. Check your internet connection and try again.'
                );

            }

            else if (event.error === 'no-speech') {

                showToast(
                    '🎤 No speech detected. Please try speaking again.'
                );

            }

            else if (event.error === 'audio-capture') {

                showToast(
                    '🎤 Microphone could not be accessed.'
                );

            }

            else {

                showToast(
                    '🎤 Voice recognition error: ' +
                    event.error
                );

            }

        };


        // ----------------------------------------------
        // SPEECH ENDED
        // ----------------------------------------------

        recognition.onend = () => {

            stopListening();

        };

    }

    else {

        // Browser doesn't support Speech Recognition

        micBtn.addEventListener('click', () => {

            showToast(
                '🎤 Voice input is not supported in this browser. Try Google Chrome or Microsoft Edge.'
            );

        });

    }


    // ==================================================
    // LOAD AVAILABLE TEXT-TO-SPEECH VOICES
    // ==================================================

    function loadVoices() {

        if (!synth) {
            return;
        }

        availableVoices = synth.getVoices();

        console.log(
            'Available voices:',
            availableVoices
        );

    }


    if (synth) {

        loadVoices();

        if (synth.onvoiceschanged !== undefined) {

            synth.onvoiceschanged = loadVoices;

        }

    }


    // ==================================================
    // MICROPHONE BUTTON
    // ==================================================

    micBtn.addEventListener('click', () => {

        if (!recognition) {

            showToast(
                '🎤 Voice input is not supported in this browser.'
            );

            return;

        }


        // If already listening → stop
        if (isListening) {

            recognition.stop();

            stopListening();

            return;

        }


        try {

            // Stop any AI speech
            if (synth) {

                synth.cancel();

            }

            stopVoiceBtn.classList.add('hidden');


            // Start microphone
            recognition.start();

        }

        catch (error) {

            console.error(
                'Failed to start recognition:',
                error
            );

            stopListening();

        }

    });


    // ==================================================
    // STOP LISTENING
    // ==================================================

    function stopListening() {

        isListening = false;

        micBtn.classList.remove('recording');

        speechStatus.classList.add('hidden');

    }


    // ==================================================
    // AI TEXT → AUDIO
    // ==================================================

    function speakText(text) {

        // Voice disabled
        if (!synth || !isVoiceEnabled) {

            return;

        }


        // Remove emojis before speaking
        const cleanText = text
            .replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u2011-\u26FF|\uD83E[\uDD10-\uDDFF])/g,
                ''
            )
            .trim();


        if (!cleanText) {

            return;

        }


        // Stop previous speech
        synth.cancel();


        const utterance =
            new SpeechSynthesisUtterance(cleanText);


        // Voice settings
        utterance.rate = 1.0;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;


        // ----------------------------------------------
        // SELECT BEST AVAILABLE VOICE
        // ----------------------------------------------

        if (availableVoices.length > 0) {

            const preferredVoice =
                availableVoices.find(
                    voice =>
                        voice.lang.toLowerCase().includes('en-in')
                )
                ||
                availableVoices.find(
                    voice =>
                        voice.lang.toLowerCase().includes('en-us')
                )
                ||
                availableVoices.find(
                    voice =>
                        voice.lang.toLowerCase().includes('en')
                )
                ||
                availableVoices[0];


            utterance.voice = preferredVoice;

        }


        // ----------------------------------------------
        // SPEECH START
        // ----------------------------------------------

        utterance.onstart = () => {

            stopVoiceBtn.classList.remove('hidden');

        };


        // ----------------------------------------------
        // SPEECH END
        // ----------------------------------------------

        utterance.onend = () => {

            stopVoiceBtn.classList.add('hidden');

        };


        // ----------------------------------------------
        // SPEECH ERROR
        // ----------------------------------------------

        utterance.onerror = (event) => {

            console.warn(
                'Speech synthesis error:',
                event.error
            );

            stopVoiceBtn.classList.add('hidden');

        };


        // Speak
        synth.speak(utterance);

    }


    // ==================================================
    // VOICE ON / OFF
    // ==================================================

    voiceToggleBtn.addEventListener('click', () => {

        isVoiceEnabled = !isVoiceEnabled;


        if (isVoiceEnabled) {

            voiceToggleBtn.classList.add('active');

            voiceIcon.textContent = '🔊';

            showToast('🔊 AI voice enabled');

        }

        else {

            voiceToggleBtn.classList.remove('active');

            voiceIcon.textContent = '🔇';

            // Stop current speech
            if (synth) {

                synth.cancel();

            }

            stopVoiceBtn.classList.add('hidden');

            showToast('🔇 AI voice disabled');

        }

    });


    // ==================================================
    // STOP AI VOICE
    // ==================================================

    stopVoiceBtn.addEventListener('click', () => {

        if (synth) {

            synth.cancel();

        }

        stopVoiceBtn.classList.add('hidden');

    });


    // ==================================================
    // MODE SELECTOR
    // ==================================================

    modePills.forEach(pill => {

        pill.addEventListener('click', () => {

            // Remove active from all
            modePills.forEach(
                p => p.classList.remove('active')
            );


            // Activate clicked mode
            pill.classList.add('active');


            // Save selected mode
            currentMode =
                pill.getAttribute('data-mode');


            console.log(
                'Current mode:',
                currentMode
            );

        });

    });


    // ==================================================
    // SUGGESTION CHIPS
    // ==================================================

    suggestionChips.forEach(chip => {

        chip.addEventListener('click', () => {

            const text =
                chip.getAttribute('data-text');


            if (text) {

                userInput.value = text;

                sendMessage(text);

            }

        });

    });


    // ==================================================
    // FORM SUBMISSION
    // ==================================================

    chatForm.addEventListener('submit', (event) => {

        event.preventDefault();


        const message =
            userInput.value.trim();


        if (message) {

            sendMessage(message);

        }

    });


    // ==================================================
    // SEND MESSAGE
    // ==================================================

    async function sendMessage(messageText) {

        // ----------------------------------------------
        // Hide landing page
        // ----------------------------------------------

        if (landingState) {

            landingState.style.display = 'none';

        }


        // ----------------------------------------------
        // Show user's message
        // ----------------------------------------------

        appendMessage(
            'user',
            messageText
        );


        // Clear input
        userInput.value = '';


        // ----------------------------------------------
        // Show typing animation
        // ----------------------------------------------

        typingIndicator.classList.remove('hidden');

        scrollToBottom();


        // Disable send button temporarily
        sendBtn.disabled = true;


        try {

            // ------------------------------------------
            // Send to Flask
            // ------------------------------------------

            const response = await fetch(
                '/api/chat',
                {
                    method: 'POST',

                    headers: {
                        'Content-Type':
                            'application/json'
                    },

                    body: JSON.stringify({

                        message: messageText,

                        mode: currentMode,

                        history:
                            conversationHistory

                    })

                }
            );


            // ------------------------------------------
            // Check HTTP response
            // ------------------------------------------

            if (!response.ok) {

                throw new Error(
                    `HTTP error: ${response.status}`
                );

            }


            const data =
                await response.json();


            // Hide typing
            typingIndicator.classList.add('hidden');


            // ------------------------------------------
            // AI RESPONSE
            // ------------------------------------------

            if (data.response) {

                // 1️⃣ Show AI response as TEXT
                appendMessage(
                    'ai',
                    data.response
                );


                // 2️⃣ Update statistics
                updateStats(
                    data.unrelatedness_score || 94,
                    data.chaos_level || 85
                );


                // 3️⃣ Speak the SAME response as AUDIO
                speakText(
                    data.response
                );


                // --------------------------------------
                // Conversation history
                // --------------------------------------

                conversationHistory.push({

                    role: 'user',

                    content: messageText

                });


                conversationHistory.push({

                    role: 'assistant',

                    content: data.response

                });


                // Keep last 8 messages
                if (
                    conversationHistory.length > 8
                ) {

                    conversationHistory =
                        conversationHistory.slice(-8);

                }

            }

            else {

                appendMessage(
                    'ai',
                    '🤖 My brain went on vacation. Try again. 😂'
                );

            }

        }

        catch (error) {

            console.error(
                'Chat API Error:',
                error
            );


            typingIndicator.classList.add('hidden');


            appendMessage(
                'ai',
                '🤖 Network glitch! AI was too busy contemplating coconut trees. 😂'
            );

        }

        finally {

            // Re-enable send button
            sendBtn.disabled = false;

        }


        scrollToBottom();

    }


    // ==================================================
    // APPEND MESSAGE
    // ==================================================

    function appendMessage(
        sender,
        text
    ) {

        // Current time
        const timeString =
            new Date().toLocaleTimeString(
                [],
                {
                    hour: '2-digit',
                    minute: '2-digit'
                }
            );


        // Message row
        const row =
            document.createElement('div');

        row.className =
            `message-row ${sender}`;


        // Avatar
        const avatar =
            document.createElement('div');

        avatar.className =
            'avatar';

        avatar.textContent =
            sender === 'user'
                ? '👤'
                : '🤖';


        // Wrapper
        const wrapper =
            document.createElement('div');

        wrapper.className =
            'bubble-wrapper';


        // Message bubble
        const bubble =
            document.createElement('div');

        bubble.className =
            'bubble';

        bubble.textContent =
            text;


        // Footer
        const footer =
            document.createElement('div');

        footer.className =
            'bubble-footer';


        // Time
        const time =
            document.createElement('span');

        time.textContent =
            timeString;


        footer.appendChild(time);


        // ----------------------------------------------
        // AI REPLAY BUTTON
        // ----------------------------------------------

        if (sender === 'ai') {

            const speakBtn =
                document.createElement('button');


            speakBtn.className =
                'speak-bubble-btn';


            speakBtn.title =
                'Replay Voice';


            speakBtn.textContent =
                '🔊';


            speakBtn.addEventListener(
                'click',
                () => {

                    speakText(text);

                }
            );


            footer.appendChild(
                speakBtn
            );

        }


        // Build message
        wrapper.appendChild(bubble);

        wrapper.appendChild(footer);

        row.appendChild(avatar);

        row.appendChild(wrapper);

        messagesList.appendChild(row);

    }


    // ==================================================
    // UPDATE STATISTICS
    // ==================================================

    function updateStats(
        unrelatedness,
        chaos
    ) {

        unrelatednessValue.textContent =
            `${unrelatedness}%`;


        chaosPercentage.textContent =
            `${chaos}%`;


        chaosMeterFill.style.width =
            `${chaos}%`;

    }


    // ==================================================
    // AUTO SCROLL
    // ==================================================

    function scrollToBottom() {

        chatContainer.scrollTop =
            chatContainer.scrollHeight;

    }


    // ==================================================
    // TOAST MESSAGE
    // ==================================================

    function showToast(msg) {

        const toast =
            document.createElement('div');


        toast.className =
            'speech-status';


        toast.style.position =
            'fixed';

        toast.style.bottom =
            '80px';

        toast.style.left =
            '50%';

        toast.style.transform =
            'translateX(-50%)';

        toast.style.borderRadius =
            '20px';

        toast.style.zIndex =
            '1000';

        toast.textContent =
            msg;


        document.body.appendChild(toast);


        setTimeout(() => {

            toast.remove();

        }, 3500);

    }

});