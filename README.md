# Ayushman’s Portfolio

This is a standalone site: no build step, no framework, and no installed dependencies. Open `index.html` in a browser to preview it.

## Edit it yourself

Most text is in `index.html`. Search for these sections and replace the words between the HTML tags:

- **Hero / biography:** the `hero`, `about`, and `journey` sections.
- **Skills:** the five buttons inside `class="skill-cloud"`. Change both the visible label and its `data-skill` explanation.
- **Projects:** replace the three cards inside `id="projects"` as you build work. A project card can include a link, screenshot, or GitHub URL later.
- **Email:** search for `your.email@example.com` and replace all three occurrences with your actual email. You can add GitHub and LinkedIn links next to the email button.

## Make it yours

- **Colors:** the first line of `styles.css` contains the named color variables (`--peach`, `--sun`, `--blue`, etc.). Change those to recolor the whole site.
- **Motion:** `script.js` controls the animated stars, scroll-driven constellation, card tilt, theme switch, and progress line. You can leave it untouched while editing content.
- **Photo:** there is intentionally no stock photo. If you later want one, add an `<img>` in the hero or about section and create a matching rule in `styles.css`.

## Publish it

The simplest path is to create a GitHub repository, upload these four files, then import that repository into Vercel or Netlify. Both detect this as a static site automatically; no build command is required.
