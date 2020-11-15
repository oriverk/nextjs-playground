import Link from 'next/link'
import Layout from '../components/Layout'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getLocalizationProps, LanguageProvider } from '../context/LanguageContext'
import { Localization } from '../translations/types'

const IndexPage: NextPage<{
  localization: Localization
}> = ({ localization }) => (
  <LanguageProvider localization={localization}>
    <Layout title='Home | Next.js + TypeScript Example'>
      <h1>Hellow Next.js</h1>
      <p>
        <Link href='/about/'>
          <a>About</a>
        </Link>
      </p>
    </Layout>
  </LanguageProvider>
)

export const getStaticProps: GetStaticProps = async (ctx) => {
  const localization = getLocalizationProps(ctx, 'home')
  return {
    props: {
      localization,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ['en', 'fr', 'ja'].map((lang) => ({ params: { lang } })),
    fallback: false,
  }
}

export default IndexPage