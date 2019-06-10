import Document, { Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.props.initialLanguage}>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
        <style jsx>{`
          body {
            background: #2196f3!important;
          }

          body.custom_class {
            background: #2196f3;
          }
        `}</style>
      </html>
    )
  }
}

export default MyDocument