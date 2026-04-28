# NO NAME - Concept Store

## Automatic Deployment
This project deploys automatically to GitHub Pages via GitHub Actions when you push to the `main` branch.

## GitHub Pages Settings
1. Go to your repository **Settings > Pages**
2. Set **Source** to **GitHub Actions**
3. No further configuration needed - the workflow handles everything.

## Live Site
Visit: [https://giorgi2010chigla.github.io/no-name-collective/](https://giorgi2010chigla.github.io/no-name-collective/)

## How It Works
- Uses hash-based routing (`createHashHistory`) to work with static GitHub Pages hosting
- Build outputs to `dist` folder with `index.html` at the root
- All routes are handled client-side, so no server-side configuration is required