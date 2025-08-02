import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ServicesShowcase from '@/components/ServicesShowcase';
import About from '@/components/About';
import TestDirectory from '@/components/TestDirectory';
import HealthPackages from '@/components/HealthPackages';
import DoctorsZone from '@/components/DoctorsZone';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ServicesShowcase />
      <About />
      <TestDirectory />
      <HealthPackages />
      <DoctorsZone />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default Index;
