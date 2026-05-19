import React from "react";
import SideBar from "../compontents/SideBar";
import {
  IoArrowForward,
  IoBookOutline,
  IoBriefcaseOutline,
  IoColorPaletteOutline,
  IoDesktopOutline,
  IoFitnessOutline,
  IoNotificationsOutline,
  IoPeopleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { FaDraftingCompass } from "react-icons/fa";

const departments = [
  {
    title: "Computer Science",
    description: "Software engineering, artificial intelligence, and data systems.",
    subjects: 124,
    color: "#4E58CA",
    iconBg: "bg-[#EEF0FF]",
    icon: IoDesktopOutline,
  },
  {
    title: "Engineering",
    description: "Structural analysis, thermodynamics, and applied mechanics.",
    subjects: 98,
    color: "#00897B",
    iconBg: "bg-[#E8F8F5]",
    icon: FaDraftingCompass,
  },
  {
    title: "Arts & Design",
    description: "Visual communication, traditional fine arts, and creative media.",
    subjects: 65,
    color: "#9A690B",
    iconBg: "bg-[#F8EFD8]",
    icon: IoColorPaletteOutline,
  },
  {
    title: "Business School",
    description: "Global economics, international trade, and entrepreneurship.",
    subjects: 82,
    color: "#6977FF",
    iconBg: "bg-[#EEF0FF]",
    icon: IoBriefcaseOutline,
  },
  {
    title: "Medical Sciences",
    description: "Advanced anatomy, clinical hospital practice, and public health.",
    subjects: 112,
    color: "#C2185B",
    iconBg: "bg-[#FCEAF2]",
    icon: IoFitnessOutline,
  },
  {
    title: "Social Sciences",
    description: "Human sociology, cultural anthropology, and modern psychology.",
    subjects: 74,
    color: "#10AFA1",
    iconBg: "bg-[#E6FAF7]",
    icon: IoPeopleOutline,
  },
];

function AcademicCard({ department }) {
  const Icon = department.icon;

  return (
    <article className="relative min-h-[260px] rounded-[16px] border border-[#DDDDF2] bg-white p-7 shadow-[0_10px_25px_rgba(29,33,78,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(29,33,78,0.08)]">
      <div
        className="absolute left-0 top-0 h-full w-1.5 rounded-l-[16px]"
        style={{ backgroundColor: department.color }}
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${department.iconBg}`}
          style={{ color: department.color }}
        >
          <Icon size={24} />
        </div>
        <span className="rounded-full bg-[#F1EEFF] px-4 py-1.5 text-[11px] font-bold text-[#5B5684]">
          {department.subjects} Subjects
        </span>
      </div>

      <div className="mt-16">
        <h3 className="text-[21px] font-bold leading-tight text-[#25264F]">
          {department.title}
        </h3>
        <p className="mt-3 min-h-[54px] text-[13px] font-medium leading-relaxed text-[#64617A]">
          {department.description}
        </p>
      </div>

      <button
        type="button"
        className="mt-6 flex items-center gap-2 text-[13px] font-bold transition-transform hover:translate-x-1"
        style={{ color: department.color }}
      >
        View subjects <IoArrowForward size={17} />
      </button>
    </article>
  );
}

export default function AcademicYear() {
  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />

      <main className="flex-1 overflow-y-auto">
        <header className="flex items-center justify-between border-b border-[#E6E2F0] bg-white px-10 py-5">
          <div className="flex items-center gap-3 text-[13px] font-bold text-[#7F78A8]">
            <span>Academic</span>
            <span className="text-[#C4BED8]">›</span>
            <span className="text-[#2B2B57]">Departments</span>
          </div>

          <div className="flex items-center gap-6">
            <label className="relative hidden sm:block">
              <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-[#77709A]" />
              <input
                type="search"
                placeholder="Search courses..."
                className="h-10 w-[260px] rounded-full bg-[#F1ECFA] pl-11 pr-4 text-[13px] font-semibold text-[#2B2B57] outline-none placeholder:text-[#9A94B5] focus:ring-2 focus:ring-[#4E58CA]/30"
              />
            </label>
            <button
              type="button"
              aria-label="Notifications"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#2B2B57] transition-colors hover:bg-[#F1ECFA]"
            >
              <IoNotificationsOutline size={21} />
            </button>
          </div>
        </header>

        <section className="px-10 py-10">
          <div className="mb-10 max-w-[720px]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#4E58CA]">
              <IoBookOutline size={14} />
              Curriculum
            </div>
            <h1 className="text-[42px] font-extrabold leading-tight tracking-tight text-[#2A274D]">
              Academic <span className="text-[#4E58CA]">Departments</span>
            </h1>
            <p className="mt-5 text-[16px] font-medium leading-relaxed text-[#64617A]">
              Explore specialized faculties and discover over 450 subjects curated
              for your academic journey. Filter by department to see specific degree
              requirements and elective options.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {departments.map((department) => (
              <AcademicCard key={department.title} department={department} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
