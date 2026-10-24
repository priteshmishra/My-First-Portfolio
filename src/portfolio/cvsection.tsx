
import React from 'react';

export const CVSection: React.FC = () => {
  const cvUrl = `${import.meta.env.BASE_URL}cv.pdf`;

  return (
    <section id="cv" className="relative px-6 py-20">
      <div className="mx-auto max-w-4xl rounded-2xl border border-cyan-500/20 bg-black/30 p-8 text-center shadow-lg backdrop-blur-md md:p-12">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-cyan-400">
          Academic Profile
        </p>

        <h2 className="text-3xl font-bold md:text-5xl">
          Curriculum Vitae
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-300">
          Explore my education, developing skills, and career interests
          in Biotechnology, Bioinformatics, and Computational Biology.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-cyan-400 px-6 py-3 font-medium text-cyan-300 transition hover:bg-cyan-400/10"
          >
            View CV
          </a>

          <a
            href={cvUrl}
            download="Pritesh_Mishra_CV.pdf"
            className="rounded-lg bg-cyan-400 px-6 py-3 font-semibold text-black transition hover:bg-cyan-300"
          >
            Download CV
          </a>
        </div>
      </div>
    </section>
  );
};

