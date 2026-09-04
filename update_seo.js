const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src', 'app');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const stat = fs.statSync(path.join(dir, file));
    if (stat.isDirectory()) {
      getFiles(path.join(dir, file), fileList);
    } else if (file === 'page.js') {
      fileList.push(path.join(dir, file));
    }
  }
  return fileList;
}

const pageFiles = getFiles(srcDir);

for (const file of pageFiles) {
  let content = fs.readFileSync(file, 'utf8');

  // Skip if it's already using fetchSeoMetadata
  if (content.includes('fetchSeoMetadata')) continue;
  
  // Also skip client components for metadata export
  if (content.includes('"use client"') || content.includes("'use client'")) {
      console.log('Skipping client component:', file);
      continue;
  }

  const relativePath = path.relative(srcDir, path.dirname(file));
  const pageUrl = relativePath.replace(/\\/g, '/') || '/';
  const slug = pageUrl === '/' ? '/' : pageUrl;

  // Find existing metadata
  const metadataRegex = /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\});/;
  let existingMetadata = '{}';
  const match = content.match(metadataRegex);
  
  let fallbackTitle = 'Webstep Solutions';
  let fallbackDesc = 'Enterprise Software Development at Scale';

  if (match) {
    existingMetadata = match[1];
    
    // Extract title and description from existing metadata if possible
    const titleMatch = existingMetadata.match(/title:\s*["']([^"']+)["']/);
    if (titleMatch) fallbackTitle = titleMatch[1];
    
    const descMatch = existingMetadata.match(/description:\s*["']([^"']+)["']/);
    if (descMatch) fallbackDesc = descMatch[1];
    
    // Remove the static metadata
    content = content.replace(match[0], '');
  }

  // Inject import at the top (after other imports)
  const importStatement = `import { fetchSeoMetadata } from '@/lib/contentApi';\n`;
  
  // Find the last import
  const lastImportIndex = content.lastIndexOf('import ');
  if (lastImportIndex !== -1) {
    const endOfLastImport = content.indexOf('\n', lastImportIndex);
    content = content.slice(0, endOfLastImport + 1) + importStatement + content.slice(endOfLastImport + 1);
  } else {
    content = importStatement + content;
  }

  // Inject generateMetadata before default export or at the end
  const generateMetadataStr = `
export async function generateMetadata() {
  const dynamicSeo = await fetchSeoMetadata('${slug}');
  return {
    title: dynamicSeo.title || "${fallbackTitle}",
    description: dynamicSeo.description || "${fallbackDesc}",
    ...(dynamicSeo.keywords ? { keywords: dynamicSeo.keywords } : {})
  };
}
`;

  const defaultExportIndex = content.indexOf('export default');
  if (defaultExportIndex !== -1) {
    content = content.slice(0, defaultExportIndex) + generateMetadataStr + content.slice(defaultExportIndex);
  } else {
    content += generateMetadataStr;
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log('Updated:', file);
}
