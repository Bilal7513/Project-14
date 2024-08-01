const main = document.getElementById('main');
const voiceSelect = document.getElementById('voices');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');
const customText = document.getElementById('text');
const readBtn = document.getElementById('read');
const cutomTextDiv = document.getElementById('custom-text');

const data = [
    {
        image: 'image/Supra.avif',
        text: "Toyota Supra Mk4:<br>Iconic sports car known for its 2JZ engine and immense tuning potential."
    },
    {
        image: 'image/Lancer.webp',
        text: "Mitsubishi Lancer Evo VIII:<br>High-performance sedan with turbocharged engine and rally-inspired all-wheel drive."
    },
    {
        image: 'image/Nissan.webp',
        text: "Nissan GT-R R34 Skyline:<br>Legendary sports car with advanced AWD system and iconic RB26DETT engine."
    },
    {
        image: 'image/charger.jpg',
        text: "Dodge Charger 1968:<br>Classic muscle car with bold design and powerful V8 options."
    },
    {
        image: 'image/challenger.jpg',
        text: "Dodge Challenger:<br>Modern muscle car with retro design and powerful V8 engines."
    },
    {
        image: 'image/BMWm3.webp',
        text: "BMW M3:<br>Sporty sedan known for balanced performance, luxury features, and precision handling."
    },
    {
        image: 'image/agera.jpg',
        text: "Koenigsegg Agera:<br>Hypercar with lightweight construction and extreme speed from a twin-turbo V8 engine."
    },
    {
        image: 'image/camero.webp',
        text: "Chevrolet Camaro SS:<br>Classic muscle car offering powerful V8 engine and aggressive American styling."
    },
    {
        image: 'image/mazda.avif',
        text: "Mazda RX-7:<br>Lightweight sports car with unique rotary engine and sleek design."
    },
    {
        image: 'image/mustang.jpg',
        text: "Ford Mustang 1969:<br>Iconic American muscle car known for powerful V8s and classic styling."
    },
    {
        image: 'image/Porsche.webp',
        text: "Porsche Carrera GT:<br>Supercar with V10 engine and cutting-edge technology for exceptional performance."
    },
    {
        image: 'image/RR-Ghost.webp',
        text: "Rolls-Royce Ghost:<br>Luxury sedan with opulent interiors, smooth ride, and powerful V12 engine."
    },
    {
        image: 'image/MarkX.jpg',
        text: "Toyota Mark X 2005:<br>Mid-size luxury sedan with sleek design and balanced performance."
    },
    {
        image: 'image/crown.jpeg',
        text: "Toyota Crown 2005:<br>Luxury sedan with elegant styling, comfortable interior, and advanced features."
    },
    {
        image: 'image/f1.jpg',
        text: "Formula 1:<br>High-tech racing car with exceptional speed, aerodynamics, and cornering capabilities."
    },
    {
        image: 'image/bettle.jfif',
        text: "Volkswagen Beetle:<br>Iconic compact car with distinctive rounded design and long cultural history."
    },
    {
        image: 'image/Gweagon.avif',
        text: "Mercedes G-Wagon:<br>Luxury SUV with iconic boxy design, off-road capability, and powerful engine options."
    },
    {
        image: 'image/F40.avif',
        text: "Ferrari F40:<br>Iconic supercar with lightweight construction, twin-turbo V8 engine, and aggressive styling."
    },
];

let voicesBackup = [];

data.forEach(createBox);

function createBox(imageObj){
    const box = document.createElement('div');
    const { image, text } = imageObj;
    box.classList.add('box');
    box.innerHTML = `
    <img src="${image}" alt="${text}"/>
    <p class="image-info">${text}</p>
    `;
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    main.appendChild(box);
};

const message = new SpeechSynthesisUtterance();

function populateVoiceList() {
  if (typeof speechSynthesis === "undefined") {
    return;
  }

  let voices = speechSynthesis.getVoices();
  voicesBackup = voices;

  for (let i = 0; i < voices.length; i++) {
    const option = document.createElement("option");
    option.textContent = `${voices[i].name} (${voices[i].lang})`;

    if (voices[i].default) {
      option.textContent += " —— DEFAULT";
    }

    option.setAttribute("data-lang", voices[i].lang);
    option.setAttribute("data-name", voices[i].name);
    option.value = voices[i].name;
    voiceSelect.appendChild(option);
  }
};

populateVoiceList();
if (
  typeof speechSynthesis !== "undefined" &&
  speechSynthesis.onvoiceschanged !== undefined
) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
};

function setMessage(text){
    message.text = text;
};

function speakText(){
    speechSynthesis.speak(message);
};

function setVoice(e){
    console.log(e.target.value);
    message.voice = voicesBackup.find( voice => voice.name === e.target.value);
};

toggleBtn.addEventListener('click', () => {
    cutomTextDiv.classList.add('show')
});

closeBtn.addEventListener('click', () => {
    cutomTextDiv.classList.remove('show')
});

speechSynthesis.addEventListener('voiceschanged', populateVoiceList);

voiceSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})