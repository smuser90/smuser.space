'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Prism from 'prismjs'
import 'prismjs/components/prism-json' // Import the JSON language component
import 'prismjs/themes/prism-tomorrow.css' // Choose the theme you prefer

export async function getStaticPaths() {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames.map(filename => ({
        params: { slug: filename.replace(/\.md$/, '') },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filePath = path.join(postsDirectory, `${params.slug}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Use remark or a similar library to convert Markdown to HTML
    const processedContent = await remark().use(html).process(fileContents);
    const contentHtml = processedContent.toString();

    return { props: { contentHtml } };
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
                dangerouslySetInnerHTML={{ 
                    __html: contentHtml 
                }} 
            />
            <Footer />
        </div>
    );
}