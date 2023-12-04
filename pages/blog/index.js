import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export async function getStaticProps() {
    const postsDirectory = path.join(process.cwd(), 'pages/blog');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames.map(filename => {
        // Assuming the filename is the title, modify as needed
        const title = filename.replace(/\.md$/, '');

        return {
            slug: title,
            title,
        };
    });

    return { props: { posts } };
}

export default function BlogIndex({ posts }) {
    return (
        <div style={{marginTop: "10vh"}}>
            <Header />
            <div className="grid">
                {posts.map(post => (
                    (!(post.title.includes('slug') || post.title.includes('index'))) && (
                        <div className="card" key={post.slug}>
                            <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
                                <a><h3>{post.title} &rarr;</h3></a>
                            </Link>
                        </div>
                    )
                ))}
            </div>
            <Footer />
        </div>
    );
}
