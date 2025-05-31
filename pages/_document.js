// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
   return (
     <Html lang="en">
       <Head>
         {/* Mobile viewport & PWA safe-area inset for iOS notch devices */}
         <meta name="viewport" content="width=device-width,initial-scale=1" />
         <meta name="theme-color" content="#fafaf6" />
       </Head>
       <body className="bg-[#fafaf6] text-ink antialiased">
         <Main />
         <NextScript />
       </body>
     </Html>
   )
}
