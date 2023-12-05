'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs';
import path from 'path';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image'
import mdxPrism from 'mdx-prism';
import rehypeRaw from 'rehype-raw';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames
        .filter(filename => path.extname(filename) === '.md')
        .map(filename => ({
            params: { slug: filename.replace(/\.md$/, '') },
        }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filePath = path.join(postsDirectory, `${params.slug}.md`);
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

export default function BlogPost({ contentHtml }) {
    const router = useRouter();
    useEffect(() => {
        Prism.highlightAll();
    }, []);
    return (
        <div>
            <Header />
            <article 
                className="blog"
                style={{ 
                    marginTop: "10vh",
                    marginLeft: "10vw",
                    marginRight: "10vw"
                }} 
            >
                <MDXRemote {...mdxSource} components={{ Image }} />
            </article>
            <Footer />
        </div>
    );
}
