// script.js
let soundEnabled = true;
let currentLang = 'es';
let currentTheme = 'green';
let commandHistory = [];
let historyIndex = -1;
let suggestions = [];
let suggestionIndex = -1;
let lastScrollTop = 0;

const langData = {
  es: {
    booting: ">> BOOTING WOPR...",
    header_title: "DORJEE",
    header_subtitle: "Desarrollador. La única manera de ganar es no jugar.",
    about_title: "SOBRE MÍ",
    about_content: "Me apasionan los sistemas, la automatización y los desafíos imposibles. Estudio Desarrollo de Videojuegos en la UCM de Madrid. También estudié Antropología e hice un Máster en Historia y Antropología de América.",
    education_title: "EDUCACIÓN",
    education_degree1: "Grado en Desarrollo de Videojuegos",
    education_institution1: "Universidad Complutense de Madrid (UCM)",
    education_years1: "2020 - Presente",
    education_degree2: "Máster en Historia y Antropología de América",
    education_institution2: "Universidad Complutense de Madrid (UCM)",
    education_years2: "2020 - 2021",
    education_degree3: "Grado en Antropología",
    education_institution3: "Universidad Complutense de Madrid (UCM)",
    education_years3: "2016 - 2020",
    my_projects_title: "MIS PROYECTOS",
    manageyourlife_description: "App básica de gestión de tareas con etiquetas, prioridades y búsqueda por fecha.",
    whattowatch_description: "App para watchOS que recomienda series o películas diarias, con sinopsis, duración y plataforma de streaming.",
    skills_title: "HABILIDADES",
    programming_title: ">> PROGRAMACIÓN",
    programming_content: "C++, C#, C, Python, Java, SDL, JavaScript, HTML, CSS",
    tools_title: ">> HERRAMIENTAS",
    tools_content: "Git, Docker, Linux, NAS",
    contact_title: "CONTACTO",
    email_title: ">> EMAIL",
    email_content: "dorjeekhampa97@gmail.com",
    github_title: ">> GITHUB",
    github_content: "github.com/Dorjeekhb",
    linkedin_title: ">> LINKEDIN",
    linkedin_content: "linkedin.com/in/dorje-khampa-herrezuelo-blasco-070849379/",
    footer: "© 2025 Dorjee // root@pipboy",
    resume_button: "DESCARGAR CV",
    terminal_placeholder: ">> Escribe un comando (ej., ir a proyectos, abrir email, ayuda)",
    terminal_response: {
      home: ">> Comando ejecutado: Navegando a HOME",
      about: ">> Comando ejecutado: Navegando a SOBRE MÍ",
      education: ">> Comando ejecutado: Navegando a EDUCACIÓN",
      my_projects: ">> Comando ejecutado: Navegando a MIS PROYECTOS",
      contact: ">> Comando ejecutado: Navegando a CONTACTO",
      open_email: ">> Comando ejecutado: Abriendo EMAIL",
      open_github: ">> Comando ejecutado: Abriendo GITHUB",
      open_linkedin: ">> Comando ejecutado: Abriendo LINKEDIN",
      open_programming: ">> Comando ejecutado: Abriendo PROGRAMACIÓN",
      open_tools: ">> Comando ejecutado: Abriendo HERRAMIENTAS",
      open_about: ">> Comando ejecutado: Abriendo SOBRE MÍ",
      open_manageyourlife: ">> Comando ejecutado: Abriendo MANAGEYOURLIFE",
      open_whattowatch: ">> Comando ejecutado: Abriendo WHATTOWATCH",
      open_bubbleadventure: ">> Comando ejecutado: Abriendo BUBBLEADVENTURE",
      toggle_sound: ">> Comando ejecutado: Alternando sonido",
      toggle_language: ">> Comando ejecutado: Alternando idioma",
      toggle_theme: ">> Comando ejecutado: Alternando tema",
      clear: ">> Comando ejecutado: Limpiando terminal",
      help: ">> AYUDA: Comandos disponibles",
      error: ">> ERROR: COMANDO NO ENCONTRADO"
    },
    help_content: `ir a <sección>   Navegar a una sección (home, about, education, my-projects, contact)
abrir <item>     Abrir un popup (email, github, linkedin, programming, tools, about, manageyourlife, whattowatch, bubbleadventure)
alternar sonido  Activar/desactivar el sonido
alternar idioma  Cambiar idioma entre español e inglés
alternar tema    Cambiar tema entre verde, ámbar y azul
limpiar          Limpiar la salida del terminal
ayuda            Mostrar este mensaje de ayuda`,
    popup: {
      about: {
        title: "SOBRE MÍ",
        description: "Apasionado por la programación. Siempre explorando nuevas tecnologías y desafíos. Estudio Desarrollo de Videojuegos en la UCM de Madrid. También estudié Antropología e hice un Máster en Historia y Antropología de América. Mis proyectos combinan creatividad técnica y estética futurista, inspirados por mundos distópicos y narrativas inmersivas.",
        link: ""
      },
      programming: {
        title: "PROGRAMACIÓN",
        description: "Dominio de lenguajes y herramientas como C++, C#, Python, Java, Android Studio, Unity, SDL, JavaScript, HTML y CSS para desarrollo de videojuegos y aplicaciones web.",
        link: ""
      },
      tools: {
        title: "HERRAMIENTAS",
        description: "Experiencia en Git para control de versiones, Docker para contenedores, Linux para servidores y NAS para almacenamiento.",
        link: ""
      },
      email: {
        title: "EMAIL",
        description: "Contáctame directamente para colaboraciones, proyectos o consultas técnicas.",
        link: "mailto:dorjeekhampa97@gmail.com"
      },
      github: {
        title: "GITHUB",
        description: "Explora mis repositorios en GitHub, donde subo proyectos de código abierto y experimentos.",
        link: "https://github.com/Dorjeekhb"
      },
      linkedin: {
        title: "LINKEDIN",
        description: "Conecta conmigo en LinkedIn para networking profesional y actualizaciones sobre mi carrera.",
        link: "https://www.linkedin.com/in/dorje-khampa-herrezuelo-blasco/"
      },
      manageyourlife: {
        title: "ManageYourLife (Android)",
        description: "Una aplicación Android para la gestión de tareas con etiquetas, prioridades y búsqueda por fecha. Diseñada con Android Studio, ofrece una interfaz intuitiva para organizar tareas diarias.",
        link: "https://github.com/Dorjeekhb/manageyourlife",
        images: [
          "images/2.png",
          "images/3.png",
          "images/1.png"
        ]
      },
      whattowatch: {
        title: "WhatToWatch (watchOS)",
        description: "Una aplicación para watchOS que recomienda series o películas diarias, proporcionando una sinopsis, la duración y la plataforma de streaming disponible. Desarrollada con Swift, ofrece una experiencia fluida en Apple Watch.",
        link: "https://github.com/Dorjeekhb/whattowatch",
        images: [
          "images/4.png",
          "images/5.png",
          "images/6.png",
          "images/7.png",
          "images/12.png",
          "images/22.png",
          "images/32.png"
        ]
      },
      bubbleadventure: {
        title: "Bubble Adventure (Android)",
        description: "Juego tipo Puzzle Bobble desarrollado en Android Studio. Dispara burbujas, combina colores y completa niveles con efectos animados.",
        images: [
          "images/pb1.png",
          "images/pb2.png",
          "images/pb3.png",
          "images/pb4.png",
          "images/pb5.png"
        ],
        link: "https://github.com/Dorjeekhb/BubbleAdventure"
      }
    },
    popup_link: "Ir al enlace",
    sound_label: "SONIDO",
    lang_label: "IDIOMA",
    theme_label: "TEMA",
    on: "ON",
    off: "OFF",
    lang_names: {
      es: "ESPAÑOL",
      en: "INGLÉS"
    },
    theme_names: {
      green: "VERDE",
      amber: "ÁMBAR",
      blue: "AZUL"
    }
  },
  en: {
    booting: ">> BOOTING PIP-BOY 3000 Mk IV...",
    header_title: "Dorjee's Portfolio",
    header_subtitle: "Developer. Digital Explorer. Bug Hunter.",
    about_title: "About Me",
    about_content: "I'm passionate about systems, automation, and impossible challenges. Learning Japanese while hacking reality. I study Video Game Development at UCM in Madrid. I also studied Anthropology and completed a Master's in History and Anthropology of America.",
    education_title: "Education",
    education_degree1: "Degree in Video Game Development",
    education_institution1: "Complutense University of Madrid (UCM)",
    education_years1: "2020 - Present",
    education_degree2: "Master's in History and Anthropology of America",
    education_institution2: "Complutense University of Madrid (UCM)",
    education_years2: "2020 - 2021",
    education_degree3: "Degree in Anthropology",
    education_institution3: "Complutense University of Madrid (UCM)",
    education_years3: "2016 - 2020",
    my_projects_title: "My Projects",
    manageyourlife_description: "Basic task management app with tags, priorities, and date-based search.",
    whattowatch_description: "A watchOS app that recommends daily series or movies, providing a synopsis, duration, and streaming platform.",
    skills_title: "Skills",
    programming_title: ">> Programming",
    programming_content: "C++, C#, Python, Java, Android Studio, Unity, SDL, JavaScript, HTML, CSS",
    tools_title: ">> Tools",
    tools_content: "Git, Docker, Linux, NAS",
    contact_title: "Contact",
    email_title: ">> Email",
    email_content: "dorjeedev@proton.me",
    github_title: ">> GitHub",
    github_content: "github.com/Dorjeekhb",
    linkedin_title: ">> LinkedIn",
    linkedin_content: "linkedin.com/in/dorje-khampa-herrezuelo-blasco",
    footer: "© 2025 Dorjee // root@pipboy",
    resume_button: "DOWNLOAD CV",
    terminal_placeholder: ">> Type command (e.g., goto projects, open email, help)",
    terminal_response: {
      home: ">> Command executed: Navigating to Home",
      about: ">> Command executed: Navigating to About",
      education: ">> Command executed: Navigating to Education",
      my_projects: ">> Command executed: Navigating to My Projects",
      contact: ">> Command executed: Navigating to Contact",
      open_email: ">> Command executed: Opening Email",
      open_github: ">> Command executed: Opening GitHub",
      open_linkedin: ">> Command executed: Opening LinkedIn",
      open_programming: ">> Command executed: Opening Programming",
      open_tools: ">> Command executed: Opening Tools",
      open_about: ">> Command executed: Opening About",
      open_manageyourlife: ">> Command executed: Opening MANAGEYOURLIFE",
      open_whattowatch: ">> Command executed: Opening WHATTOWATCH",
      open_bubbleadventure: ">> Command executed: Opening BUBBLEADVENTURE",
      toggle_sound: ">> Command executed: Toggling sound",
      toggle_language: ">> Command executed: Toggling language",
      toggle_theme: ">> Command executed: Toggling theme",
      clear: ">> Command executed: Clearing terminal",
      help: ">> HELP: Available commands",
      error: ">> ERROR: COMMAND NOT FOUND"
    },
    help_content: `goto <section>   Navigate to a section (home, about, education, my-projects, contact)
open <item>      Open a popup (email, github, linkedin, programming, tools, about, manageyourlife, whattowatch, bubbleadventure)
toggle sound     Toggle sound on/off
toggle language  Toggle language between English and Spanish
toggle theme     Toggle theme between green, amber, and blue
clear            Clear the terminal output
help             Display this help message`,
    popup: {
      about: {
        title: "About Me",
        description: "Passionate about programming and cyberpunk culture. Always exploring new technologies and challenges. I learn Japanese and draw inspiration from anime and horror. I study Video Game Development at UCM in Madrid. I also studied Anthropology and completed a Master's in History and Anthropology of America. My projects blend technical creativity and futuristic aesthetics, inspired by dystopian worlds and immersive narratives.",
        link: ""
      },
      programming: {
        title: "Programming",
        description: "Proficiency in languages and tools like C++, C#, Python, Java, Android Studio, Unity, SDL, JavaScript, HTML, and CSS for game development and web applications.",
        link: ""
      },
      tools: {
        title: "Tools",
        description: "Experience with Git for version control, Docker for containers, Linux for servers, and NAS for storage.",
        link: ""
      },
      email: {
        title: "Email",
        description: "Contact me directly for collaborations, projects, or technical inquiries.",
        link: "mailto:dorjeedev@proton.me"
      },
      github: {
        title: "GitHub",
        description: "Explore my repositories on GitHub, where I share open-source projects and experiments.",
        link: "https://github.com/Dorjeekhb"
      },
      linkedin: {
        title: "LinkedIn",
        description: "Connect with me on LinkedIn for professional networking and career updates.",
        link: "https://www.linkedin.com/in/dorje-khampa-herrezuelo-blasco-070849379/"
      },
      manageyourlife: {
        title: "ManageYourLife (Android)",
        description: "An Android app for task management with tags, priorities, and date-based search. Built with Android Studio, it offers an intuitive interface for organizing daily tasks.",
        link: "https://github.com/Dorjeekhb/manageyourlife",
        images: [
          "images/1.png",
          "images/2.png",
          "images/3.png"
        ]
      },
      whattowatch: {
        title: "WhatToWatch (watchOS)",
        description: "A watchOS app that recommends daily series or movies, providing a synopsis, duration, and streaming platform. Built with Swift, it offers a seamless experience on Apple Watch.",
        link: "https://github.com/Dorjeekhb/whattowatch",
        images: [
          "images/5.png",
          "images/4.png",
          "images/6.png",
          "images/7.png"
        ]
      },
      bubbleadventure: {
        title: "Bubble Adventure (Android)",
        description: "Juego tipo Puzzle Bobble desarrollado en Android Studio. Dispara burbujas, combina colores y completa niveles con efectos animados.",
        images: [
          "images/pb1.png",
          "images/pb2.png",
          "images/pb3.png",
          "images/pb4.png",
          "images/pb5.png"
        ],
        link: "https://github.com/Dorjeekhb/PuzzleBobble"
      }
    },
    popup_link: "Go to link",
    sound_label: "SOUND",
    lang_label: "LANGUAGE",
    theme_label: "THEME",
    on: "ON",
    off: "OFF",
    lang_names: {
      es: "SPANISH",
      en: "ENGLISH"
    },
    theme_names: {
      green: "GREEN",
      amber: "AMBER",
      blue: "BLUE"
    }
  }
};

// Audio Handling
function loadAudio(id) {
  const audio = document.getElementById(id);
  if (audio.getAttribute('src')) return;
  audio.setAttribute('src', audio.dataset.src);
  audio.load();
}

function playClick() {
  if (soundEnabled) {
    loadAudio('click-sound');
    const click = document.getElementById('click-sound');
    click.currentTime = 0;
    click.play();
  }
}

function playKey() {
  if (soundEnabled) {
    loadAudio('key-sound');
    const key = document.getElementById('key-sound');
    key.currentTime = 0;
    key.play();
  }
}

function playGlitch() {
  if (soundEnabled) {
    loadAudio('glitch-sound');
    const glitch = document.getElementById('glitch-sound');
    glitch.currentTime = 0;
    glitch.play();
  }
}

function playNavHover() {
  if (soundEnabled) {
    loadAudio('nav-hover-sound');
    const navHover = document.getElementById('nav-hover-sound');
    navHover.currentTime = 0;
    navHover.play();
  }
}

function playBoot() {
  if (soundEnabled) {
    loadAudio('boot-sound');
    const boot = document.getElementById('boot-sound');
    boot.currentTime = 0;
    boot.play();
  }
}

// Theme Handling
function toggleTheme() {
  const themes = ['green', 'amber', 'blue'];
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  currentTheme = themes[nextIndex];
  document.body.classList.remove('amber-theme', 'blue-theme');
  if (currentTheme === 'amber') document.body.classList.add('amber-theme');
  if (currentTheme === 'blue') document.body.classList.add('blue-theme');
  playClick();
  updateToggles();
}

// Language Handling
function toggleLanguage() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  updateLanguage();
  playClick();
  updateToggles();
}

function updateLanguage() {
  document.querySelectorAll('[data-lang-key]').forEach(element => {
    const key = element.getAttribute('data-lang-key');
    if (key === 'terminal_placeholder') {
      element.placeholder = langData[currentLang][key];
    } else if (langData[currentLang][key]) {
      element.textContent = langData[currentLang][key];
    }
  });
  document.documentElement.lang = currentLang;
  updateTerminalPlaceholder();
  updateResumeLink();
}

function updateTerminalPlaceholder() {
  const terminalInput = document.getElementById('terminalInput');
  const examples = currentLang === 'es' ? 'ir a proyectos, abrir email, ayuda' : 'goto projects, open email, help';
  terminalInput.placeholder = `>> ${currentLang === 'es' ? 'Escribe un comando' : 'Type a command'} (${examples})`;
}

function updateResumeLink() {
  const resumeButton = document.getElementById('resumeButton');
  const resumeButtonMobile = document.getElementById('resumeButtonMobile');
  resumeButton.href = currentLang === 'es' ? 'cves.pdf' : 'cveng.pdf';
  resumeButtonMobile.href = currentLang === 'es' ? 'cves.pdf' : 'cveng.pdf';
}

function speakText(text) {
  if (soundEnabled && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === (currentLang === 'es' ? 'es-ES' : 'en-US')) || voices[0];
    utterance.voice = voice;
    utterance.pitch = 0.8 + (Math.random() * 1.2 - 0.6);
    utterance.rate = 0.9 + (Math.random() * 0.6 - 0.3);
    window.speechSynthesis.speak(utterance);
  }
}

// Popup Handling
function openPopup(id) {
  const data = langData[currentLang].popup[id];
  if (data) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    const popupLink = document.getElementById('popupLink');
    const popupImages = document.getElementById('popupImages');
    const popupOverlay = document.getElementById('popupOverlay');

    popupTitle.textContent = data.title;
    popupDescription.textContent = data.description;
    popupLink.innerHTML = data.link ? `<a href="${data.link}" target="_blank">${langData[currentLang].popup_link}</a>` : '';
    popupImages.innerHTML = data.images ? data.images.map(src => `<img src="${src}" alt="${data.title} screenshot">`).join('') : '';

    popup.classList.add('open');
    popupOverlay.classList.add('open');
    popup.focus();
    playClick();
    document.body.classList.add('popup-open');
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  const popupOverlay = document.getElementById('popupOverlay');
  popup.classList.remove('open');
  popupOverlay.classList.remove('open');
  document.getElementById('terminalInput').focus();
  playClick();
  document.body.classList.remove('popup-open');
}

// Sound Handling
function toggleSound() {
  soundEnabled = !soundEnabled;
  if (!soundEnabled) {
    document.getElementById('bg-music').pause();
    window.speechSynthesis.cancel();
  } else {
    loadAudio('bg-music');
    document.getElementById('bg-music').play().catch(() => {});
  }
  playClick();
  updateToggles();
}

function updateToggles() {
  const soundToggle = document.getElementById('soundToggle');
  const langToggle = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');
  const langToggleMobile = document.getElementById('langToggleMobile');

  soundToggle.textContent = `${langData[currentLang].sound_label}: ${soundEnabled ? langData[currentLang].on : langData[currentLang].off}`;
  langToggle.textContent = `${langData[currentLang].lang_label}: ${langData[currentLang].lang_names[currentLang].toUpperCase()}`;
  themeToggle.textContent = `${langData[currentLang].theme_label}: ${langData[currentLang].theme_names[currentTheme].toUpperCase()}`;
  langToggleMobile.textContent = `${langData[currentLang].lang_label}: ${langData[currentLang].lang_names[currentLang].toUpperCase()}`;
}

function toggleSection(sectionId) {
  const sections = ['about', 'education', 'my-projects', 'contact'];
  sections.forEach(id => {
    const content = document.querySelector(`#${id} > div`);
    const header = document.querySelector(`#${id} > h2`);
    if (content && header) {
      if (id === sectionId) {
        content.classList.toggle('open');
        header.classList.toggle('open');
        header.setAttribute('aria-expanded', content.classList.contains('open'));
      } else {
        content.classList.remove('open');
        header.classList.remove('open');
        header.setAttribute('aria-expanded', 'false');
      }
    }
  });
  playClick();
}

function setActiveSection(sectionId) {
  const sections = ['home', 'about', 'education', 'my-projects', 'contact'];
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) element.classList.remove('active');
  });
  const target = document.getElementById(sectionId);
  if (target) {
    target.classList.add('active');
    if (sectionId !== 'home') {
      toggleSection(sectionId);
    } else {
      sections.forEach(id => {
        const content = document.querySelector(`#${id} > div`);
        const header = document.querySelector(`#${id} > h2`);
        if (content && header) {
          content.classList.remove('open');
          header.classList.remove('open');
          header.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
}

function handleScroll() {
  const header = document.getElementById('home');
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Fade effect for header
  const maxScroll = 100;
  const opacity = Math.max(0, 1 - currentScrollTop / maxScroll);
  header.style.opacity = opacity;

  // Existing hide logic
  if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

function handleCommand(command) {
  const terminalOutput = document.getElementById('terminalOutput');
  terminalOutput.innerHTML += `<div>>> ${command}</div>`;
  let responseText = '';
  const prefix = currentLang === 'es' ? 'ir a' : 'goto';
  const openPrefix = currentLang === 'es' ? 'abrir' : 'open';
  const togglePrefix = currentLang === 'es' ? 'alternar' : 'toggle';
  const clearCommand = currentLang === 'es' ? 'limpiar' : 'clear';
  const helpCommand = currentLang === 'es' ? 'ayuda' : 'help';
  const sections = ['home', 'about', 'education', 'my-projects', 'contact'];
  const popupItems = ['email', 'github', 'linkedin', 'programming', 'tools', 'about', 'manageyourlife', 'whattowatch', 'bubbleadventure'];

  if (command === helpCommand) {
    responseText = langData[currentLang].terminal_response.help;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    terminalOutput.innerHTML += `<div>${langData[currentLang].help_content}</div>`;
    speakText(responseText.replace('>> ', ''));
  } else if (command === clearCommand) {
    terminalOutput.innerHTML = '';
    responseText = langData[currentLang].terminal_response.clear;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    speakText(responseText.replace('>> ', ''));
  } else if (command.startsWith(prefix)) {
    const section = command.replace(prefix, '').trim();
    if (sections.includes(section)) {
      document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
      setActiveSection(section);
      responseText = langData[currentLang].terminal_response[section];
      terminalOutput.innerHTML += `<div>${responseText}</div>`;
      speakText(responseText.replace('>> ', ''));
    } else {
      responseText = langData[currentLang].terminal_response.error;
      terminalOutput.innerHTML += `<div>${responseText}</div>`;
      speakText(responseText.replace('>> ', ''));
    }
  } else if (command.startsWith(openPrefix)) {
    const item = command.replace(openPrefix, '').trim().replace(/ /g, '');
    if (popupItems.includes(item)) {
      openPopup(item);
      responseText = langData[currentLang].terminal_response[`open_${item}`];
      terminalOutput.innerHTML += `<div>${responseText}</div>`;
      speakText(responseText.replace('>> ', ''));
    } else {
      responseText = langData[currentLang].terminal_response.error;
      terminalOutput.innerHTML += `<div>${responseText}</div>`;
      speakText(responseText.replace('>> ', ''));
    }
  } else if (command === `${togglePrefix} sound` || command === `${togglePrefix} sonido`) {
    toggleSound();
    responseText = langData[currentLang].terminal_response.toggle_sound;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    speakText(responseText.replace('>> ', ''));
  } else if (command === `${togglePrefix} language` || command === `${togglePrefix} idioma`) {
    toggleLanguage();
    responseText = langData[currentLang].terminal_response.toggle_language;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    speakText(responseText.replace('>> ', ''));
  } else if (command === `${togglePrefix} theme` || command === `${togglePrefix} tema`) {
    toggleTheme();
    responseText = langData[currentLang].terminal_response.toggle_theme;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    speakText(responseText.replace('>> ', ''));
  } else {
    responseText = langData[currentLang].terminal_response.error;
    terminalOutput.innerHTML += `<div>${responseText}</div>`;
    speakText(responseText.replace('>> ', ''));
  }
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
  suggestions = [];
  suggestionIndex = -1;
  updateSuggestions();
}

function autocompleteCommand(input) {
  suggestions = [];
  suggestionIndex = -1;
  const prefix = currentLang === 'es' ? 'ir a' : 'goto';
  const openPrefix = currentLang === 'es' ? 'abrir' : 'open';
  const togglePrefix = currentLang === 'es' ? 'alternar' : 'toggle';
  const clearCommand = currentLang === 'es' ? 'limpiar' : 'clear';
  const helpCommand = currentLang === 'es' ? 'ayuda' : 'help';
  const sections = ['home', 'about', 'education', 'my-projects', 'contact'];
  const popupItems = ['email', 'github', 'linkedin', 'programming', 'tools', 'about', 'manageyourlife', 'whattowatch', 'bubbleadventure'];
  const toggleCommands = currentLang === 'es' ? ['sonido', 'idioma', 'tema'] : ['sound', 'language', 'theme'];

  const lowerInput = input.toLowerCase().trim();
  if (!lowerInput) return;

  if (prefix.startsWith(lowerInput)) {
    suggestions.push(prefix);
  } else if (lowerInput.startsWith(prefix)) {
    const sectionInput = lowerInput.replace(prefix, '').trim();
    suggestions = sections
      .filter(section => section.startsWith(sectionInput))
      .map(section => `${prefix} ${section}`);
  }

  if (openPrefix.startsWith(lowerInput)) {
    suggestions.push(openPrefix);
  } else if (lowerInput.startsWith(openPrefix)) {
    const itemInput = lowerInput.replace(openPrefix, '').trim();
    suggestions = popupItems
      .filter(item => item.startsWith(itemInput))
      .map(item => `${openPrefix} ${item}`);
  }

  if (togglePrefix.startsWith(lowerInput)) {
    suggestions.push(togglePrefix);
  } else if (lowerInput.startsWith(togglePrefix)) {
    const toggleInput = lowerInput.replace(togglePrefix, '').trim();
    suggestions = toggleCommands
      .filter(toggle => toggle.startsWith(toggleInput))
      .map(toggle => `${togglePrefix} ${toggle}`);
  }

  if (clearCommand.startsWith(lowerInput)) {
    suggestions.push(clearCommand);
  }

  if (helpCommand.startsWith(lowerInput)) {
    suggestions.push(helpCommand);
  }

  updateSuggestions();
}

function updateSuggestions() {
  const terminalOutput = document.getElementById('terminalOutput');
  const existingSuggestions = document.querySelectorAll('.suggestion');
  existingSuggestions.forEach(suggestion => suggestion.remove());

  if (suggestions.length > 0) {
    suggestions.forEach((suggestion, index) => {
      const suggestionElement = document.createElement('div');
      suggestionElement.className = 'suggestion';
      suggestionElement.textContent = `>> ${suggestion}`;
      suggestionElement.setAttribute('role', 'option');
      suggestionElement.setAttribute('aria-selected', index === suggestionIndex);
      if (index === suggestionIndex) {
        suggestionElement.classList.add('selected');
      }
      suggestionElement.addEventListener('click', () => {
        document.getElementById('terminalInput').value = suggestion;
        handleCommand(suggestion);
        playClick();
      });
      terminalOutput.appendChild(suggestionElement);
    });
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }
}

function handleToggleSound() {
  const cmd = currentLang === 'es' ? 'alternar sonido' : 'toggle sound';
  handleCommand(cmd);
}

function handleToggleLanguage() {
  const cmd = currentLang === 'es' ? 'alternar idioma' : 'toggle language';
  handleCommand(cmd);
}

function handleToggleTheme() {
  const cmd = currentLang === 'es' ? 'alternar tema' : 'toggle theme';
  handleCommand(cmd);
}

window.addEventListener('DOMContentLoaded', () => {
  const isMobile = window.innerWidth <= 600;
  const terminal = document.getElementById('terminal');
  const audioPlayer = document.getElementById('audio-player');
  const mobileBottomBar = document.getElementById('mobileBottomBar');

  if (isMobile) {
    if (terminal) terminal.style.display = 'none';
    if (audioPlayer) audioPlayer.style.display = 'none';
    if (mobileBottomBar) mobileBottomBar.style.display = 'flex';
  } else {
    if (terminal) terminal.style.display = 'block';
    if (audioPlayer) audioPlayer.style.display = 'block';
    if (mobileBottomBar) mobileBottomBar.style.display = 'none';
  }

  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };

  const bg = document.getElementById('bg-music');
  bg.volume = 0.3;
  if (soundEnabled && !isMobile) {
    loadAudio('bg-music');
    bg.play().catch(() => {
      document.body.addEventListener('click', () => {
        if (soundEnabled) bg.play();
      }, { once: true });
    });
  }

  playBoot();

  const intro = document.getElementById('intro');
  setTimeout(() => {
    intro.style.display = 'none';
    if (!isMobile) {
      terminal.style.display = 'block';
    }
    document.getElementById('terminalInput').focus();
    document.getElementById('home').classList.add('active');
  }, 5000);

  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim().toLowerCase();
      if (command) {
        commandHistory.unshift(command);
        historyIndex = -1;
        handleCommand(command);
        terminalInput.value = '';
        playClick();
      }
    } else if (e.key === 'ArrowUp') {
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        terminalInput.value = commandHistory[historyIndex];
        suggestions = [];
        suggestionIndex = -1;
        updateSuggestions();
        playKey();
      }
    } else if (e.key === 'ArrowDown') {
      if (historyIndex > -1) {
        historyIndex--;
        terminalInput.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
        suggestions = [];
        suggestionIndex = -1;
        updateSuggestions();
        playKey();
      }
    } else if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      suggestionIndex = (suggestionIndex + 1) % suggestions.length;
      terminalInput.value = suggestions[suggestionIndex];
      updateSuggestions();
      playKey();
    } else {
      autocompleteCommand(terminalInput.value);
      playKey();
    }
  });

  terminalInput.addEventListener('input', () => {
    autocompleteCommand(terminalInput.value);
  });

  document.querySelectorAll('h2').forEach(h2 => {
    h2.addEventListener('click', () => {
      const sectionId = h2.parentElement.id;
      setActiveSection(sectionId);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
    h2.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const sectionId = h2.parentElement.id;
        setActiveSection(sectionId);
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.proyecto, .habilidad, .contacto-item, .about-content p, .education-item').forEach(item => {
    item.addEventListener('click', () => {
      const popupId = item.getAttribute('data-popup-id');
      if (popupId) openPopup(popupId);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const popupId = item.getAttribute('data-popup-id');
        if (popupId) openPopup(popupId);
      }
    });
  });

  document.getElementById('popupOverlay').addEventListener('click', closePopup);

  document.querySelector('.popup-close').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closePopup();
    }
  });

  window.addEventListener('scroll', handleScroll);

  updateLanguage();
  updateToggles();
});

let player;
let isPlaying = false;
let isMuted = false;

const videoUrl = 'https://www.youtube.com/watch?v=Ld37nwZz1RQ&list=RDLd37nwZz1RQ&start_radio=1';
const videoId = videoUrl.split('v=')[1].split('&')[0];

function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '0',
    width: '0',
    videoId: videoId,
    playerVars: {
      'autoplay': 0,
      'controls': 0,
      'modestbranding': 1,
      'rel': 0,
      'showinfo': 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
  const title = player.getVideoData().title || 'Unknown';
  const titleElement = document.querySelector('.player-title');
  titleElement.textContent = title;
  
  setTimeout(() => {
    if (titleElement.scrollWidth > titleElement.clientWidth) {
      titleElement.innerHTML = `<span>${title}       ${title}</span>`;
      titleElement.classList.add('scrolling');
    }
  }, 0);
  
  document.getElementById('mute-btn').textContent = '🔇 Mute';
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('play-pause-btn').textContent = '⏸ Pause';
  } else {
    isPlaying = false;
    document.getElementById('play-pause-btn').textContent = '▶ Play';
  }
}

document.getElementById('play-pause-btn').addEventListener('click', () => {
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
  playClick();
});

document.getElementById('mute-btn').addEventListener('click', () => {
  if (isMuted) {
    player.unMute();
    isMuted = false;
    document.getElementById('mute-btn').textContent = '🔇 Mute';
  } else {
    player.mute();
    isMuted = true;
    document.getElementById('mute-btn').textContent = '🔊 Unmute';
  }
  playClick();
});
