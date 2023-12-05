const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const path = require('path');
const { rimrafSync } = require('rimraf');
const https = require('https');
const url = require('url');
const sharp = require('sharp');
// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Initialize notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

async function findBlogDatabaseId() {
    try {
        // List all items
        const response = await notion.search({
        });

        // Find a page whose name contains "Blog"
        const blogDb = response.results.find((db) => {
            return db.url && db.url.includes('Blog');
        });

        return blogDb ? blogDb.id : null;
    } catch (error) {
        console.error('Error finding Blog database:', error);
        return null;
    }
}

async function deleteMdFiles() {
    try {
        const pages = path.join(__dirname, '../pages/blog/*.md*')
        const out = rimrafSync(pages, { glob: true });
        console.log(`Deleted all .md files in ${pages} : ${out}`);
    } catch (error) {
        console.error('Error deleting .md files:', error);
    }
}


async function downloadImage(imageUrl, imagePath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(imagePath);
        https.get(imageUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close(resolve);
            });
        }).on('error', (error) => {
            fs.unlink(imagePath);
            reject(error);
        });
    });
}

async function processImages(pageId, markdown) {
    const pageContent = await notion.blocks.children.list({ block_id: pageId });
    for (const block of pageContent.results) {
        if (block.type === 'image') {
            const imageUrl = block.image.file?.url || block.image.external?.url;
            if (imageUrl) {
                const imagePath = path.join(__dirname, '../public/images', path.basename(url.parse(imageUrl).pathname));
                console.log(imageUrl);
                await downloadImage(imageUrl, imagePath);
                const metadata = await sharp(imagePath).metadata();
                const aspectRatio = metadata.width / metadata.height;
                const absoluteUrl = `/images/${path.basename(imagePath)}`;
                // Replace the image URL in the markdown with the local path
                const imageName = path.basename(imagePath);
                const regex = new RegExp(`!\\[${imageName}\\]\\(https://[^)]+\\)`, 'g');
                markdown = markdown.replace(regex, `<Image src="${absoluteUrl}" alt="${imageName}" width={"100vw"} height={"${100 / aspectRatio}vw"} />`);
            }
        }
    }
    return markdown;
}

async function exportNotionPagesToMarkdown(pageId) {
    try {
        await deleteMdFiles();

        // Retrieve the list of child pages from the top-level Notion page
        const response = await notion.blocks.children.list({ block_id: pageId });

        for (const block of response.results) {
            if (block.type !== 'child_page') continue;

            // Convert Notion page to markdown
            const mdBlocks = await n2m.pageToMarkdown(block.id);
            const markdown = n2m.toMarkdownString(mdBlocks).parent;
            // Additional processing for images
            const enrichedMarkdown = await processImages(block.id, markdown);

            // Get the title of the child page for the file name
            const pageTitle = block.child_page.title;
            const fileName = pageTitle.replace(/\s+/g, '-').toLowerCase();

            // Write markdown to a file in the /blog directory
            const filePath = path.join(__dirname, '../pages/blog', `${fileName}.mdx`);
            if (enrichedMarkdown && enrichedMarkdown.length) {
                const contentWithImport = `import Image from 'next/image'\n\n${enrichedMarkdown}`;
                fs.writeFileSync(filePath, contentWithImport);
            }
            console.log(`Exported "${pageTitle}" to ${filePath}`);
        }
    } catch (error) {
        console.error('Error exporting child pages from Notion:', error);
    }
}

async function main() {
    const blogPageId = await findBlogDatabaseId();
    if (blogPageId) {
        await exportNotionPagesToMarkdown(blogPageId);
    } else {
        console.log('No Blog pages found.');
    }
}

main();
