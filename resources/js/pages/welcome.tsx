// import { type SharedData } from '@/types';
import Navbar from '@/components/molecule/navbar';
import AboutSection from '@/components/section/about';
import EventSection from '@/components/section/event';
import Footer from '@/components/section/footer';
import Hero from '@/components/section/hero';
import ContactSection from '@/components/section/kontak';
import PartnershipSection from '@/components/section/sponsorship';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="gFest"></Head>

            {/* NAVBAR */}
            <Navbar />

            {/* HERO SECTION */}
            <Hero />

            {/* ABOUT SECTIOM */}
            <AboutSection />

            {/* EVENT SECTION */}
            <EventSection />

            {/* Partnership Section */}
            <PartnershipSection />

            {/* Kontak Section */}
            <ContactSection />

            {/* Footer */}
            <Footer />
        </>
    );
}
