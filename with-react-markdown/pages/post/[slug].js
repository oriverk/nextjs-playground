import React, { useState } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from "react-markdown/with-html"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import Layout from '../../components/Layout'

const CodeBlock = ({ language, value }) => {
  return <SyntaxHighlighter language={language}>{value}</SyntaxHighlighter>
}

const Image = ({ alt, src }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const styles = {
    lqip: {
      filter: "blur(10px)",
    },
  };

  if (imageLoaded) {
    styles.lqip.opacity = 0;
  }

  const lqip = require(`../../public/assets/${src}?lqip`)
  const responsive = require(`../../public/assets/${src}?resize`)

  return (
    <div className="relative">
      <img
        className="absolute top-0 left-0 z-10 w-full transition-opacity duration-500 ease-in opacity-100"
        src={lqip}
        alt={alt}
        style={styles.lqip}
      />
      <img
        className='w-full'
        src={responsive.src}
        srcSet={responsive.srcSet}
        width={responsive.width}
        height={responsive.height}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        loading='lazy'
      />
    </div>
  );
};

// const Image = ({ alt, src }) => {
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const lqip = require(`../../public/assets/${src}?lqip`)
//   const responsive = require(`../../public/assets/${src}?resize`)

//   return (
//     <React.Fragment>
//       <div>
//         <img
//           className="image lqip"
//           alt={alt}
//           src={lqip}
//           style={{ visibility: imageLoaded ? "hidden" : "visible" }}
//           />
//         <img
//           onLoad={() => {
//             setImageLoaded(true);
//           }}
//           className="image full"
//           style={{ opacity: imageLoaded ? 1 : 0 }}
//           alt={alt}
//           src={responsive.src}
//           srcSet={responsive.srcSet}
//           width={responsive.width}
//           height={responsive.height}
//           loading='lazy'
//           />
//         </div>
//       <style jsx>{`
//         div{
//           position: relative;
//         }
//         img{
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           max-width: 600px;
//           height: auto;
//         }
//         .full{
//           transition: opacity 500ms ease 0ms;
//         }
//         .lqip{
//           filter: blur(10px);
//           transition: visibility 0ms ease 500ms;
//         }
//       `}</style>
//     </React.Fragment>
//   );
// };

export default function Post({ content, frontmatter }) {
  return (
    <Layout>
      <article>
        <header>
          <h1 className='my-0'>{frontmatter.title}</h1>
          <p className='text-xs'>{frontmatter.date}</p>
        </header>
        <ReactMarkdown
          escapeHtml={false}
          source={content}
          renderers={{ code: CodeBlock, image: Image }}
        />
      </article>
    </Layout>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync('content/posts')
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    }
  }))
  
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }) {
  const markdwondWithMetadata = fs.readFileSync(path.join('content/posts', slug + '.md')).toString()
  const { data, content } = matter(markdwondWithMetadata)
  
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  const formattedDate = data.date.toLocaleDateString('ja-JP', options)
  
  const frontmatter = {
    ...data,
    date: formattedDate,
  }

  return {
    props: {
      content: `# ${data.title}\n${content}`,
      frontmatter,
    }
  }

}