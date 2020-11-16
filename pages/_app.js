import App from 'next/app'
import Head from 'next/head'

export default class MyApp extends App {
    render() {
        const { Component, pageProps } = this.props
        return (
            <>
                <Head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
                    />
                </Head>
                <Component {...pageProps} />
                <style global>{`
          body.light-mode {
            background-color: #fff;
            color: #333;
            transition: background-color 0.3s ease;
          }
          body.dark-mode {
            background-color: #1a1919;
            color: #999;
          }
        `}</style>
            </>
        )
    }
}
