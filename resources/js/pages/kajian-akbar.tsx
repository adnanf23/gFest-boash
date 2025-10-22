import H1, { H2 } from '@/components/atom/heading';
import Paragraph from '@/components/atom/paragraph';
import { Head } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SpeakerImage {
    id: number;
    url: string;
    alt: string;
}

interface AccordionItem {
    id: number;
    title: string;
    content: React.ReactNode;
}

export default function KajianPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const images: SpeakerImage[] = [
        {
            id: 1,
            url: 'https://thumb.viva.co.id/media/frontend/thumbs3/2024/09/30/66fa7c1a66abd-koh-dennis-lim_1265_711.jpg',
            alt: 'Ustad Koh Dennis Lim speaking at event 1',
        },
        {
            id: 2,
            url: 'https://ftnews.co.id/storage/comp/Dennis%20Lim.jpg',
            alt: 'Ustad Koh Dennis Lim speaking at event 2',
        },
        {
            id: 3,
            url: 'https://assets.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/63/2023/08/28/20230828_233140_0000-3186270821.png',
            alt: 'Ustad Koh Dennis Lim speaking at event 3',
        },
    ];

    const accordionData: AccordionItem[] = [
        {
            id: 1,
            title: 'Rundown Acara',
            content: (
                <div className="space-y-3">
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            06.30–07.30
                        </span>
                        <span className="text-slate-400">
                            Registrasi Panitia Acara
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            07.30–07.45
                        </span>
                        <span className="text-slate-400">
                            Penampilan gGans Squad
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            07.45–08.00
                        </span>
                        <span className="text-slate-400">
                            Opening Video BCC, Promosi gGans, BOASH (Operator)
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            08.00–08.10
                        </span>
                        <span className="text-slate-400">
                            Pembukaan oleh MC
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            08.10–08.20
                        </span>
                        <span className="text-slate-400">
                            Tilawah dan Saritilawah (Siswa/i) — Panitia
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            08.20–08.30
                        </span>
                        <span className="text-slate-400">
                            Kultum Siswa — Panitia
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            08.30–09.00
                        </span>
                        <span className="text-slate-400">
                            Sambutan-sambutan — MC
                        </span>
                    </div>
                    <div className="-mx-4 flex gap-3 rounded bg-emerald-900 px-4 py-2">
                        <span className="min-w-[120px] font-semibold text-emerald-300">
                            09.00–10.15
                        </span>
                        <span className="font-medium text-emerald-200">
                            Kajian Akbar bersama Ustadz Koh Dennis Lim
                            <br />
                            Tema: "Couple in Jannah: Meraih Bahagia Bersama
                            Hingga Keabadian Syurga"
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            10.15–11.00
                        </span>
                        <span className="text-slate-400">
                            Sesi Q & A bersama Ustadz Koh Dennis Lim — MC
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            11.00–11.10
                        </span>
                        <span className="text-slate-400">
                            Doa Penutup oleh Ustadz Koh Dennis Lim
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[120px] font-medium text-slate-300">
                            11.10–11.15
                        </span>
                        <span className="text-slate-400">Penutupan — MC</span>
                    </div>
                </div>
            ),
        },
        {
            id: 2,
            title: 'Cara Pendaftaran',
            content: (
                <div className="space-y-4">
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            1.
                        </span>
                        <div>
                            <p className="text-slate-400">
                                Silakan lakukan pembayaran ke rekening berikut:
                            </p>
                            <div className="mt-2 rounded-lg border border-slate-700 bg-slate-800 p-3">
                                <p className="text-sm text-slate-300">
                                    <span className="font-medium">Bank:</span>{' '}
                                    BSI
                                </p>
                                <p className="text-sm text-slate-300">
                                    <span className="font-medium">Nama:</span>{' '}
                                    SILMI DAULATUNNISA
                                </p>
                                <p className="text-sm text-slate-300">
                                    <span className="font-medium">
                                        No. Rekening:
                                    </span>{' '}
                                    7329244987
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            2.
                        </span>
                        <span className="text-slate-400">Mengisi Form</span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            3.
                        </span>
                        <span className="text-slate-400">
                            Setelah melakukan pembayaran, simpan bukti
                            pembayaran atau QR Code yang diberikan oleh panitia.
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            4.
                        </span>
                        <span className="text-slate-400">
                            Unggah bukti pembayaran/QR Code pada kolom yang
                            tersedia di bawah ini.
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            5.
                        </span>
                        <span className="text-slate-400">
                            Pastikan data dan bukti yang diunggah jelas dan
                            sesuai agar proses verifikasi berjalan lancar.
                        </span>
                    </div>
                    <div className="flex gap-3">
                        <span className="min-w-[24px] font-semibold text-slate-300">
                            6.
                        </span>
                        <span className="text-slate-400">
                            Saat kegiatan berlangsung, bawa QR Code yang telah
                            dimiliki sebagai bukti registrasi.
                        </span>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <Head title="Kajian Akbar" />

            <body className="flex min-h-screen flex-col items-center justify-center gap-8 px-10 py-20 lg:px-70">
                {/* Container dengan rasio 16:9 yang responsif */}
                <div className="m-auto w-full overflow-hidden rounded-2xl">
                    <img
                        src="/kajian-akbar.png"
                        alt="Contoh gambar"
                        className="w-full"
                    />
                </div>
                <br />
                <br />
                <br />

                <div className="text lg:w-[80%]">
                    <H1 align="left">Kajian Akbar</H1>
                    <br />
                    <Paragraph>
                        Dalam rangkaian kegiatan gFest sesi 2 , dengan bangga SD
                        gGans menghadirkan kegiatan positif untuk masyarakat
                        umum. Rangkaian kegiatan yang kedua adalah "Kajian
                        Akbar". <br />
                        <br /> Kajian akbar ini mengundang penceramah ternama
                        Ustadz Koh Dennis Lim, dengan tema : Couple in Jannah
                        "Meraih Bahagia Bersama Hingga Keabadian Syurga" . Pada
                        hari Minggu tanggal 7 Desember 2025.
                    </Paragraph>
                    <br />
                </div>

                <section className="flex min-h-screen flex-col items-start justify-center gap-8">
                    <H2 align="left">Pemateri Kajian Akbar</H2>
                    <Paragraph className="mb-16 max-w-4xl text-lg leading-relaxed text-slate-700 lg:text-xl">
                        Ustad Koh Dennis Lim, seorang pendakwah dan ustaz
                        Indonesia yang populer di kalangan anak muda dan dikenal
                        dengan gaya ceramahnya yang santai namun mendalam.
                    </Paragraph>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                        {images.map((image) => (
                            <div
                                key={image.id}
                                className="hover:shadow-3xl group relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 hover:scale-105"
                            >
                                <img
                                    src={image.url}
                                    alt={image.alt}
                                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-110 lg:h-96"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </section>

                <section className="w-full py-16">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-3 text-center text-3xl font-bold text-white lg:text-4xl">
                            Informasi Acara
                        </h2>
                        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-400">
                            Dapatkan informasi lengkap mengenai rundown acara
                            dan cara pendaftaran
                        </p>

                        <div className="overflow-hidden rounded-xl">
                            {accordionData.map((item, index) => (
                                <div
                                    key={item.id}
                                    className={`${
                                        index !== accordionData.length - 1
                                            ? 'border-b border-slate-700'
                                            : ''
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex w-full items-center justify-between px-6 py-5 text-white transition-colors duration-200 hover:bg-slate-800"
                                    >
                                        <span className="text-left text-lg font-semibold">
                                            {item.title}
                                        </span>
                                        <ChevronDown
                                            className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                                                openIndex === index
                                                    ? 'rotate-180'
                                                    : ''
                                            }`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                            openIndex === index
                                                ? 'max-h-[2000px]'
                                                : 'max-h-0'
                                        }`}
                                    >
                                        <div className="px-6 pb-6 text-sm">
                                            {item.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Section Kerja Sama dan Sponsorship */}
                <section className="min-h-screen px-6 py-20 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        {/* Text */}
                        <div className="relative overflow-hidden rounded-3xl border border-gray-700/50 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm">
                            <div className="flex h-full flex-col justify-center p-10 md:p-12">
                                <H2 align="left">Pendaftaran Kajian Akbar</H2>
                                <Paragraph>
                                    Daftarkan diri Anda untuk mengikuti Kajian
                                    Akbar bersama Ustadz Koh Dennis Lim. Acara
                                    ini terbuka untuk umum dan gratis. Segera
                                    daftarkan diri Anda dengan mengisi form
                                    pendaftaran yang tersedia.
                                </Paragraph>
                                <br />
                                <div>
                                    <a
                                        href="/kajian-akbar/pendaftaran"
                                        className="inline-block rounded-full border-2 border-white/50 bg-transparent px-3 py-1 font-medium text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white/10"
                                    >
                                        Daftar Sekarang
                                    </a>
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-300/10" />
                        </div>
                    </div>
                </section>
            </body>
        </>
    );
}
