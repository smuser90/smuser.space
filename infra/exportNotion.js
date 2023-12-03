const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');
const fs = require('fs');
const path = require('path');

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Initialize notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

async function findBlogDatabaseId() {
    try {
        // List all databases
        const response = await notion.search({
        });

        console.log(response)

        // Find a database whose name contains "Blog"
        const blogDb = response.results.find((db) => { 
            return db.url && db.url.includes('Blog');
        });

        console.log(blogDb);

        return blogDb ? blogDb.id : null;
    } catch (error) {
        console.error('Error finding Blog database:', error);
        return null;
    }
}

async function exportNotionPagesToMarkdown(pageId) {
    try {
        // Retrieve the list of child pages from the top-level Notion page
        const response = await notion.blocks.children.list({ block_id: pageId });

        for (const block of response.results) {
            if (block.type !== 'child_page') continue;

            // Convert Notion page to markdown
            const mdBlocks = await n2m.pageToMarkdown(block.id);
            const markdown = n2m.toMarkdownString(mdBlocks);

            // Get the title of the child page for the file name
            const pageTitle = block.child_page.title;
            const fileName = pageTitle.replace(/\s+/g, '-').toLowerCase();

            // Write markdown to a file in the /blog directory
            const filePath = path.join(__dirname, 'blog', `${fileName}.md`);
            fs.writeFileSync(filePath, JSON.stringify(markdown));
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
