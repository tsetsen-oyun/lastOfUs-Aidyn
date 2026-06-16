/* ============================================================
   AUDIO ELEMENTS
   ============================================================ */
const bgMusic = document.getElementById("bg-music");
const clickSound = document.getElementById("click-sound");
const buttons = document.querySelectorAll("button");


/* ============================================================
   LOADING SCREEN ELEMENTS
   ============================================================ */
const loadingScreen = document.getElementById("loading-screen");
const loadingPercent = document.getElementById("loading-percent");
const loadingText = document.getElementById("loading-text");
const terminal = document.getElementById("terminal");
const skipBtn = document.getElementById("skip-btn");


/* ============================================================
   MAIN SCREENS
   ============================================================ */
const characterScreen = document.getElementById("character-screen");
const navigationScreen = document.getElementById("navigation-screen");

const navigationSubtitleIntro1 = document.getElementById("navigation-subtitle-intro1");
const navigationSubtitleIntro2 = document.getElementById("navigation-subtitle-intro2");
const navigationSubtitleOutro1 = document.getElementById("navigation-subtitle-outro1");
const navigationSubtitleOutro2 = document.getElementById("navigation-subtitle-outro2");
const navigationSubtitleOutr3 = document.getElementById("navigation-subtitle-outro3");
const navigationSubtitleOutr4 = document.getElementById("navigation-subtitle-outro4");
const navigationIntroText1 = "The following files were salvaged from the remains of the old world.\nEach file may contain fragments of your missing memories.";
const navigationIntroText2 = "Review all available records to maximize recovery success.\nCurrent Memory Integrity: 12%";
const navigationOutroText1 = "Subject Identity Restored. Archive Integrity: 100%\nReviewing recovered records...";
const navigationOutroText2 = "Analysis Complete. The recovered records indicate that: \nSubject formed meaningful connections with numerous individuals.\nSubject demonstrated exceptional creativity.\nSubject consistently improved the lives of those around her.\nSubject's presence was valued.";
const navigationOutroText3 = "Additional note discovered. Source: Unknown.\n\"Whenever you begin to doubt yourself, return to this archive.";
const navigationOutroText4 = "Welcome back, Aidyn. Memory recovery complete.\n Happy Birthday;)";

const fadeBlack = document.getElementById("fade-black");

const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");


/* ============================================================
   ARCHIVE MODULES
   Each module has 3 related elements:
   - the section itself
   - the nav button that opens it
   - the button that closes it / returns to the archive
   ============================================================ */

// STATS module
const statsModule = document.getElementById("stats-module");
const statsBtn = document.getElementById("stats-btn");
const statsBackBtn = document.getElementById("stats-back-btn");

const statsSubtitleIntro = document.getElementById("stats-subtitle-intro");
const statsSubtitleOutro = document.getElementById("stats-subtitle-outro");
const statsIntroText = "Recovered personality profile.\nGenerated before memory corruption.";
const statsOutroText = "Memory Fragment Recovered.\nMemory Integrity Increased.";

// ARTIFACTS module
const artifactsModule = document.getElementById("artifacts-module");
const artifactsBtn = document.getElementById("artifacts-btn");
const artifactsBackBtn = document.getElementById("artifacts-back-btn");

const artifactsSubtitleIntro = document.getElementById("artifacts-subtitle-intro");
const artifactsSubtitleOutro = document.getElementById("artifacts-subtitle-outro");
const artifactsIntroText = "The subject appears to have expressed herself through visual media.\nReviewing these artifacts may assist identity reconstruction.";
const artifactsOutroText = "Additional identity markers recovered.\nMemory Integrity Increased.";


// SECRET FILE module
const fileModule = document.getElementById("file-module");
const fileBtn = document.getElementById("file-btn");
const fileBackBtn = document.getElementById("file-back-btn");
const secretVideo = document.getElementById("secret-video");

const fileSubtitleIntro = document.getElementById("file-subtitle-intro");
const fileSubtitleOutro = document.getElementById("file-subtitle-outro");
const fileIntroText = "The subject returned to these files repeatedly.\nReason unknown.";
const fileOutroText = "Preference data recovered. The subject loved these songs.\nThe reasons may be forgotten but the feelings remain.\nMemory Fragment Recovered.";

// MEMORIES module
const memoriesModule = document.getElementById("memories-module");
const memoriesBtn = document.getElementById("memories-btn");
const memoriesBackBtn = document.getElementById("memories-back-btn");

// Memory viewer: clicking a record fills these in
const memoryRecords = document.querySelectorAll(".memory-record");
const memoryAuthor = document.getElementById("memory-author");
const memoryContent = document.getElementById("memory-content");

const memoriesSubtitleIntro = document.getElementById("memories-subtitle-intro");
const memoriesSubtitleOutro = document.getElementById("memories-subtitle-outro");
const memoriesIntroText = "Witness testimonies recovered. Memory corruption prevented direct access to many events\nFortunately, the people who experienced those moments still remember.\n Reviewing these records may assist recovery.";
const memoriesOutroText = "MAnalysis complete. A consistent pattern was detected.:\n The subject was valued. The subject was remembered. The subject was loved.\n Memory Integrity Increased.";

// LETTER module
const letterModule = document.getElementById("letter-module");
const letterBtn = document.getElementById("letter-btn");
const letterBackBtn = document.getElementById("letter-back-btn");

const letterSubtitleIntro = document.getElementById("letter-subtitle-intro");
const letterSubtitleOutro = document.getElementById("letter-subtitle-outro");
const letterIntroText = "This file was written directly to the subject. Sender identified: Oyuka\nReview recommended.";
const letterOutroText = "Message archived successfully.Emotional markers detected.\nMemory Fragment Recovered.";

// Shared "loading" overlay shown while a module opens/closes
const moduleLoader = document.getElementById("module-loader");
const moduleTerminal = document.getElementById("module-terminal");


/* ============================================================
   SECRET FILE MODULE - CASSETTE PLAYER
   Clicking a cassette plays its associated audio recording and
   highlights it as "currently playing".
   ============================================================ */
let secretPlayer = new Audio();
const musicFiles = document.querySelectorAll(".music-file");

musicFiles.forEach(file => {
    file.addEventListener("click", () => {
        // Only one cassette is highlighted as "playing" at a time
        musicFiles.forEach(f => f.classList.remove("playing"));
        file.classList.add("playing");

        // Stop whatever is currently playing and start the new track
        const song = file.dataset.song;
        secretPlayer.pause();
        secretPlayer = new Audio(song);
        secretPlayer.volume = 0.5;
        secretPlayer.play();

        // Pause the background music while a recording is playing
        if (!bgMusic.paused) {
            bgMusic.pause();
        }

        // VIDEO STARTS
        secretVideo.currentTime = 0;
        secretVideo.play();
        secretVideo.classList.add("active");
    });

});
/**
 * Stops and rewinds whatever cassette is currently playing.
 * Called when leaving the Secret File module so audio doesn't
 * keep playing in the background.
 */
function stopSecretAudio() {
    secretPlayer.pause();
    secretPlayer.currentTime = 0;
}

/* ============================================================
   STATE FLAGS
   ============================================================ */
let isTransitioning = false;
let hasReachedCharacterScreen = false;
let loadingCancelled = false;
let musicStarted = false;


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
const BLACK_FADE_MS = 1000;
const RETURN_FADE_MS = 300;


/* ============================================================
   BACKGROUND MUSIC
   ============================================================ */

/**
 * Starts the background music and fades it in gently.
 * Runs once, triggered by the user's first click anywhere.
 */
async function startMusic() {
    if (musicStarted) return;
    musicStarted = true;

    bgMusic.volume = 0;
    await bgMusic.play();

    const fadeIn = setInterval(() => {
        if (bgMusic.volume >= 0.15) {
            clearInterval(fadeIn);
            return;
        }
        bgMusic.volume += 0.01;
    }, 100);

    bgMusic.volume = 0.15;
}


/* ============================================================
   CLICK SOUND
   ============================================================ */

/**
 * Plays the UI click sound from the start, every time.
 */
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

// Attach the click sound to every button on the page
buttons.forEach(button => {
    button.addEventListener("click", playClickSound);
});


/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

/**
 * Small pause helper.
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Reveals a hidden button, then fades it in shortly after.
 */
function revealButton(button) {
    button.classList.remove("hidden-button");

    setTimeout(() => {
        button.classList.add("show-button");
    }, 50);
}

/**
 * Types text into a subtitle element one character at a time.
 * "\n" in the source string becomes a real line break, since
 * .stats-subtitle uses white-space: pre-line.
 */
async function typeSubtitle(element, text, speed = 25) {
    element.textContent = "";

    for (let i = 0; i < text.length; i++) {
        element.textContent += text[i];
        await sleep(speed);
    }
}

/**
 * Returns a function that updates the bottom-right loading
 * percentage each time it's called, based on how many of the
 * total characters have been "typed" so far.
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

/**
 * Shared black-fade transition between two main screens.
 */
async function transitionScreens(fromScreen, fromClass, toScreen, toClass) {
    if (isTransitioning) return;

    isTransitioning = true;
    fadeBlack.classList.add("black");

    await sleep(BLACK_FADE_MS);

    fromScreen.classList.remove(fromClass);
    toScreen.classList.add(toClass);

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

    loadingCancelled = true;
    hasReachedCharacterScreen = true;
    isTransitioning = true;

    fadeBlack.classList.add("black");

    await sleep(BLACK_FADE_MS);

    loadingScreen.classList.add("fade-out");
    loadingScreen.setAttribute("aria-hidden", "true");

    characterScreen.classList.add("show-character");
    characterScreen.setAttribute("aria-hidden", "false");

    setTimeout(() => {
        revealButton(nextBtn);
    }, 3000);

    await sleep(RETURN_FADE_MS);

    fadeBlack.classList.remove("black");
    isTransitioning = false;
}


/* ============================================================
   MAIN LOADING SEQUENCE
   Types out the title and terminal log lines, then hands off
   to showCharacterScreen(). Can be interrupted at any point
   by the skip button (loadingCancelled).
   ============================================================ */
async function startLoadingSequence() {
    // Give the user a way to skip the typing animation
    setTimeout(() => revealButton(skipBtn), 1000);

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

// Skip button: jumps directly to the character screen
skipBtn.addEventListener("click", async () => {
    if (hasReachedCharacterScreen || isTransitioning) return;
    await showCharacterScreen();
});

// Next button: character screen -> navigation screen
nextBtn.addEventListener("click", async () => {
    if (isTransitioning) return;

    navigationSubtitleIntro1.textContent = "";
    navigationSubtitleIntro2.textContent = "";

    navigationSubtitleOutro1.textContent = "";
    navigationSubtitleOutro2.textContent = "";
    navigationSubtitleOutro3.textContent = "";
    navigationSubtitleOutro4.textContent = "";

    await transitionScreens(
        characterScreen,
        "show-character",
        navigationScreen,
        "show-navigation"
    );

    typeSubtitle(navigationSubtitleIntro1, navigationIntroText1);

    navigationSubtitleIntro1.textContent = "";
    await typeSubtitle(artifactsSubtitleOutro, artifactsOutroText);
    await sleep(600);

    typeSubtitle(artifactsSubtitleIntro2, artifactsIntroText2);

    backBtn.classList.remove("show-button");
    backBtn.classList.add("hidden-button");

    setTimeout(() => {
        revealButton(backBtn);
    }, 3000);
});

artifactsBtn.addEventListener("click", async () => {

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

    statsSubtitleIntro.textContent = "";
    await typeSubtitle(artifactsSubtitleOutro, artifactsOutroText);
    await sleep(600);

    await closeArchiveModule(artifactsModule, [
        "> CLOSING LOST_ARTIFACTS.EXE",
        "> RETURNING TO ARCHIVE..."
    ]);
});


// Back button: navigation screen -> character screen
backBtn.addEventListener("click", async () => {
    if (isTransitioning) return;

    backBtn.classList.remove("show-button");
    backBtn.classList.add("hidden-button");

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
 * Plays a typing animation inside the full-screen module loader
 * overlay. Used both when opening and closing a module.
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
        await sleep(300);
    }

    await sleep(700);
    moduleLoader.classList.remove("active");
    await sleep(500); // wait for loader fade-out to finish
}

/**
 * Navigation screen -> archive module, with a loading animation
 * and black-fade transition in between.
 */
async function openArchiveModule(moduleElement, loadingLines) {
    await openModule(loadingLines);

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    navigationScreen.classList.remove("show-navigation");
    moduleElement.classList.add("show-module");

    await sleep(RETURN_FADE_MS);
    fadeBlack.classList.remove("black");
}

/**
 * Archive module -> navigation screen, with a closing animation
 * and black-fade transition in between.
 */
async function closeArchiveModule(moduleElement, closingLines) {
    await openModule(closingLines);

    fadeBlack.classList.add("black");
    await sleep(BLACK_FADE_MS);

    moduleElement.classList.remove("show-module");
    navigationScreen.classList.add("show-navigation");

    await sleep(RETURN_FADE_MS);
    fadeBlack.classList.remove("black");
}


/* ============================================================
   STATS MODULE EVENTS
   ============================================================ */
statsBtn.addEventListener("click", async () => {
    // Reset subtitles each time the module is (re)opened
    statsSubtitleIntro.textContent = "";
    statsSubtitleOutro.textContent = "";

    await openArchiveModule(statsModule, [
        "> OPENING STATS.TXT",
        "> READING CHARACTER DATA...",
        "> PROFILE LOADED"
    ]);

    // Type out the intro subtitle now that the module is visible
    typeSubtitle(statsSubtitleIntro, statsIntroText);
});

statsBackBtn.addEventListener("click", async () => {
    // Hide the intro subtitle, then reveal the outro subtitle
    // before leaving the module
    statsSubtitleIntro.textContent = "";
    await typeSubtitle(statsSubtitleOutro, statsOutroText);
    await sleep(600);

    await closeArchiveModule(statsModule, [
        "> CLOSING STATS.TXT",
        "> RETURNING TO ARCHIVE..."
    ]);
});

/* ============================================================
   ARTIFACTS MODULE EVENTS
   ============================================================ */
artifactsBtn.addEventListener("click", async () => {

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

    statsSubtitleIntro.textContent = "";
    await typeSubtitle(artifactsSubtitleOutro, artifactsOutroText);
    await sleep(600);

    await closeArchiveModule(artifactsModule, [
        "> CLOSING LOST_ARTIFACTS.EXE",
        "> RETURNING TO ARCHIVE..."
    ]);
});


/* ============================================================
   LETTER MODULE EVENTS
   ============================================================ */
letterBtn.addEventListener("click", async () => {

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

    letterSubtitleIntro.textContent = "";
    await typeSubtitle(letterSubtitleOutro, letterOutroText);
    await sleep(600);

    await closeArchiveModule(letterModule, [
        "> CLOSING LETTER.TXT",
        "> RETURNING TO ARCHIVE..."
    ]);
});

/* ============================================================
   MEMORIES MODULE EVENTS
   ============================================================ */
memoriesBtn.addEventListener("click", async () => {

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

    memoriesSubtitleIntro.textContent = "";
    await typeSubtitle(memoriesSubtitleOutro, memoriesOutroText);
    await sleep(600);

    await closeArchiveModule(memoriesModule, [
        "> CLOSING MEMORIES.EXE",
        "> RETURNING TO ARCHIVE..."
    ]);
});

// Clicking a memory record highlights it and loads its
// author/content into the viewer on the right
memoryRecords.forEach(record => {
    record.addEventListener("click", () => {
        memoryRecords.forEach(r => r.classList.remove("active"));
        record.classList.add("active");

        memoryAuthor.textContent = `AUTHOR IDENTIFIED: ${record.dataset.author.toUpperCase()}`;
        memoryContent.textContent = record.dataset.memory;
    });
});


/* ============================================================
   SECRET FILE MODULE EVENTS
   ============================================================ */
fileBtn.addEventListener("click", async () => {

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

    fileSubtitleIntro.textContent = "";
    await typeSubtitle(fileSubtitleOutro, fileOutroText);
    await sleep(300);

    // secretPlayer.pause();
    // secretPlayer.currentTime = 0;
    secretVideo.pause();
    secretVideo.currentTime = 0;
    secretVideo.classList.remove(
        "active"
    );

    stopSecretAudio();

    // Resume background music once the recording stops
    if (musicStarted && bgMusic.paused) {
        bgMusic.play();
    }

    await closeArchiveModule(fileModule, [
        "> CLOSING SECRET_FILE.ENC",
        "> RETURNING TO ARCHIVE..."
    ]);

});

/* ============================================================
   STARTUP
   ============================================================ */

// Begin the loading screen typing animation
startLoadingSequence();

// Start background music on the user's first click anywhere
document.addEventListener("click", startMusic, { once: true });