import Document_, { Head, Main, NextScript } from 'next/document'
import { GA_ID } from '../lib/metrics'

export default class Document extends Document_ {
  render() {
    return (
      <html lang="en">
        <Head />
        <body>
          <Main />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `
            }}
          />
          <NextScript />
        </body>
      </html>
    )
  }
}
