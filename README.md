# kaavya-portfolio

Personal portfolio site. React + Vite + Tailwind v4 + Motion.

## Run it

```powershell
cd D:\MY_PROJECTS\portfolio-site
npm install
npm run dev
```

Then open http://localhost:5173

## Edit it

**Everything you need to change lives in `src/content.js`.** Name, tagline, links,
project copy, the interactive demo's numbers, skills, education, achievements.
The components only render what is in that file.

Search `src/content.js` for `TODO` — those are the placeholders to replace:

| Placeholder | What to put there |
|---|---|
| `person.linkedin` | Your real LinkedIn profile URL |
| `person.resume` | Drop the PDF at `public/resume.pdf` — the path already points there |
| `featured.live` | Confirm whether the EC2 demo serves on `http` or `https` |
| `projects[0].live` | Confirm the GitHub Pages URL for the Denial Intelligence report |

Also worth doing: open the Prior Auth repo's demo presets and make the note text in
`demo.note` match your real preset word for word. The numbers (58%, 37%, 0.577, 0.559)
are already your verified run, but the prose is a close reconstruction, not a copy.

## Structure

```
src/
  content.js              all copy and links — the only file you normally edit
  App.jsx                 page order
  hooks/useCountUp.js     rAF number animation (no library surface)
  components/
    Nav.jsx               fixed nav, shrinks past 40px of scroll
    Hero.jsx              name, tagline, four links
    Section.jsx           shared titled band
    Featured.jsx          Prior Auth Copilot
    DecisionDemo.jsx      the interactive approve/escalate pair
    Projects.jsx          Denial Intelligence, HumanMotion AI
    Skills.jsx
    About.jsx             education and achievements
    Contact.jsx
    Reveal.jsx            shared scroll-into-view animation
public/
  favicon.svg
  og.png                  1200x630 link preview
  resume.pdf              ← you add this
```

## Deploy

Push to GitHub, then import the repo at vercel.com. Framework preset: Vite.
Build command `npm run build`, output directory `dist`. Nothing else to configure.

Every later `git push` redeploys automatically.
