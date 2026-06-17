/* ============================================================
   AUDIO ELEMENTS
   ============================================================ */
const bgMusic    = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");
const buttons    = document.querySelectorAll("button");


/* ============================================================
   LOADING SCREEN ELEMENTS
   ============================================================ */
const loadingScreen  = document.getElementById("loading-screen");
const loadingPercent = document.getElementById("loading-percent");
const loadingText    = document.getElementById("loading-text");
const terminal       = document.getElementById("terminal");
const skipBtn        = document.getElementById("skip-btn");


/* ============================================================
   MAIN SCREENS
   ============================================================ */
const characterScreen           = document.getElementById("character-screen");
const characterScreenSubtitle   = document.getElementById("character-screen-subtitle");
const characterScreenText       = "Proceed to archive when ready.";

const navigationScreen          = document.getElementById("navigation-screen");

// BUG FIX: removed four null references to non-existent
// navigation-subtitle-outro1–4 elements.
const navigationSubtitleIntro1  = document.getElementById("navigation-subtitle-intro1");
const navigationSubtitleIntro2  = document.getElementById("navigation-subtitle-intro2");

const navigationIntroText1 = "The following files were salvaged from the remains of the old world.\nEach file may contain fragments of your missing memories.";
const navigationIntroText2 = "Review all available records to maximize recovery success.\nCurrent Memory Integrity: 12%";

const fadeBlack  = document.getElementById("fade-black");

const nextBtn    = document.getElementById("next-btn");
const backBtn    = document.getElementById("back-btn");
const navNextBtn = document.getElementById("nav-next-btn");

// BUG FIX: removed stray leading space before "Happy Birthday"
const closingSubtitle =
    "Subject Identity Restored. Archive Integrity: 100%\n" +
    "Reviewing recovered records...\n" +
    "Analysis Complete. The recovered records indicate that:\n" +
    "Subject formed meaningful connections with numerous individuals.\n" +
    "Subject demonstrated exceptional creativity.\n" +
    "Subject consistently improved the lives of those around her.\n" +
    "Subject's presence was valued.\n" +
    "Additional note discovered. Source: Unknown.\n" +
    "\"Whenever you begin to doubt yourself, return to this archive.\"\n" +
    "Welcome back, Aidyn. Memory recovery complete.\n" +
    "Happy Birthday ;)";


/* ============================================================
   ARCHIVE MODULES
   Each module has 3 related elements:
   - the section itself
   - the nav button that opens it
   - the button that closes it / returns to the archive
   ============================================================ */

// STATS module
const statsModule          = document.getElementById("stats-module");
const statsBtn             = document.getElementById("stats-btn");
const statsBackBtn         = document.getElementById("stats-back-btn");

const statsSubtitleIntro   = document.getElementById("stats-subtitle-intro");
const statsSubtitleOutro   = document.getElementById("stats-subtitle-outro");
const statsIntroText       = "Recovered personality profile.\nGenerated before memory corruption.";
const statsOutroText       = "Memory Fragment Recovered.\nMemory Integrity Increased.";

// ARTIFACTS module
const artifactsModule        = document.getElementById("artifacts-module");
const artifactsBtn           = document.getElementById("artifacts-btn");
const artifactsBackBtn       = document.getElementById("artifacts-back-btn");

const artifactsSubtitleIntro = document.getElementById("artifacts-subtitle-intro");
const artifactsSubtitleOutro = document.getElementById("artifacts-subtitle-outro");
const artifactsIntroText     = "The subject appears to have expressed herself through visual media.\nReviewing these artifacts may assist identity reconstruction.";
const artifactsOutroText     = "Additional identity markers recovered.\nMemory Integrity Increased.";

// SECRET FILE module
const fileModule         = document.getElementById("file-module");
const fileBtn            = document.getElementById("file-btn");
const fileBackBtn        = document.getElementById("file-back-btn");
const secretVideo        = document.getElementById("secret-video");

const fileSubtitleIntro  = document.getElementById("file-subtitle-intro");
const fileSubtitleOutro  = document.getElementById("file-subtitle-outro");
const fileIntroText      = "The subject returned to these files repeatedly.\nReason unknown.";
const fileOutroText      = "Preference data recovered. The subject loved these songs.\nThe reasons may be forgotten but the feelings remain.\nMemory Fragment Recovered.";

// MEMORIES module
const memoriesModule         = document.getElementById("memories-module");
const memoriesBtn            = document.getElementById("memories-btn");
const memoriesBackBtn        = document.getElementById("memories-back-btn");

const memoryRecords          = document.querySelectorAll(".memory-record");
const memoryAuthor           = document.getElementById("memory-author");
const memoryContent          = document.getElementById("memory-content");

const memoriesSubtitleIntro  = document.getElementById("memories-subtitle-intro");
const memoriesSubtitleOutro  = document.getElementById("memories-subtitle-outro");
const memoriesIntroText      = "Memory corruption prevented direct access to many events.\nFortunately, the people who experienced those moments still remember.\nReviewing these records may assist recovery.";
const memoriesOutroText      = "Analysis complete. A consistent pattern was detected: The subject\nwas valued. The subject was remembered. The subject was loved.\nMemory Integrity Increased.";

// LETTER module
const letterModule         = document.getElementById("letter-module");
const letterBtn            = document.getElementById("letter-btn");
const letterBackBtn        = document.getElementById("letter-back-btn");

const letterSubtitleIntro  = document.getElementById("letter-subtitle-intro");
const letterSubtitleOutro  = document.getElementById("letter-subtitle-outro");
const letterIntroText      = "This file was written directly to the subject. Sender identified: Oyuka.\nReview recommended.";
const letterOutroText      = "Message archived successfully. Emotional markers detected.\nMemory Fragment Recovered.";

// Shared loading overlay shown while a module opens/closes
const moduleLoader   = document.getElementById("module-loader");
const moduleTerminal = document.getElementById("module-terminal");


/* ============================================================
   SECRET FILE MODULE — CASSETTE PLAYER
   Clicking a cassette plays its associated audio recording and
   highlights it as "currently playing".
   ============================================================ */
let secretPlayer = new Audio();
const musicFiles = document.querySelectorAll(".music-file");

musicFiles.forEach(file => {
    file.addEventListener("click", () => {
        musicFiles.forEach(f => f.classList.remove("playing"));
        file.classList.add("playing");

        const song = file.dataset.song;
        secretPlayer.pause();
        secretPlayer = new Audio(song);
        secretPlayer.volume = 0.5;
        secretPlayer.play();

        if (!bgMusic.paused) bgMusic.pause();

        secretVideo.currentTime = 0;
        secretVideo.play();
        secretVideo.classList.add("active");
    });
});

/**
 * Stops and rewinds the currently playing cassette.
 * Called when leaving the Secret File module.
 */
function stopSecretAudio() {
    secretPlayer.pause();
    secretPlayer.currentTime = 0;
    musicFiles.forEach(f => f.classList.remove("playing"));
}


/* ============================================================
   STATE FLAGS
   ============================================================ */
let isTransitioning          = false;
let hasReachedCharacterScreen = false;
let loadingCancelled         = false;
let musicStarted             = false;

// BUG FIX: isPlayingOutro is now properly toggled true/false
// around every back-button outro sequence, preventing users
// from clicking nav buttons while the outro animation plays.
let isPlayingOutro = false;


/* ============================================================
   LOADING SEQUENCE CONTENT
   ============================================================ */
const titleText = "Memory Recovery Protocol Initiated";

const logs = [
    "> Subject identified: Aidyn.",
    "> Status: ALIVE",
    "> Memory Integrity: 12%",
    "> Archive Scan Complete",
    "> Recovered Fragments Found",
    "> Beginning Restoration..."
];


/* ============================================================
   TIMING CONSTANTS
   ============================================================ */
const BLACK_FADE_MS  = 500;
const RETURN_FADE_MS = 300;


/* ============================================================
   BACKGROUND MUSIC
   Starts on first user interaction, fades in gently.
   ============================================================ */
async function startMusic() {
    if (musicStarted) return;
    musicStarted = true;

    bgMusic.volume = 0;
    await bgMusic.play().catch(() => {});

    const fadeIn = setInterval(() => {
        if (bgMusic.volume >= 0.15) {
            bgMusic.volume = 0.15;
            clearInterval(fadeIn);
            return;
        }
        bgMusic.volume = Math.min(bgMusic.volume + 0.01, 0.15);
    }, 100);
}


/* ============================================================
   CLICK SOUND
   Attached to every button on the page.
   ============================================================ */
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

buttons.forEach(button => {
    button.addEventListener("click", playClickSound);
});


/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/** Small pause helper. */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** Reveals a hidden button with a short fade-in. */
function revealButton(button) {
    button.classList.remove("hidden-button");
    setTimeout(() => button.classList.add("show-button"), 50);
}

/** Hides a visible button. */
function hideButton(button) {
    button.classList.remove("show-button");
    button.classList.add("hidden-button");
}

/**
 * Types text into a subtitle element one character at a time.
 * "\n" in the source string becomes a real line break because
 * subtitle elements use white-space: pre-line.
 */
async function typeSubtitle(element, text, speed = 25) {
    element.style.visibility = "visible";
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await sleep(speed);
    }
}

/**
 * Returns a function that updates the loading percentage counter
 * each time it is called, based on total characters to type.
 */
function createProgressUpdater(totalCharacters) {
    let typedCharacters = 0;

    return function updateProgress() {
        typedCharacters += 1;
        const percent = Math.floor((typedCharacters / totalCharacters) * 100);
        loadingPercent.textContent = `Loading Character Data: ${percent}%`;
    };
}


/* ============================================================
   SCREEN TRANSITIONS
   ============================================================ */

/** Shared black-fade transition between two main screens. */
async function transitionScreens(fromScreen, fromClass, toScreen, toClass) {
    if (isTransitioning) return;

    isTransitioning = true;
    fadeBlack.classList.add("black");

    await sleep(BLACK_FADE_MS);

    fromScreen.classList.remove(fromClass);
    fromScreen.setAttribute("aria-hidden", "true");

    toScreen.classList.add(toClass);
    toScreen.setAttribute("aria-hidden", "false");

    await sleep(RETURN_FADE_MS);

    fadeBlack.classList.remove("black");
    isTransitioning = false;
}

/**
 * Shows the character screen from the loading screen.
 * Used both by the normal sequence and the skip button.
 */
async function showCharacterScreen() {
    if (hasReachedCharacterScreen) return;

    loadingCancelled          = true;
    hasReachedCharacterScreen = true;
    isTransitioning           = true;

    characterScreenSubtitle.textContent = "";

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    loadingScreen.classList.add("fade-out");
    loadingScreen.setAttribute("aria-hidden", "true");

    characterScreen.classList.add("show-character");
    characterScreen.setAttribute("aria-hidden", "false");

    await sleep(RETURN_FADE_MS);

    fadeBlack.classList.remove("black");
    isTransitioning = false;

    await sleep(2000);
    revealButton(nextBtn);

    await sleep(2000);
    typeSubtitle(characterScreenSubtitle, characterScreenText);
}


/* ============================================================
   MAIN LOADING SEQUENCE
   Types the title and terminal logs, then hands off to
   showCharacterScreen(). Interruptible via the skip button.
   ============================================================ */
async function startLoadingSequence() {
    setTimeout(() => revealButton(skipBtn), 1500);

    const totalCharacters =
        titleText.length +
        logs.reduce((sum, line) => sum + line.length, 0);

    const updateProgress = createProgressUpdater(totalCharacters);

    // Type the main loading title
    for (let i = 0; i < titleText.length; i++) {
        if (loadingCancelled) return;

        loadingText.innerHTML =
            titleText.substring(0, i + 1) +
            '<span class="cursor">|</span>';

        updateProgress();
        await sleep(75);
    }

    if (loadingCancelled) return;
    await sleep(800);

    // Type terminal log lines one by one
    for (const line of logs) {
        if (loadingCancelled) return;

        const p = document.createElement("p");
        terminal.appendChild(p);

        for (let i = 0; i < line.length; i++) {
            if (loadingCancelled) return;
            p.textContent += line[i];
            updateProgress();
            await sleep(20);
        }

        if (loadingCancelled) return;
        await sleep(450);
    }

    loadingPercent.textContent = "Loading Character Data: 100%";
    await sleep(1000);

    if (loadingCancelled) return;
    await showCharacterScreen();
}


/* ============================================================
   SKIP / NEXT / BACK BUTTON EVENTS
   ============================================================ */

skipBtn.addEventListener("click", async () => {
    if (hasReachedCharacterScreen || isTransitioning) return;
    await showCharacterScreen();
});

nextBtn.addEventListener("click", async () => {
    if (isTransitioning) return;

    navigationSubtitleIntro1.textContent = "";
    navigationSubtitleIntro2.textContent = "";

    await transitionScreens(
        characterScreen,
        "show-character",
        navigationScreen,
        "show-navigation"
    );

    await typeSubtitle(navigationSubtitleIntro1, navigationIntroText1);
    await sleep(2200);

    navigationSubtitleIntro1.textContent = "";
    navigationSubtitleIntro1.style.visibility = "hidden";
    await typeSubtitle(navigationSubtitleIntro2, navigationIntroText2);
    await sleep(2000);

    navigationSubtitleIntro2.style.visibility = "hidden";

    hideButton(backBtn);
    setTimeout(() => revealButton(backBtn), 3000);
});

backBtn.addEventListener("click", async () => {
    if (isTransitioning) return;

    hideButton(backBtn);

    await transitionScreens(
        navigationScreen,
        "show-navigation",
        characterScreen,
        "show-character"
    );
});


/* ============================================================
   ARCHIVE MODULE OPEN / CLOSE HELPERS
   ============================================================ */

/**
 * Plays a typing animation inside the full-screen module loader.
 * Used both when opening and closing a module.
 */
async function openModule(lines) {
    moduleLoader.classList.add("active");
    moduleTerminal.innerHTML = "";

    for (const line of lines) {
        const p = document.createElement("p");
        moduleTerminal.appendChild(p);

        for (let i = 0; i < line.length; i++) {
            p.textContent += line[i];
            await sleep(20);
        }
        await sleep(150);
    }

    await sleep(300);
    moduleLoader.classList.remove("active");
    await sleep(300);
}

/** Navigation screen → archive module with black-fade transition. */
async function openArchiveModule(moduleElement, loadingLines) {
    await openModule(loadingLines);

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    navigationScreen.classList.remove("show-navigation");
    navigationScreen.setAttribute("aria-hidden", "true");

    moduleElement.classList.add("show-module");
    moduleElement.setAttribute("aria-hidden", "false");

    await sleep(RETURN_FADE_MS);
    fadeBlack.classList.remove("black");
}

/** Archive module → navigation screen with black-fade transition. */
async function closeArchiveModule(moduleElement, closingLines) {
    await openModule(closingLines);

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    moduleElement.classList.remove("show-module");
    moduleElement.setAttribute("aria-hidden", "true");

    navigationScreen.classList.add("show-navigation");
    navigationScreen.setAttribute("aria-hidden", "false");

    await sleep(RETURN_FADE_MS);
    fadeBlack.classList.remove("black");
}


/* ============================================================
   STATS MODULE EVENTS
   ============================================================ */
statsBtn.addEventListener("click", async () => {
    if (isPlayingOutro) return;

    statsSubtitleIntro.textContent = "";
    statsSubtitleOutro.textContent = "";

    await openArchiveModule(statsModule, [
        "> OPENING STATS.TXT",
        "> READING CHARACTER DATA...",
        "> PROFILE LOADED"
    ]);

    typeSubtitle(statsSubtitleIntro, statsIntroText);
});

statsBackBtn.addEventListener("click", async () => {
    // BUG FIX: isPlayingOutro was never set to true — guard never activated
    isPlayingOutro = true;

    statsSubtitleIntro.style.visibility = "hidden";
    statsSubtitleIntro.textContent = "";
    await typeSubtitle(statsSubtitleOutro, statsOutroText);
    await sleep(600);

    await closeArchiveModule(statsModule, [
        "> CLOSING STATS.TXT",
        "> RETURNING TO ARCHIVE..."
    ]);

    statsSubtitleOutro.textContent = "";
    isPlayingOutro = false;
});


/* ============================================================
   ARTIFACTS MODULE EVENTS
   ============================================================ */
artifactsBtn.addEventListener("click", async () => {
    if (isPlayingOutro) return;

    artifactsSubtitleIntro.textContent = "";
    artifactsSubtitleOutro.textContent = "";

    await openArchiveModule(artifactsModule, [
        "> OPENING LOST_ARTIFACTS.EXE",
        "> SCANNING ARCHIVES...",
        "> RECOVERING IMAGES..."
    ]);

    typeSubtitle(artifactsSubtitleIntro, artifactsIntroText);
});

artifactsBackBtn.addEventListener("click", async () => {
    // BUG FIX: isPlayingOutro guard activated
    isPlayingOutro = true;

    artifactsSubtitleIntro.style.visibility = "hidden";
    artifactsSubtitleIntro.textContent = "";
    await typeSubtitle(artifactsSubtitleOutro, artifactsOutroText);
    await sleep(600);

    await closeArchiveModule(artifactsModule, [
        "> CLOSING LOST_ARTIFACTS.EXE",
        "> RETURNING TO ARCHIVE..."
    ]);

    artifactsSubtitleOutro.textContent = "";
    isPlayingOutro = false;
});


/* ============================================================
   SECRET FILE MODULE EVENTS
   ============================================================ */
fileBtn.addEventListener("click", async () => {
    if (isPlayingOutro) return;

    fileSubtitleIntro.textContent = "";
    fileSubtitleOutro.textContent = "";

    await openArchiveModule(fileModule, [
        "> SECRET_FILE.ENC",
        "> DECRYPTION SUCCESSFUL...",
        "> 5 AUDIO RECORDINGS RECOVERED"
    ]);

    typeSubtitle(fileSubtitleIntro, fileIntroText);
});

fileBackBtn.addEventListener("click", async () => {
    // BUG FIX: isPlayingOutro guard activated
    isPlayingOutro = true;

    fileSubtitleIntro.style.visibility = "hidden";
    fileSubtitleIntro.textContent = "";
    await typeSubtitle(fileSubtitleOutro, fileOutroText);
    await sleep(300);

    secretVideo.pause();
    secretVideo.currentTime = 0;
    secretVideo.classList.remove("active");

    stopSecretAudio();

    if (musicStarted && bgMusic.paused) bgMusic.play();

    await closeArchiveModule(fileModule, [
        "> CLOSING SECRET_FILE.ENC",
        "> RETURNING TO ARCHIVE..."
    ]);

    fileSubtitleOutro.textContent = "";
    isPlayingOutro = false;
});


/* ============================================================
   MEMORIES MODULE EVENTS
   ============================================================ */
memoriesBtn.addEventListener("click", async () => {
    if (isPlayingOutro) return;

    memoriesSubtitleIntro.textContent = "";
    memoriesSubtitleOutro.textContent = "";

    await openArchiveModule(memoriesModule, [
        "> OPENING MEMORIES.EXE",
        "> SCANNING MEMORY RECORDS...",
        "> 12 MEMORY RECORDS RECOVERED"
    ]);

    typeSubtitle(memoriesSubtitleIntro, memoriesIntroText);
});

memoriesBackBtn.addEventListener("click", async () => {
    // BUG FIX: isPlayingOutro guard activated
    isPlayingOutro = true;

    memoriesSubtitleIntro.style.visibility = "hidden";
    memoriesSubtitleIntro.textContent = "";
    await typeSubtitle(memoriesSubtitleOutro, memoriesOutroText);
    await sleep(600);

    await closeArchiveModule(memoriesModule, [
        "> CLOSING MEMORIES.EXE",
        "> RETURNING TO ARCHIVE..."
    ]);

    memoriesSubtitleOutro.textContent = "";
    isPlayingOutro = false;
});

// Clicking a memory record highlights it and loads its
// author/content into the viewer on the right.
memoryRecords.forEach(record => {
    record.addEventListener("click", () => {
        memoryRecords.forEach(r => r.classList.remove("active"));
        record.classList.add("active");

        memoryAuthor.textContent  = `AUTHOR IDENTIFIED: ${record.dataset.author.toUpperCase()}`;
        memoryContent.textContent = record.dataset.memory;
    });
});

// Load the first memory record by default so the viewer isn't empty on open
const firstRecord = document.querySelector(".memory-record");
if (firstRecord) {
    memoryAuthor.textContent  = `AUTHOR IDENTIFIED: ${firstRecord.dataset.author.toUpperCase()}`;
    memoryContent.textContent = firstRecord.dataset.memory;
}


/* ============================================================
   LETTER MODULE EVENTS
   ============================================================ */
letterBtn.addEventListener("click", async () => {
    if (isPlayingOutro) return;

    letterSubtitleIntro.textContent = "";
    letterSubtitleOutro.textContent = "";

    await openArchiveModule(letterModule, [
        "> OPENING LETTER.TXT",
        "> VERIFYING RECIPIENT...",
        "> ACCESS GRANTED"
    ]);

    typeSubtitle(letterSubtitleIntro, letterIntroText);
});

letterBackBtn.addEventListener("click", async () => {
    // BUG FIX: isPlayingOutro guard activated
    isPlayingOutro = true;

    letterSubtitleIntro.style.visibility = "hidden";
    letterSubtitleIntro.textContent = "";
    await typeSubtitle(letterSubtitleOutro, letterOutroText);
    await sleep(600);

    await closeArchiveModule(letterModule, [
        "> CLOSING LETTER.TXT",
        "> RETURNING TO ARCHIVE..."
    ]);

    letterSubtitleOutro.textContent = "";
    isPlayingOutro = false;

    // Reveal the "Memory Revival Complete" button after finishing the letter
    revealButton(navNextBtn);
});


/* ============================================================
   NAV NEXT BUTTON — navigation screen → closing screen
   ============================================================ */
navNextBtn.addEventListener("click", async () => {
    if (isTransitioning) return;

    isTransitioning = true;
    hideButton(navNextBtn);

    const closingSubtitleEl = document.getElementById("closing-subtitle");
    closingSubtitleEl.textContent = "";

    await openModule([
        "> FINALISING MEMORY RECOVERY...",
        "> GENERATING REPORT..."
    ]);

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    // BUG FIX: was targeting "closing-module" which doesn't exist.
    // Must match the corrected id="closing-screen" in index.html.
    navigationScreen.classList.remove("show-navigation");
    navigationScreen.setAttribute("aria-hidden", "true");

    const closingScreen = document.getElementById("closing-screen");
    closingScreen.classList.add("show-closing");
    closingScreen.setAttribute("aria-hidden", "false");

    await sleep(RETURN_FADE_MS);
    fadeBlack.classList.remove("black");
    isTransitioning = false;

    await sleep(800);
    typeSubtitle(closingSubtitleEl, closingSubtitle);
});


/* ============================================================
   STARTUP
   ============================================================ */
startLoadingSequence();
document.addEventListener("click", startMusic, { once: true });