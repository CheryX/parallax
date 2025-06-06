/**
 * parallax.ts
 * Copyright (c) 2025 Monika Musielik
 * Licensed under the MIT License – see LICENSE file for details.
 */

// -- CONFIG --
const velocity: number = 0.2;
const sectionIds: string[] = ['s0', 's1', 's2', 's3'];
// -- CONFIG --

const themesContainer: HTMLDivElement = document.createElement('div');
themesContainer.className = 'plx';

sectionIds.forEach((id, index) => {
  const div: HTMLDivElement = document.createElement('div');
  div.id = `${sectionIds[index]}-${themesContainer.className}`;
  themesContainer.appendChild(div);
});

document.body.prepend(themesContainer);

const main = document.querySelector<HTMLElement>('#source');
const themes = document.querySelectorAll<HTMLElement>('.plx > *');
let screenHeight: number = window.innerHeight;
let sectionOffsets: number[] = [];

if (!main) {
  throw new Error("Element with id 'source' not found.");
}

function calculateOffsets(): void {
  sectionOffsets = sectionIds.map(id => {
    const el = document.getElementById(id);
    if (!el) {
      throw new Error(`Element with id '${id}' not found.`);
    }
    const rawOffset = el.getBoundingClientRect().top + window.scrollY;
    return rawOffset * (1 + velocity);
  });
}

themes.forEach((theme) => {

  theme.style.position = 'absolute';
  theme.style.height = 'max-content';
  theme.style.inset = '0 0 0 0';

  const clone = main.cloneNode(true);
  if (clone instanceof HTMLElement) {
    theme.appendChild(clone);
  }
});
main.remove();

function updateClips(): void {
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

window.addEventListener("resize", () => {
  screenHeight = window.innerHeight;
  calculateOffsets();
  updateClips();
});


calculateOffsets();
updateClips();