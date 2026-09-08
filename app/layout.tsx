import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title:'TongTu — Die neue digitale Basis | Trending Media', description:'Ein persönlicher Projektvorschlag für TCMswiss. 16 Standorte. Eine gemeinsame Plattform. Produktivstart April 2027.', robots:{index:false,follow:false}, icons:{icon:'/assets/tongtu.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="de-CH"><body>{children}</body></html> }
