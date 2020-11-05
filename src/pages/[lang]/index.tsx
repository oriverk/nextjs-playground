import { NextPage } from 'next'
import Layout from '../../components/Layout'
import { LanguageProvider } from '../../context/LanguageContext'
import { Localization } from '../../translations/types'
import Home from '../../components/Home'

const IndexPage: NextPage<{
  localization: Localization
}> = ({ localization }) => {
  return (
    <LanguageProvider localization={localization}>
      <Layout title='Home | Next.js + TypeScript Example'>
        <Home />
      </Layout>
    </LanguageProvider>
  )
}

export default IndexPage