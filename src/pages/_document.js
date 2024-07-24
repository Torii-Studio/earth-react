import Document, { Html, Head, Main, NextScript } from "next/document";
import { SheetsRegistry, JssProvider } from "react-jss";
import { createGenerateId } from "jss";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheets = new SheetsRegistry();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) =>
          (
            <JssProvider registry={sheets} generateId={createGenerateId()}>
              <App {...props} />
            </JssProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            id="server-side-styles"
            dangerouslySetInnerHTML={{ __html: sheets.toString() }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
