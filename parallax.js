/**
 * parallax.js
 * Copyright (c) 2025 Monika Musielik
 * Licensed under the MIT License – see LICENSE file for details.
 */

// -- CONFIG --
const velocity = 0.2;
const sectionIds = ["s0", "s1", "s2", "s3"];
// -- CONFIG --

const themesContainer = document.createElement('div');
themesContainer.className = 'plx';

sectionIds.forEach((id, index) => {
    const div = document.createElement('div');
    div.id = sectionIds[index] + '-' + themesContainer.className;
    themesContainer.appendChild(div);
});

document.body.prepend(themesContainer);

const main = document.querySelector('#source');
const themes = document.querySelectorAll('.plx > *');
const screenHeight = window.innerHeight;

const sectionOffsets = sectionIds.map(id => {
    const el = document.getElementById(id);
    const rawOffset = el.getBoundingClientRect().top + window.scrollY;
    return rawOffset * (1 + velocity);
})

themes.forEach((theme) => {

    theme.style.position = 'absolute';
    theme.style.height = 'max-content';
    theme.style.inset = '0 0 0 0';

    const clone = main.cloneNode(true);
    if (clone) {
        theme.appendChild(clone);
    }
});
main.remove();
main.remove();

function updateClips() {
    const scrollY = window.scrollY + screenHeight;

    themes.forEach((theme, index) => {

        if (index === 0) {
            theme.style.clipPath = 'none';
            return;
        }

        const start = sectionOffsets[index];
        const clipY = Math.max(0, start - scrollY * velocity);

        theme.style.clipPath = `inset(${clipY}px 0 0 0)`;
    });
}

let ticking = false;
window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            updateClips();
            ticking = false;
        });
        ticking = true;
    }
});

updateClips();