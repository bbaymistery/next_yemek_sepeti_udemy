function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div className="pt-[88px]">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
