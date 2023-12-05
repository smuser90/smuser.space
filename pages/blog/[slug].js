'use client'
import { useEffect } from 'react'
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
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames
        .filter(filename => path.extname(filename) === '.mdx')
        .map(filename => ({
            params: { slug: filename.replace(/\.mdx$/, '') },
        }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filePath = path.join(postsDirectory, `${params.slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Use remark or a similar library to convert Markdown to HTML
    const mdxSource = await serialize(fileContents, {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [mdxPrism, rehypeRaw],
        },
        scope: {},
    });

    return { props: { mdxSource } };
}

export default function BlogPost({ mdxSource }) {
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
      <div id="mdx-body">
        <MDXRemote {...mdxSource} components={{ Image }}/>
      </div>
    );

}
