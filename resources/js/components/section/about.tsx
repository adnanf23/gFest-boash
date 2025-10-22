import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { H2 } from '../atom/heading';
import Paragraph from '../atom/paragraph';

export default function AboutSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Data gambar dalam array
    const images = [
        {
            id: 1,
            url: '/aboutsection/RAH04741.png',
            alt: 'Festival Performance 1',
        },
        {
            id: 2,
            url: '/aboutsection/RAH04769.png',
            alt: 'Festival Performance 2',
        },
        {
            id: 3,
            url: '/aboutsection/RAH04775.png',
            alt: 'Festival Performance 3',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);

        return () => clearInterval(timer);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section id='about' className="min-h-screen flex gap-10 justify-center items-center px-6 py-20">
            <div className="mx-auto space-y-5 max-w-6xl">
                {/* Title */}
                <H2 align="center">About</H2>

                {/* Description */}
                <Paragraph align="center">
                    gGans Festival (gFest) Festival merupakan cara ekspresif
                    untuk merayakan warisan, budaya, dan tradisi yang dianggap
                    penting untuk dirayakan. Hal tersebut memainkan peran
                    penting untuk menambah struktur dalam kegiatan sosial dan
                    seni. gGans Festival sesi 2 ini adalah pertunjukan karya
                    seni yang diselenggarakan oleh SD Global Garuda Nusantara
                    Islamic Centre yang didalamnya terdapat nilai-nilai religi
                    dan pendidikan dan juga siraman rohani.
                </Paragraph>
                <br />
                <br />

                {/* Image Slider */}
                <div className="relative">
                    {/* Slider Container */}
                    <div className="relative w-full overflow-hidden rounded-3xl">
                        <div
                            className="flex transition-transform duration-500 ease-out"
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / (window.innerWidth >= 1024 ? 2 : 1)}%)`,
                            }}
                        >
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className="w-full flex-shrink-0 px-2 sm:w-[80%] lg:w-[48%]"
                                >
                                    <div className="relative aspect-video overflow-hidden rounded-3xl">
                                        <img
                                            src={image.url}
                                            alt={image.alt}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={goToPrevious}
                            className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 md:left-4"
                            aria-label="Previous slide"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-all hover:bg-black/70 md:right-4"
                            aria-label="Next slide"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="mt-6 flex justify-center gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`rounded-full transition-all ${
                                    index === currentIndex
                                        ? 'h-2 w-8 bg-cyan-500'
                                        : 'h-2 w-2 bg-gray-600 hover:bg-gray-500'
                                }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
