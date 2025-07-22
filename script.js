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
    header_title: "PORTAFOLIO DE DORJEE",
    header_subtitle: "Desarrollador. Explorador digital. Buscador de bugs.",
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
    skills_title: "HABILIDADES",
    programming_title: ">> PROGRAMACIÓN",
    programming_content: "C++, C#, Python, Java, Android Studio, Unity, SDL, JavaScript, HTML, CSS",
    tools_title: ">> HERRAMIENTAS",
    tools_content: "Git, Docker, Linux, NAS",
    projects_title: "PROYECTOS",
    project_title1: "Proyecto 1: Juego de Aventuras",
    project_desc1: "Desarrollo de un juego de aventuras en Unity con elementos de puzzle y narrativa inmersiva.",
    project_title2: "Proyecto 2: Aplicación Web",
    project_desc2: "Aplicación web para gestión de tareas utilizando React y Node.js.",
    contact_title: "CONTACTO",
    email_title: ">> EMAIL",
    email_content: "dorjeedev@proton.me",
    github_title: ">> GITHUB",
    github_content: "github.com/Dorjeekhb",
    linkedin_title: ">> LINKEDIN",
    linkedin_content: "linkedin.com/in/dorje-khampa-herrezuelo-blasco",
    footer: "© 2025 Dorjee // root@pipboy",
    resume_button: "CURRÍCULUM",
    terminal_placeholder: ">> Escribe un comando (ej., ir a proyectos, abrir email, ayuda)",
    terminal_response: {
      home: ">> Comando ejecutado: Navegando a HOME",
      about: ">> Comando ejecutado: Navegando a SOBRE MÍ",
      education: ">> Comando ejecutado: Navegando a EDUCACIÓN",
      skills: ">> Comando ejecutado: Navegando a HABILIDADES",
      projects: ">> Comando ejecutado: Navegando a PROYECTOS",
      contact: ">> Comando ejecutado: Navegando a CONTACTO",
      open_email: ">> Comando ejecutado: Abriendo EMAIL",
      open_github: ">> Comando ejecutado: Abriendo GITHUB",
      open_linkedin: ">> Comando ejecutado: Abriendo LINKEDIN",
      open_programming: ">> Comando ejecutado: Abriendo PROGRAMACIÓN",
      open_tools: ">> Comando ejecutado: Abriendo HERRAMIENTAS",
      open_about: ">> Comando ejecutado: Abriendo SOBRE MÍ",
      open_project1: ">> Comando ejecutado: Abriendo PROYECTO 1",
      open_project2: ">> Comando ejecutado: Abriendo PROYECTO 2",
      toggle_sound: ">> Comando ejecutado: Alternando sonido",
      toggle_language: ">> Comando ejecutado: Alternando idioma",
      toggle_theme: ">> Comando ejecutado: Alternando tema",
      clear: ">> Comando ejecutado: Limpiando terminal",
      help: ">> AYUDA: Comandos disponibles",
      error: ">> ERROR: COMANDO NO ENCONTRADO"
    },
    help_content: `ir a <sección>   Navegar a una sección (home, about, education, skills, projects, contact)
abrir <item>     Abrir un popup (email, github, linkedin, programming, tools, about, project1, project2)
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
        link: "mailto:dorjeedev@proton.me"
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
      project1: {
        title: "Proyecto 1: Juego de Aventuras",
        description: "Un juego desarrollado en Unity que incluye mecánicas de puzzle y una historia inmersiva en un mundo cyberpunk.",
        link: "https://github.com/Dorjeekhb/juego-aventuras"
      },
      project2: {
        title: "Proyecto 2: Aplicación Web",
        description: "Aplicación para gestión de tareas con interfaz moderna y backend en Node.js.",
        link: "https://github.com/Dorjeekhb/app-web-tareas"
      }
    },
    popup_link: "Ir al enlace",
    // New additions for toggles
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
    skills_title: "Skills",
    programming_title: ">> Programming",
    programming_content: "C++, C#, Python, Java, Android Studio, Unity, SDL, JavaScript, HTML, CSS",
    tools_title: ">> Tools",
    tools_content: "Git, Docker, Linux, NAS",
    projects_title: "Projects",
    project_title1: "Project 1: Adventure Game",
    project_desc1: "Development of an adventure game in Unity with puzzle elements and immersive narrative.",
    project_title2: "Project 2: Web Application",
    project_desc2: "Web application for task management using React and Node.js.",
    contact_title: "Contact",
    email_title: ">> Email",
    email_content: "dorjeedev@proton.me",
    github_title: ">> GitHub",
    github_content: "github.com/Dorjeekhb",
    linkedin_title: ">> LinkedIn",
    linkedin_content: "linkedin.com/in/dorje-khampa-herrezuelo-blasco",
    footer: "© 2025 Dorjee // root@pipboy",
    resume_button: "RESUMÉ",
    terminal_placeholder: ">> Type command (e.g., goto projects, open email, help)",
    terminal_response: {
      home: ">> Command executed: Navigating to Home",
      about: ">> Command executed: Navigating to About",
      education: ">> Command executed: Navigating to Education",
      skills: ">> Command executed: Navigating to Skills",
      projects: ">> Command executed: Navigating to Projects",
      contact: ">> Command executed: Navigating to Contact",
      open_email: ">> Command executed: Opening Email",
      open_github: ">> Command executed: Opening GitHub",
      open_linkedin: ">> Command executed: Opening LinkedIn",
      open_programming: ">> Command executed: Opening Programming",
      open_tools: ">> Command executed: Opening Tools",
      open_about: ">> Command executed: Opening About",
      open_project1: ">> Command executed: Opening Project 1",
      open_project2: ">> Command executed: Opening Project 2",
      toggle_sound: ">> Command executed: Toggling sound",
      toggle_language: ">> Command executed: Toggling language",
      toggle_theme: ">> Command executed: Toggling theme",
      clear: ">> Command executed: Clearing terminal",
      help: ">> HELP: Available commands",
      error: ">> ERROR: COMMAND NOT FOUND"
    },
    help_content: `goto <section>   Navigate to a section (home, about, education, skills, projects, contact)
open <item>      Open a popup (email, github, linkedin, programming, tools, about, project1, project2)
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
        link: "https://www.linkedin.com/in/dorje-khampa-herrezuelo-blasco/"
      },
      project1: {
        title: "Project 1: Adventure Game",
        description: "A game developed in Unity featuring puzzle mechanics and an immersive story in a cyberpunk world.",
        link: "https://github.com/Dorjeekhb/adventure-game"
      },
      project2: {
        title: "Project 2: Web Application",
        description: "Task management web app with modern UI and Node.js backend.",
        link: "https://github.com/Dorjeekhb/web-app-tasks"
      }
    },
    popup_link: "Go to link",
    // New additions for toggles
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
  updateToggles();  // Ensure toggles update after language change
}

function updateTerminalPlaceholder() {
  const terminalInput = document.getElementById('terminalInput');
  const examples = currentLang === 'es' ? 'ir a proyectos, abrir email, ayuda' : 'goto projects, open email, help';
  terminalInput.placeholder = `>> ${currentLang === 'es' ? 'Escribe un comando' : 'Type a command'} (${examples})`;
}

function updateResumeLink() {
  const resumeButton = document.getElementById('resumeButton');
  resumeButton.href = currentLang === 'es' ? 'cves.pdf' : 'cveng.pdf';
}

function speakText(text) {
  if (soundEnabled && window.speechSynthesis) {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang === (currentLang === 'es' ? 'es-ES' : 'en-US')) || voices[0];
    utterance.voice = voice;
    // Randomize pitch and rate for defective robot effect
    utterance.pitch = 0.8 + (Math.random() * 1.2 - 0.6); // Vary between 0.2 and 2.0
    utterance.rate = 0.9 + (Math.random() * 0.6 - 0.3); // Vary between 0.6 and 1.5
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
    const popupOverlay = document.getElementById('popupOverlay');

    popupTitle.textContent = data.title;
    popupDescription.textContent = data.description;
    popupLink.innerHTML = data.link ? `<a href="${data.link}" target="_blank">${langData[currentLang].popup_link}</a>` : '';

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

// New function to update all toggle buttons
function updateToggles() {
  const soundToggle = document.getElementById('soundToggle');
  const langToggle = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');

  soundToggle.textContent = `${langData[currentLang].sound_label}: ${soundEnabled ? langData[currentLang].on : langData[currentLang].off}`;
  langToggle.textContent = `${langData[currentLang].lang_label}: ${langData[currentLang].lang_names[currentLang].toUpperCase()}`;
  themeToggle.textContent = `${langData[currentLang].theme_label}: ${langData[currentLang].theme_names[currentTheme].toUpperCase()}`;
}

// Section Handling
function toggleSection(sectionId) {
  const sections = ['about', 'education', 'skills', 'projects', 'contact'];
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
  const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
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

// Terminal Command Handling
function handleCommand(command) {
  const terminalOutput = document.getElementById('terminalOutput');
  terminalOutput.innerHTML += `<div>>> ${command}</div>`;
  let responseText = '';
  const prefix = currentLang === 'es' ? 'ir a' : 'goto';
  const openPrefix = currentLang === 'es' ? 'abrir' : 'open';
  const togglePrefix = currentLang === 'es' ? 'alternar' : 'toggle';
  const clearCommand = currentLang === 'es' ? 'limpiar' : 'clear';
  const helpCommand = currentLang === 'es' ? 'ayuda' : 'help';
  const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
  const popupItems = ['email', 'github', 'linkedin', 'programming', 'tools', 'about', 'project1', 'project2'];

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
    const item = command.replace(openPrefix, '').trim().replace(/ /g, '-');
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

// Autocomplete Handling
function autocompleteCommand(input) {
  suggestions = [];
  suggestionIndex = -1;
  const prefix = currentLang === 'es' ? 'ir a' : 'goto';
  const openPrefix = currentLang === 'es' ? 'abrir' : 'open';
  const togglePrefix = currentLang === 'es' ? 'alternar' : 'toggle';
  const clearCommand = currentLang === 'es' ? 'limpiar' : 'clear';
  const helpCommand = currentLang === 'es' ? 'ayuda' : 'help';
  const sections = ['home', 'about', 'education', 'skills', 'projects', 'contact'];
  const popupItems = ['email', 'github', 'linkedin', 'programming', 'tools', 'about', 'project1', 'project2'];
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

// Scroll Handling for Header
function handleScroll() {
  const header = document.getElementById('home');
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
    header.classList.add('hidden');
  } else {
    header.classList.remove('hidden');
  }
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}

// Button Handlers
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

// Initialization
window.addEventListener('DOMContentLoaded', () => {
  // Detectar si es un dispositivo móvil
  const isMobile = window.innerWidth <= 600;

  // Referencias a los elementos del terminal y el reproductor de audio
  const terminal = document.getElementById('terminal');
  const audioPlayer = document.getElementById('audio-player');

  // Ocultar terminal y reproductor de audio en dispositivos móviles
  if (isMobile) {
    if (terminal) terminal.style.display = 'none';
    if (audioPlayer) audioPlayer.style.display = 'none';
  } else {
    // Mostrar terminal y reproductor en escritorio
    if (terminal) terminal.style.display = 'block';
    if (audioPlayer) audioPlayer.style.display = 'block';
  }

  // Resto del código existente...
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };

  const bg = document.getElementById('bg-music');
  bg.volume = 0.3;
  if (soundEnabled && !isMobile) { // Solo reproducir audio en escritorio
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
    if (!isMobile) { // Mostrar terminal solo en escritorio
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
  updateToggles();  // Initial update for toggles
});
// JS updates: Start unmuted by default, adjust initial button text

// YouTube Player variables
let player;
let isPlaying = false;
let isMuted = false; // Start unmuted

// Predefined YouTube video URL (replace with your desired link)
// For production, you could extract from a hidden input: const videoUrl = document.getElementById('hidden-yt-input').value;
const videoUrl = 'https://www.youtube.com/watch?v=Ld37nwZz1RQ&list=RDLd37nwZz1RQ&start_radio=1'; // Test video (Rick Astley)
const videoId = videoUrl.split('v=')[1].split('&')[0]; // Extract video ID

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 600;
}

// Function to initialize YouTube Player (called by the API script)
function onYouTubeIframeAPIReady() {
  player = new YT.Player('yt-player', {
    height: '0', // Hidden
    width: '0',  // Hidden
    videoId: videoId,
    playerVars: {
      'autoplay': 0, // No initial autoplay
      'controls': 0, // No controls visible
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

// When player is ready, get title and set initial state
function onPlayerReady(event) {
  // Get video title
  const title = player.getVideoData().title || 'Unknown';
  const titleElement = document.querySelector('.player-title');
  titleElement.textContent = title;
  
  // Check if title overflows and apply scrolling if needed
  setTimeout(() => { // Wait for rendering
    if (titleElement.scrollWidth > titleElement.clientWidth) {
      titleElement.innerHTML = `<span>${title}     ${title}</span>`;
      titleElement.classList.add('scrolling');
    }
  }, 0);
  
  // No initial mute since play requires user interaction
  document.getElementById('mute-btn').textContent = '🔇 Mute'; // Shows to mute
}

// Handle state changes (e.g., for play/pause button updates)
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    document.getElementById('play-pause-btn').textContent = '⏸ Pause';
  } else {
    isPlaying = false;
    document.getElementById('play-pause-btn').textContent = '▶ Play';
  }
}

// Play/Pause button handler
document.getElementById('play-pause-btn').addEventListener('click', () => {
  if (isPlaying) {
    player.pauseVideo();
  } else {
    player.playVideo(); // Autoplays on click
  }
  playClick(); // Integrate with existing sound effect if desired
});

// Mute/Unmute button handler
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
  playClick(); // Integrate with existing sound effect if desired
});
