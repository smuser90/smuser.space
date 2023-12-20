import fs from "fs";
import path from "path";
import ParticlesComponent from "../../components/Particles";
import { useRouter } from "next/router";
import grayMatter from "gray-matter";

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), "pages/blog/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const fileContents = fs.readFileSync(
      path.join(postsDirectory, filename),
      "utf8"
    );
    // Parse the MDX file
    const { content } = grayMatter(fileContents);
    // Find the first image markdown
    const firstImageMarkdown = content.match(
      /<Image src="(.*?)" alt=".*?" width=".*?" height=".*?" sizes=".*?" className=".*?" \/>/
    );
    let firstImageUrl = null;
    if (firstImageMarkdown) {
      firstImageUrl = firstImageMarkdown[1];
    }

    // Assuming the filename is the title, modify as needed
    const title = filename.replace(/\.mdx$/, "");

    return {
      slug: title,
      title,
      headerImage: firstImageUrl,
    };
  });

  return { props: { posts } };
}

export default function BlogFeed({ posts }) {
  const router = useRouter();
  return (
    <div className="container">
      <main>
        <div className="grid">
          {posts.map(
            (post) =>
              !(
                post.title.includes("slug") || post.title.includes("index")
              ) && (
                <div
                  className="card-large"
                  key={post.slug}
                  onClick={() => router.push(`/blog/${post.slug}`)}
                >
                  <h2>{post.title}</h2>
                  <p id="cta">&rarr;</p>
                  <div className="image-container">
                    <img className="post-image" src={post.headerImage}/>
                  </div>
                </div>
              )
          )}
        </div>
      </main>
      <ParticlesComponent />
    </div>
  );
}
