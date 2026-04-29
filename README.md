# NO NAME - Concept Store

## Automatic Deployment
This project deploys automatically to GitHub Pages via GitHub Actions when you push to the `main` branch.

## GitHub Pages Settings
1. Go to your repository **Settings > Pages**
2. Set **Source** to **Deploy from a branch**
3. Set **Branch** to `gh-pages` and folder to `/ (root)`
4. Save. The workflow publishes the built app into that branch.

## Live Site
Visit: [https://giorgi2010chigla.github.io/no-name-collective/](https://giorgi2010chigla.github.io/no-name-collective/)

## How It Works
- Uses hash-based routing (`createHashHistory`) to work with static GitHub Pages hosting
- Build outputs to `dist/client`, then GitHub Actions publishes that folder to the `gh-pages` branch root
- All routes are handled client-side, so no server-side configuration is required