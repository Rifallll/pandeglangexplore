
const fs = require('fs');
const path = require('path');

const filePath = 'c:/Users/ASUS/dyad-apps/pandeglangexplore/src/data/destinations.ts';
try {
    const content = fs.readFileSync(filePath, 'utf8');
    const regex = /imageSrc:\s*"(.*?)"/g;
    let match;
    const images = [];
    while ((match = regex.exec(content)) !== null) {
        images.push(match[1]);
    }
    const counts = {};
    images.forEach(img => counts[img] = (counts[img] || 0) + 1);
    const duplicates = Object.entries(counts).filter(([_, c]) => c > 1).map(([u, c]) => ({ url: u, count: c }));
    console.log('--- DUPLICATE IMAGES IN destinations.ts ---');
    console.log(JSON.stringify(duplicates, null, 2));
} catch (e) {
    console.error('Error reading destinations.ts:', e.message);
}

const srcPath = 'c:/Users/ASUS/dyad-apps/pandeglangexplore/src';
const allImageRefs = {};
function walk(dir) {
    try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                const content = fs.readFileSync(fullPath, 'utf8');
                const imgRegex = /(['"])(\/images\/.*?|https:\/\/images\.unsplash\.com\/.*?)\1/g;
                let m;
                while ((m = imgRegex.exec(content)) !== null) {
                    const ref = m[2];
                    if (!allImageRefs[ref]) allImageRefs[ref] = [];
                    allImageRefs[ref].push(fullPath);
                }
            }
        });
    } catch (e) {
        console.error('Error walking directory:', dir, e.message);
    }
}
walk(srcPath);

const globalDuplicates = Object.entries(allImageRefs)
    .filter(([_, refs]) => refs.length > 1)
    .map(([url, refs]) => ({ url, count: refs.length, files: [...new Set(refs)] }));

console.log('\n--- GLOBAL DUPLICATES ---');
console.log(JSON.stringify(globalDuplicates, null, 2));
