const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

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
        rimraf.sync(path.join(__dirname, '../pages/blog/*.md'));
        console.log('Deleted all .md files in /pages/blog');
    } catch (error) {
        console.error('Error deleting .md files:', error);
    }
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

            // Get the title of the child page for the file name
            const pageTitle = block.child_page.title;
            const fileName = pageTitle.replace(/\s+/g, '-').toLowerCase();

            // Write markdown to a file in the /blog directory
            const filePath = path.join(__dirname, '../pages/blog', `${fileName}.md`);
            if (markdown && markdown.length) {
                fs.writeFileSync(filePath, markdown);
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
