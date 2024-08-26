import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
