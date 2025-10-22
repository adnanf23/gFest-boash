import { H2 } from "../atom/heading";
import Paragraph from "../atom/paragraph";


export default function TextBox(
    {
        h2, p, img
    } : {
        h2: string;
        p: string;
        img: string;
    }
) {
  return (
    <section id="partnership" className="min-h-screen py-20 px-6 flex justify-center items-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          
         {/* Text */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50">
            <div className="p-10 md:p-12 h-full flex flex-col justify-center">
              <H2 className="text-white text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {h2}
              </H2>
              <Paragraph className="text-gray-300 text-lg leading-relaxed mb-8">
{p}
              </Paragraph> <br />
              <div>
                <a
                  href="#form-partnership"
                  className="inline-block bg-transparent border-2 border-white/50 hover:border-white hover:bg-white/10 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-sm"
                >
                  Ajukan kerja sama
                </a>
              </div>
            </div>
            

            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-yellow-300/10 pointer-events-none" />
          </div>

         {/* Image */}
          <div className="relative overflow-hidden rounded-3xl group">
            <img
              src={img}
              alt="Festival Event"
              className="w-full h-full object-cover min-h-[400px] md:min-h-[500px] transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute inset-0 border-2 border-white/10 rounded-3xl pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}