import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesShowcase from '@/components/ServicesShowcase';
import About from '@/components/About';
import TestDirectory from '@/components/TestDirectory';
import HealthPackages from '@/components/HealthPackages';
import Downloads from '@/components/Downloads';
import Testimonials from '@/components/Testimonials';
import BlogArticles from '@/components/BlogArticles';
import DoctorsZone from '@/components/DoctorsZone';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import WelcomePopup from '@/components/WelcomePopup';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesShowcase />
      <About />
      <TestDirectory />
      <HealthPackages />
      <Downloads />
      <Testimonials />
      <BlogArticles />
      <DoctorsZone />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <WelcomePopup />
    </div>
  );
};

export default Index;
