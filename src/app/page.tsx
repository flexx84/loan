import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServiceSection from '@/components/ServiceSection';
import ConsultationForm from '@/components/ConsultationForm';
import TestimonialSection from '@/components/TestimonialSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServiceSection />
      <TestimonialSection />
      <ConsultationForm />
      <FAQSection />
      <Footer />
    </div>
  );
}
