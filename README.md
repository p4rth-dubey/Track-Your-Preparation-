# Class 10 Planner
 
A dark, aurora-themed study planner for CBSE Class 10. Sort every chapter of Mathematics, Science, Social Science and English by drag and drop, then track five jobs inside each chapter.
 
Made by Parth.
 
## Features
 
- **Landing page** with a 3D animated background, a live progress card, a chapter marquee and a FAQ.
- **Syllabus board** with three columns: Completed, Partially done and Not started. Drag a chapter card to move it. On touch screens, use the dropdown on each card.
- **Chapter checklist** with five checkboxes per chapter: Lectures, NCERT, Notes, CBQs and PYQs, and Revision. Each chapter and each subject has a progress bar.
- **Saved automatically** in your browser (localStorage). No account, no server.
- **Responsive** layout, keyboard focus styles, and reduced-motion support.
## Requirements
 
- [Node.js](https://nodejs.org) 18 or newer (the LTS version is fine)
Check it is installed:
 
```
node -v
```
 
## Getting started
 
1. Unzip the folder.
2. Open a terminal inside the `class10-planner` folder (the one containing `package.json`).
3. Install the dependencies:
```
   npm install
```
 
4. Start the development server:
```
   npm run dev
```
 
5. Open the link shown in the terminal, usually `http://localhost:5173`.
## Build for hosting
 
```
npm run build
```
 
This creates a `dist` folder. Upload it to any static host (Vercel, Netlify, GitHub Pages). Preview it locally with `npm run preview`.
 
## Project structure
 
```
class10-planner/
├── index.html            Page shell and font links
├── package.json          Dependencies and scripts
├── vite.config.js        Vite configuration
└── src/
    ├── main.jsx          App entry point (HashRouter)
    ├── App.jsx           Navigation, routes and footer
    ├── Background.jsx    Aurora glow and 3D particle canvas
    ├── data.js           Subjects, chapters, statuses and checklist items
    ├── useStored.js      Small localStorage hook
    ├── styles.css        All styling and theme colours
    └── pages/
        ├── Landing.jsx   Home page
        ├── Tracker.jsx   Drag and drop syllabus board
        └── Checklist.jsx Per-chapter to-do list
```
 
## Customising
 
- **Chapters:** edit the lists in `src/data.js`. Chapter ids are generated from the order, so avoid reordering chapters after you have saved progress.
- **Checklist items:** change the `TASKS` array in `src/data.js`.
- **Colours:** change the CSS variables at the top of `src/styles.css`.
- **3D background density:** change the particle count (`120`) in `src/Background.jsx`. Lower it if the page feels slow.
## Troubleshooting
 
**`npm` fails in PowerShell but `npm.cmd` works.**
PowerShell blocks script files by default. Either use Command Prompt, run `npm.cmd` instead, or allow scripts for your user with:
 
```
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
 
**`vite` is not recognised.**
Run `npm install` first, from inside the project folder. Vite is installed by that command.
 
**My progress disappeared.**
Progress is stored per browser and per device. Clearing site data, using private mode, or switching browsers starts fresh.
 
**Fonts look different offline.**
Sora and Inter load from Google Fonts. Without internet, the page falls back to system fonts.
 
## Tech
 
React 18, React Router 6 (HashRouter), Vite 5, plain CSS, and a canvas-based 3D background with no extra libraries.

## Contributors

<table>
<tr>
<td align="center" width="200">
<a href="https://github.com/p4rth-dubey"><img src="https://avatars.githubusercontent.com/u/342480038?s=60&v=4" width="100" height="100" alt="Parth" loading="lazy" style="border-radius:50%" /><br/><b>Parth Veer Dubey</b></a><br/>Owner & Maintainer
</td>
</tr>
</table>