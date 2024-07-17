document.addEventListener('DOMContentLoaded', (event) => {
    
    let currentUtterance = null; // Variable to store the current sentence

    const sentences = loadSentencesFromStorage() || getDefaultSentences();

    const colors = getColorMapping(); // Colors for alphabets

    const pexelsApiKey = 'o1TBu5lNZNZsBOfCgIQToXqvq4kSXq4s725oN2q3bXXH0m9sZugjX6mU';
    const pexelsApiUrl = 'https://api.pexels.com/videos/search';

    async function fetchVideo(query) {
        const response = await fetch(`${pexelsApiUrl}?query=${query}&per_page=1`, {
            headers: {
                Authorization: pexelsApiKey
            }
        });
        const data = await response.json();
        console.log(data);
        return data.videos.length ? data.videos[0].video_files[0].link : '';
    }

    function Playletter(char) {
        if (char) {
            if (currentUtterance) {
                speechSynthesis.cancel();
            }

            const sentence = sentences[char];
            show(char, sentence);

            const keyword = sentence; // get the keyword from the sentence
            fetchVideo(keyword).then(videoUrl => {
                if (videoUrl) {
                    showVideo(videoUrl);
                    speak(char,sentence);
                } else {
                    console.error('No video found for', keyword);
                }
            }).catch(error => {
                console.error('Error fetching video:', error);
            });
        }
    }

    function handleKeyPress(e) {
        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }

        const char = String.fromCharCode(e.keyCode).toUpperCase();
        Playletter(char);
    }

    function handleMobileInput() {
        const mobileCharInput = document.getElementById('mobileChar');
        const char = mobileCharInput.value.toUpperCase();
        if (char) {
            Playletter(char);
            mobileCharInput.value = ''; // Clear the input after processing
        }
    }

    function show(char, sentence) {
        const letterElement = document.getElementById('letter');
        letterElement.innerText = `${char}`;
        letterElement.style.color = colors[char];
        // document.getElementById('sentenceshow').innerText = `${sentence}`;
        document.getElementById('sentenceshow').innerText = `${char} For ${sentence}`;
    }

    function showVideo(videoUrl) {
        const videoElement = document.getElementById('video');
        videoElement.src = videoUrl;
        videoElement.autoplay = true;
        videoElement.muted = true;
        videoElement.loop = true;
        videoElement.controls = false;
    }

    function speakSentence(sentence) {
        const utterance = new SpeechSynthesisUtterance(sentence);
        speechSynthesis.speak(utterance);
        currentUtterance = utterance;
    }

    function saveSentencesToStorage(sentences) {
        localStorage.setItem('alphabet_sentences', JSON.stringify(sentences));
    }

    function loadSentencesFromStorage() {
        const storedSentences = localStorage.getItem('alphabet_sentences');
        return storedSentences ? JSON.parse(storedSentences) : null;
    }

    function getDefaultSentences() {
        return {
            A: 'Apple',
            B: 'Ball',
            C: 'Cat',
            D: 'Dog',
            E: 'Elephant',
            F: 'Fish',
            G: 'Goat',
            H: 'Hat',
            I: 'Icecream',
            J: 'Jug',
            K: 'Kite',
            L: 'Lion',
            M: 'Monkey',
            N: 'Nest',
            O: 'Orange',
            P: 'Parrot',
            Q: 'Queen',
            R: 'Rabbit',
            S: 'Snake',
            T: 'Tiger',
            U: 'Umbrella',
            V: 'Violin',
            W: 'Watch',
            X: 'Xylophone',
            Y: 'Yak',
            Z: 'Zebra'
        };
    }

    function getColorMapping() {
        return {
            A: 'red',
            B: 'blue',
            C: 'green',
            D: 'purple',
            E: 'orange',
            F: 'yellow',
            G: 'pink',
            H: 'brown',
            I: 'cyan',
            J: 'magenta',
            K: 'lime',
            L: 'teal',
            M: 'navy',
            N: 'olive',
            O: 'maroon',
            P: 'violet',
            Q: 'gold',
            R: 'silver',
            S: 'coral',
            T: 'indigo',
            U: 'turquoise',
            V: 'plum',
            W: 'lavender',
            X: 'salmon',
            Y: 'khaki',
            Z: 'peachpuff'
        };
    }

    const form = document.getElementById('sentenceForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const charInput = document.getElementById('char');
        const sentenceInput = document.getElementById('sentence');

        if (!charInput || !sentenceInput) {
            alert('Form elements are missing.');
            return;
        }

        const char = charInput.value.toUpperCase();
        const sentence = sentenceInput.value.trim();

        if (char && sentence) {
            sentences[char] = sentence;
            saveSentencesToStorage(sentences);
            alert(`Sentence for ${char} updated successfully.`);
            charInput.value = '';
            sentenceInput.value = '';
        } else {
            alert('Please fill out both fields.');
        }
    });

    document.addEventListener('keypress', handleKeyPress);

    const mobileCharInput = document.getElementById('mobileChar');
    mobileCharInput.addEventListener('input', handleMobileInput);

    function speak(char,sentence) {
        speakSentence(char+"  for "+sentence);
    }
});
