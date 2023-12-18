const { Client } = require("@notionhq/client");
const { NotionToMarkdown } = require("notion-to-md");
const fs = require("fs");
const path = require("path");
const { rimrafSync } = require("rimraf");
const https = require("https");
const url = require("url");
const sharp = require("sharp");
const { v4: uuidv4 } = require('uuid');
// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_TOKEN });

// Initialize notion-to-md
const n2m = new NotionToMarkdown({ notionClient: notion });

async function deleteMdFiles() {
  try {
    const pages = path.join(__dirname, "../pages/blog/*.md*");
    const out = rimrafSync(pages, { glob: true });
    console.log(`Deleted all .md files in ${pages} : ${out}`);
  } catch (error) {
    console.error("Error deleting .md files:", error);
  }
}

async function downloadImage(imageUrl, imagePath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(imagePath);
    https
      .get(imageUrl, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close(resolve);
        });
      })
      .on("error", (error) => {
        fs.unlink(imagePath);
        reject(error);
      });
  });
}

async function processImages(pageId, markdown) {
  const pageContent = await notion.blocks.children.list({ block_id: pageId });
  for (const block of pageContent.results) {
    if (block.type === "image") {
      const imageUrl = block.image.file?.url || block.image.external?.url;
      if (imageUrl) {
        const imageName = path.basename(url.parse(imageUrl).pathname);
        const imageExtension = path.extname(imageName);
        const uuid = uuidv4();
        const newImageName = `${uuid}${imageExtension}`;
        const imagePath = path.join(
          __dirname,
          "../public/images",
          newImageName
        );
        await downloadImage(imageUrl, imagePath);
        const metadata = await sharp(imagePath).metadata();
        const absoluteUrl = `/images/${newImageName}`;
        // Replace the image URL in the markdown with the local path
        const regex = new RegExp(`!\\[${imageName}\\]\\(https://[^)]+\\)`, "g");
        markdown = markdown.replace(
          regex,
          `<Image src="${absoluteUrl}" alt="${newImageName}" width="0" height="0" sizes="100vw" className="w-full h-auto" />`
        );
      }
    }
  }
  return markdown;
}

async function exportNotionPagesToMarkdown(pageId) {
  const response = await notion.pages.retrieve({page_id: pageId})
  const title = response.properties.Name.title.pop().plain_text;
  console.log("Processing: ", title);
  // Convert Notion page to markdown
  const mdBlocks = await n2m.pageToMarkdown(pageId);
  const markdown = n2m.toMarkdownString(mdBlocks).parent;
  // Additional processing for images
  const enrichedMarkdown = await processImages(pageId, markdown);

  // Write markdown to a file in the /blog directory
  const filePath = path.join(__dirname, "../pages/blog", `${title}.mdx`);
  if (enrichedMarkdown && enrichedMarkdown.length) {
    const importImage = `import Image from 'next/image'`;
    const imports = `${importImage}\n`;
    const preComponents = `<div className="blog">`;
    const postComponents = `</div>`;
    const contentWithImport = `${imports}\n${preComponents}${enrichedMarkdown}\n${postComponents}`;

    fs.writeFileSync(filePath, contentWithImport);
  }
  console.log(`Exported "${title}" to ${filePath}`);
}

async function getPublishedPosts() {
  const response = await notion.search({});

  for (const result of response.results) {
    if (
      result.object === 'page' && 
      result.properties &&
      result.properties.Tags &&
      result.properties.Tags.multi_select &&
      result.properties.Tags.multi_select.options === undefined
    ) {
      for (const tag of result.properties.Tags.multi_select) {
        if (tag.name == "Published") {
          console.log("Publishing: ", result.properties.Name.title.pop().plain_text);
          await exportNotionPagesToMarkdown(result.id);
        }
      }
    }
  }
}

async function main() {
  await deleteMdFiles();
  await getPublishedPosts();
}

main();
