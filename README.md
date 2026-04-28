# NO NAME - Concept Store

## Deployment to GitHub Pages

### Build for GitHub Pages

1. Install dependencies:
```bash
bun install
```

2. Build the project:
```bash
bun run build:github
```

### Upload to GitHub Pages

1. **Important**: Upload the entire `dist/client` folder to your GitHub repository
2. **Do not** upload the `dist` folder itself, only the `dist/client` contents
3. Make sure to upload to the **root** of your repository, not in a `/docs` folder

### Folder Structure

After building, your `dist/client` folder should contain:

```
dist/client/
├── index.html
├── 404.html
├── assets/
│   ├── main-*.js
│   └── styles-*.css
├── shop/
│   └── index.html
├── cart/
│   └── index.html
└── checkout/
    └── index.html
```

### GitHub Pages Settings

1. Go to your repository Settings
2. Navigate to Pages
3. Source: Deploy from a branch
4. Branch: main (or your default branch)
5. Folder: / (root)

### Troubleshooting

If you still get 404 errors:
1. Make sure you uploaded `dist/client` folder, not just `dist`
2. Check that all HTML files are in the correct locations
3. Ensure GitHub Pages is enabled for the correct repository