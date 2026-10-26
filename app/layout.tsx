import "./globals.css";
export const metadata = {title:"Belia Connect — Ianya bermula dari kami!",description:"Menghubungkan anak muda, membuka peluang. Sertai komuniti Belia Connect.",icons:{icon:[{url:"/favicon.svg?v=2",type:"image/svg+xml"},{url:"/favicon-32.png?v=2",sizes:"32x32",type:"image/png"}],shortcut:"/favicon.ico?v=2",apple:[{url:"/apple-touch-icon.png?v=2",sizes:"180x180",type:"image/png"}]}};
export const viewport = {width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#103a27"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ms"><body>{children}</body></html>}
