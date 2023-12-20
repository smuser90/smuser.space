'use client'
import { useEffect, useRef } from 'react'
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image'
import mdxPrism from 'mdx-prism';
import rehypeRaw from 'rehype-raw';
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames
        .filter(filename => path.extname(filename) === '.mdx')
        .map(filename => ({
            params: { slug: filename.replace(/\.mdx$/, '') },
        }));

    return { paths, fallback: false };
}

import grayMatter from 'gray-matter';

export async function getStaticProps({ params }) {
    const postsDirectory = path.join(process.cwd(), 'pages/blog/posts');
    console.log(params);
    const filePath = path.join(postsDirectory, `${params.slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Parse the MDX file
    const { content } = grayMatter(fileContents);

    // Find the first image markdown
    const firstImageMarkdown = content.match(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/);
    let firstImageUrl = null;
    if (firstImageMarkdown) {
        firstImageUrl = firstImageMarkdown[1];
    }

    // Use remark or a similar library to convert Markdown to HTML
    const mdxSource = await serialize(fileContents, {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [mdxPrism],
        },
        scope: {},
    });

    return { props: { mdxSource, firstImageUrl } };
}

export default function BlogPost({ mdxSource, firstImageUrl }) {
    const parentRef = useRef(null);
    const mdxRef = useRef(null);

    return (
      <div id="mdx-body" ref={parentRef}>
        <MDXRemote ref={mdxRef} {...mdxSource} components={{ Image }}/>
        {firstImageUrl && <img src={firstImageUrl} alt="First image in the post" />}
      </div>
    );
}
