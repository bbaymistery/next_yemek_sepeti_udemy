import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
