import { Mail, MessageCircle } from 'lucide-react';
import { H2 } from '../atom/heading';
import Paragraph from '../atom/paragraph';

export default function ContactSection() {
    const contacts = [
        {
            id: 1,
            type: 'whatsapp',
            icon: MessageCircle,
            label: 'WhatsApp',
            value: '+62 812-3456-7890',
            color: 'from-white/10 to-white/10',
            borderColor: 'border-white/20',
            iconBg: 'bg-white/20',
            textColor: 'text-white',
        },
        {
            id: 2,
            type: 'email',
            icon: Mail,
            label: 'Email',
            value: 'info@gfest.com',
            color: 'from-white/10 to-white/10',
            borderColor: 'border-white/20',
            iconBg: 'bg-white/20',
            textColor: 'text-white',
        },
    ];

    return (
        <section id='contact' className="flex min-h-screen items-center justify-center bg-[#121216] px-6 py-20">
            <div className="mx-auto w-full max-w-4xl text-center">
                {/* Header */}
                <H2 align='center' className="mb-6 text-4xl leading-tight font-bold text-white md:text-5xl">
                    Kontak resmi kami yang bisa
                    <br />
                    kamu hubungi
                </H2>
                <Paragraph align='center'>
                    Harap berhati-hati penipuan, kontak resmi hanya yang tertera
                    di website ini.
                </Paragraph><br />

                {/* Contact Buttons */}
                <div className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row">
                    {contacts.map((contact) => {
                        const IconComponent = contact.icon;
                        return (
                            <a
                                key={contact.id}
                                href={contact.value}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group relative overflow-hidden bg-gradient-to-br ${contact.color} border backdrop-blur-xl ${contact.borderColor} rounded-full px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20`}
                            >
                                <div className="relative flex items-center gap-4">
                                    {/* Icon */}
                                    <div
                                        className={`${contact.iconBg} rounded-full p-3 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110`}
                                    >
                                        <IconComponent
                                            className={`h-6 w-6 ${contact.textColor}`}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="text-left">
                                        <h3
                                            className={`${contact.textColor} text-lg font-bold`}
                                        >
                                            {contact.label}
                                        </h3>
                                        <p className="text-sm font-medium text-white/70">
                                            {contact.value}
                                        </p>
                                    </div>

                                    {/* Arrow indicator */}
                                    <div className="ml-4 transform text-lg font-bold text-white opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                                        →
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

                {/* Warning Box */}
                <div className="mx-auto max-w-3xl rounded-full border border-white/20 bg-white/10 p-6 backdrop-blur-xl">
                    <p className="flex items-center justify-center gap-2 text-sm font-medium text-white/90">
                        ⚠️ Waspada penipuan! Pastikan Anda menghubungi kontak
                        resmi di atas
                    </p>
                </div>
            </div>
        </section>
    );
}
