import { ArrowRight } from "lucide-react";
import { H2 } from "../atom/heading";
import Paragraph from "../atom/paragraph";


export default function EventSection() {
  
  const events = [
    {
      id: 1,
      title: "Performance Day",
      description: "Event khusus untuk internal sekolah dan keluarga besar SD Global Garuda Nusantara",
      image: "performance-day.png",
      buttonText: "Lihat Detail",
      buttonLink: "/performance-day"
    },
    {
      id: 2,
      title: "Kajian Akbar",
      description: "Kajian Akbar berjudul Couple In Jannah yang disampaikan oleh Ustadz Koh Denis Lim, event ini dibuka untuk umum.",
      image: '/kajian-akbar.png',
      buttonText: "Daftar Sekarang",
      buttonLink: "/kajian-akbar"
    }
  ];

  return (
    <section id="event" className="min-h-screen flex justify-center items-center py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div>
            <H2 className="text-white text-4xl md:text-5xl font-bold leading-tight">
              Event gFest tahun ajaran<br />2025/2026
            </H2>
          </div>
          <div className="flex items-center w-[70%]">
            <Paragraph className="text-gray-400 text-lg">
ajang untuk menampilkan potensi, bakat dan rasa percaya diri siswa siswi SD gGans,
            </Paragraph>
          </div>
        </div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

            {/* Glass Effect */}
              <div className="relative h-[500px] p-8 flex flex-col justify-end">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 group-hover:bg-white/15 group-hover:backdrop-blur-lg">
                  <h3 className="text-white text-2xl font-bold mb-3">
                    {event.title}
                  </h3>
                  <p className="text-gray-200 text-sm mb-6 leading-relaxed">
                    {event.description}
                  </p>
                  
                  {/* Button */}
                  <a
                    href={event.buttonLink}
                    className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium transition-all duration-300 group-hover:gap-3 border border-white/30"
                  >
                    {event.buttonText}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>


              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-300/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}