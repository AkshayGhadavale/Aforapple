document.addEventListener('DOMContentLoaded', (event) => {
    let currentUtterance = null; // Variable to store the current sentnece 

    const sentences = loadSentencesFromStorage() || getDefaultSentences();

    const colors = getColorMapping(); // Colors for aplhabeats

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

    function Playletter(e) {

        if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
            return;
        }


        let char = '';
        if (event.type === 'click' || event.type === 'touchstart') {

        switch(e.keyCode) {
            case 65: // 'A'
            case 97: // 'a'
                char = 'A';
                break;
            case 66: // 'B'
            case 98: // 'b'
                char = 'B';
                break;
            case 67: // 'C'
            case 99: // 'c'
                char = 'C';
                break;
            case 68: // 'D'
            case 100: // 'd'
                char = 'D';
                break;
            case 69: // 'E'
            case 101: // 'e'
                char = 'E';
                break;
            case 70: // 'F'
            case 102: // 'f'
                char = 'F';
                break;
            case 71: // 'G'
            case 103: // 'g'
                char = 'G';
                break;
            case 72: // 'H'
            case 104: // 'h'
                char = 'H';
                break;
            case 73: // 'I'
            case 105: // 'i'
                char = 'I';
                break;
            case 74: // 'J'
            case 106: // 'j'
                char = 'J';
                break;
            case 75: // 'K'
            case 107: // 'k'
                char = 'K';
                break;
            case 76: // 'L'
            case 108: // 'l'
                char = 'L';
                break;
            case 77: // 'M'
            case 109: // 'm'
                char = 'M';
                break;
            case 78: // 'N'
            case 110: // 'n'
                char = 'N';
                break;
            case 79: // 'O'
            case 111: // 'o'
                char = 'O';
                break;
            case 80: // 'P'
            case 112: // 'p'
                char = 'P';
                break;
            case 81: // 'Q'
            case 113: // 'q'
                char = 'Q';
                break;
            case 82: // 'R'
            case 114: // 'r'
                char = 'R';
                break;
            case 83: // 'S'
            case 115: // 's'
                char = 'S';
                break;
            case 84: // 'T'
            case 116: // 't'
                char = 'T';
                break;
            case 85: // 'U'
            case 117: // 'u'
                char = 'U';
                break;
            case 86: // 'V'
            case 118: // 'v'
                char = 'V';
                break;
            case 87: // 'W'
            case 119: // 'w'
                char = 'W';
                break;
            case 88: // 'X'
            case 120: // 'x'
                char = 'X';
                break;
            case 89: // 'Y'
            case 121: // 'y'
                char = 'Y';
                break;
            case 90: // 'Z'
            case 122: // 'z'
                char = 'Z';
                break;
            default:
                char = '';
        }

    }
        if (char) {
            // Stop speaking while
            if (currentUtterance) {
                speechSynthesis.cancel();
            }

            const sentence = sentences[char];
            show(char, sentence);

            const keyword = sentence.split(' ')[2]; // get the keyword from the sentence
            fetchVideo(keyword).then(videoUrl => {
                if (videoUrl) {
                    showVideo(videoUrl);
                    speak(sentence);
                } else {
                    console.error('No video found for', keyword);
                }
            }).catch(error => {
                console.error('Error fetching video:', error);
            });
        }
    }

    //to dispay letter and senetnece
    function show(char, sentence) {
        const letterElement = document.getElementById('letter');
        letterElement.innerText = `${char}`;
        letterElement.style.color = colors[char]; 
        document.getElementById('sentenceshow').innerText = ` ${sentence}`;
    }

//show video
    function showVideo(videoUrl) {
        const videoElement = document.getElementById('video');
        videoElement.src = videoUrl;
        videoElement.autoplay = true; 
        videoElement.muted = true; 
        videoElement.loop = true; 
        videoElement.controls = false; 
    }


    //to speak

    function speakSentence(sentence) {
        const utterance = new SpeechSynthesisUtterance(sentence);
        speechSynthesis.speak(utterance);
        currentUtterance = utterance; 
    }

    // Save local storage
    function saveSentencesToStorage(sentences) {
        localStorage.setItem('alphabet_sentences', JSON.stringify(sentences));
    }

    // Load from local storage
    function loadSentencesFromStorage() {
        const storedSentences = localStorage.getItem('alphabet_sentences');
        return storedSentences ? JSON.parse(storedSentences) : null;
    }

    // Get default sentences if not stored
    function getDefaultSentences() {
        return {
            A: 'A for Apple',
            B: 'B for Ball',
            C: 'C for Cat',
            D: 'D for Dog',
            E: 'E for Elephant',
            F: 'F for Fish',
            G: 'G for Goat',
            H: 'H for Hat',
            I: 'I for Icecream',
            J: 'J for Jug',
            K: 'K for Kite',
            L: 'L for Lion',
            M: 'M for Monkey',
            N: 'N for Nest',
            O: 'O for Orange',
            P: 'P for Parrot',
            Q: 'Q for Queen',
            R: 'R for Rabbit',
            S: 'S for Snake',
            T: 'T for Tiger',
            U: 'U for Umbrella',
            V: 'V for Violin',
            W: 'W for Watch',
            X: 'X for Xylophone',
            Y: 'Y for Yak',
            Z: 'Z for Zebra'
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


    // Function to handle form submission and update sentences
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
    

    //when key press 
    document.addEventListener('keypress', Playletter);
    document.addEventListener('touchstart', Playletter);

    // speak the sentence
    function speak(sentence) {
        speakSentence(sentence);
    }
});

