import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const essaysDirectory = path.join(process.cwd(), 'src/content/essays');

export async function getAllEssayIds() {
  try {
    const fileNames = fs.readdirSync(essaysDirectory);
    return fileNames.map(fileName => {
      return {
        id: fileName.replace(/\.md$/, '')
      };
    });
  } catch (error) {
    console.error('Error reading essays directory:', error);
    return [];
  }
}

export async function getEssayData(id) {
  const fullPath = path.join(essaysDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  };
}

export async function getAllEssays() {
  const fileNames = fs.readdirSync(essaysDirectory);
  const allEssaysData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(essaysDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    };
  });

  // Sort posts by date
  return allEssaysData.sort((a, b) => {
    if (a.publishDate < b.publishDate) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getFeaturedEssay() {
  const allEssays = await getAllEssays();
  return allEssays.find(essay => essay.featured) || null;
}

export async function getRelatedEssays(currentEssayId, tags = [], limit = 3) {
  const allEssays = await getAllEssays();
  
  // Filter out the current essay and find essays with similar tags
  const relatedEssays = allEssays
    .filter(essay => essay.id !== currentEssayId)
    .filter(essay => {
      if (!essay.tags || !tags.length) return false;
      return essay.tags.some(tag => tags.includes(tag));
    })
    .slice(0, limit);

  // If we don't have enough related essays, add some recent ones
  if (relatedEssays.length < limit) {
    const recentEssays = allEssays
      .filter(essay => essay.id !== currentEssayId)
      .filter(essay => !relatedEssays.find(related => related.id === essay.id))
      .slice(0, limit - relatedEssays.length);
    
    relatedEssays.push(...recentEssays);
  }

  return relatedEssays;
}

export async function getEssaysByTag(tag) {
  const allEssays = await getAllEssays();
  return allEssays.filter(essay => 
    essay.tags && essay.tags.includes(tag)
  );
}

export async function searchEssays(query) {
  const allEssays = await getAllEssays();
  const searchTerm = query.toLowerCase();
  
  return allEssays.filter(essay => 
    essay.title.toLowerCase().includes(searchTerm) ||
    essay.abstract.toLowerCase().includes(searchTerm) ||
    (essay.authors && essay.authors.some(author => 
      author.toLowerCase().includes(searchTerm)
    )) ||
    (essay.tags && essay.tags.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    ))
  );
} 