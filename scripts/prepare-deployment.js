import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

console.log('🚀 Starting deployment preparation...');

// Clean previous builds
if (existsSync('dist')) {
  execSync('rm -rf dist', { stdio: 'inherit' });
}

// Build the project
console.log('📦 Building project...');
execSync('bun run build:github', { stdio: 'inherit' });

// Create deployment folder
const deployDir = 'deploy';
if (existsSync(deployDir)) {
  execSync(`rm -rf ${deployDir}`, { stdio: 'inherit' });
}
mkdirSync(deployDir);

// Copy dist/client to deploy
execSync(`cp -r dist/client/* ${deployDir}/`, { stdio: 'inherit' });

console.log('✅ Deployment ready!');
console.log('📁 Upload the entire "deploy" folder to your GitHub repository root');
console.log('🌐 Then enable GitHub Pages in your repository settings');