import { notFound } from "next/navigation";
import Script from "next/script";

import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "@/blog/utils";
import { baseUrl } from "app/sitemap";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params: p }) {
  const params = await p;
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Blog({ params: p }) {
  const params = await p;
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // export function generateMetadata({ params }) {
  //   let post = getBlogPosts().find((post) => post.slug === params.slug);
  //   if (!post) {
  //     return;
  //   }

  //   let {
  //     title,
  //     publishedAt: publishedTime,
  //     summary: description,
  //     image,
  //   } = post.metadata;
  //   let ogImage = image
  //     ? image
  //     : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  //   return {
  //     title,
  //     description,
  //     openGraph: {
  //       title,
  //       description,
  //       type: "article",
  //       publishedTime,
  //       url: `${baseUrl}/blog/${post.slug}`,
  //       images: [
  //         {
  //           url: ogImage,
  //         },
  //       ],
  //     },
  //     twitter: {
  //       card: "summary_large_image",
  //       title,
  //       description,
  //       images: [ogImage],
  //     },
  //   };
  // }

  // export default function Blog({ params }) {
  // let post = getBlogPosts().find((post) => post.slug === params.slug);

  // if (!post) {
  //   notFound();
  // }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />

      {/* <script
        type="module"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        import mermaid from "https://cdn.jsdelivr.net/npm/mermaid@9/dist/mermaid.esm.min.mjs";
        mermaid.initialize({startOnLoad: true, look: "handDrawn"});
        mermaid.contentLoaded();
`,
        }}
      /> */}
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
