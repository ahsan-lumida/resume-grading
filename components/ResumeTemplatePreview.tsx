// On-page preview of a generated ResumeContent. Rendered as a light "paper"
// card on the dark app canvas — this mirrors what the downloadable PDF
// actually looks like (white background, print-safe single column) rather
// than a dark-themed reinterpretation that wouldn't match the real file.

import type { ResumeContent } from "@/types/resumeContent";

function ContactLine({ contact }: { contact: ResumeContent["contact"] }) {
  const parts = [
    contact.email,
    contact.phone,
    contact.location,
    contact.linkedin,
    contact.github,
    contact.website,
  ].filter((v): v is string => Boolean(v && v.trim().length > 0));

  if (parts.length === 0) return null;

  return (
    <p className="mt-2 text-[13px] text-zinc-600">
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="mx-2 text-zinc-300">|</span>}
          {part}
        </span>
      ))}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-violet-100 pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-violet-700">
      {children}
    </h3>
  );
}

export default function ResumeTemplatePreview({ resume }: { resume: ResumeContent }) {
  return (
    <div className="mx-auto w-full max-w-[820px] rounded-2xl bg-white p-8 text-zinc-900 shadow-paper-lg sm:p-12">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          {resume.contact.name || "Your Name"}
        </h1>
        <ContactLine contact={resume.contact} />
      </div>
      <div className="mt-5 h-[3px] rounded-full bg-gradient-to-r from-violet-600 via-violet-500 to-cyan-400" />

      <div className="mt-6 flex flex-col gap-6">
        {resume.summary && (
          <section>
            <SectionTitle>Summary</SectionTitle>
            <p className="mt-2.5 text-[14px] leading-relaxed text-zinc-700">{resume.summary}</p>
          </section>
        )}

        {resume.work_experience.length > 0 && (
          <section>
            <SectionTitle>Experience</SectionTitle>
            <div className="mt-3 flex flex-col gap-4">
              {resume.work_experience.map((job, i) => (
                <div key={i}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <p className="text-[14.5px] font-semibold text-zinc-900">
                      {job.title}
                      <span className="font-normal text-zinc-500"> — {job.company}
                        {job.location ? `, ${job.location}` : ""}
                      </span>
                    </p>
                    <p className="whitespace-nowrap text-[12.5px] text-zinc-500">
                      {job.start_date} – {job.end_date}
                    </p>
                  </div>
                  {job.bullets.length > 0 && (
                    <ul className="mt-1.5 list-disc space-y-1 pl-[18px] marker:text-violet-400">
                      {job.bullets.map((bullet, bi) => (
                        <li key={bi} className="text-[13.5px] leading-relaxed text-zinc-700">
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.projects.length > 0 && (
          <section>
            <SectionTitle>Projects</SectionTitle>
            <div className="mt-3 flex flex-col gap-4">
              {resume.projects.map((proj, i) => (
                <div key={i}>
                  <p className="text-[14.5px] font-semibold text-zinc-900">
                    {proj.name}
                    {proj.stack && <span className="font-normal text-zinc-500"> — {proj.stack}</span>}
                  </p>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-zinc-700">
                    {proj.description}
                    {proj.links.length > 0 && (
                      <>
                        {" "}
                        {proj.links.map((link, li) => (
                          <span key={li}>
                            {li > 0 && " | "}
                            <a
                              href={link.startsWith("http") ? link : `https://${link}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-violet-600 underline decoration-violet-200 underline-offset-2 hover:text-violet-700"
                            >
                              {link}
                            </a>
                          </span>
                        ))}
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.skills.length > 0 && (
          <section>
            <SectionTitle>Skills</SectionTitle>
            <div className="mt-2.5 flex flex-col gap-2">
              {resume.skills.map((group, gi) => (
                <div key={gi} className="flex flex-wrap items-start gap-x-2 gap-y-1.5">
                  {group.category && (
                    <span className="mt-0.5 shrink-0 text-[12.5px] font-semibold text-zinc-800">
                      {group.category}:
                    </span>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((skill, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-violet-50 px-2.5 py-0.5 text-[12.5px] font-medium text-violet-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.education.length > 0 && (
          <section>
            <SectionTitle>Education</SectionTitle>
            <div className="mt-3 flex flex-col gap-3">
              {resume.education.map((edu, i) => (
                <div key={i}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <p className="text-[14.5px] font-semibold text-zinc-900">
                      {edu.degree}
                      {edu.field_of_study ? `, ${edu.field_of_study}` : ""}
                      <span className="font-normal text-zinc-500"> — {edu.institution}
                        {edu.location ? `, ${edu.location}` : ""}
                      </span>
                    </p>
                    {(edu.start_date || edu.end_date) && (
                      <p className="whitespace-nowrap text-[12.5px] text-zinc-500">
                        {edu.start_date ? `${edu.start_date} – ` : ""}
                        {edu.end_date ?? ""}
                      </p>
                    )}
                  </div>
                  {edu.details && (
                    <p className="mt-1 text-[13px] leading-relaxed text-zinc-600">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {resume.certifications.length > 0 && (
          <section>
            <SectionTitle>Certifications</SectionTitle>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {resume.certifications.map((cert, i) => (
                <p key={i} className="text-[13.5px] text-zinc-700">
                  <span className="font-semibold text-zinc-900">{cert.name}</span>
                  {cert.issuer && <span className="text-zinc-500"> — {cert.issuer}</span>}
                  {cert.date && <span className="text-zinc-500"> ({cert.date})</span>}
                </p>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
