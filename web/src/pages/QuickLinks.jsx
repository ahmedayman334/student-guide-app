import React from "react";
import SideBar from "../compontents/SideBar";
import {
  IoArrowForward,
  IoBookOutline,
  IoCalendarOutline,
  IoCardOutline,
  IoDocumentTextOutline,
  IoGridOutline,
  IoLibraryOutline,
  IoLinkOutline,
  IoOpenOutline,
  IoPeopleOutline,
  IoSchoolOutline,
} from "react-icons/io5";

const quickLinks = [
  {
    title: "Course Registration",
    description: "Enroll in next semester modules and track your credits.",
    color: "#4E58CA",
    bg: "bg-[#EEF0FF]",
    icon: IoGridOutline,
    featured: true,
  },
  {
    title: "Exam Results",
    description: "View latest grades and detailed score breakdowns.",
    color: "#10AFA1",
    bg: "bg-[#E6FAF7]",
    icon: IoDocumentTextOutline,
  },
  {
    title: "Academic Schedule",
    description: "Full year timeline and important deadlines.",
    color: "#B58A19",
    bg: "bg-[#FBF1D9]",
    icon: IoCalendarOutline,
  },
  {
    title: "Tuition Payment",
    description: "Manage billing, fees, and scholarship updates.",
    color: "#F05B7F",
    bg: "bg-[#FFEAF0]",
    icon: IoCardOutline,
  },
  {
    title: "Student Affairs",
    description: "Council and dedicated support services.",
    color: "#10AFA1",
    bg: "bg-[#E6FAF7]",
    icon: IoPeopleOutline,
  },
  {
    title: "E-Library Access",
    description: "Journals, archives, and digital textbooks.",
    color: "#6977FF",
    bg: "bg-[#EEF0FF]",
    icon: IoLibraryOutline,
  },
];

function QuickLinkCard({ item }) {
  const Icon = item.icon;

  return (
    <article
      className={`rounded-[10px] bg-white p-6 shadow-[0_10px_25px_rgba(29,33,78,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(29,33,78,0.09)] ${
        item.featured ? "border-l-4 border-[#4E58CA]" : "border border-transparent"
      }`}
    >
      <div
        className={`mb-10 flex h-11 w-11 items-center justify-center rounded-[12px] ${item.bg}`}
        style={{ color: item.color }}
      >
        <Icon size={22} />
      </div>

      <h3 className="text-[18px] font-bold leading-tight text-[#25264F]">
        {item.title}
      </h3>
      <p className="mt-3 text-[13px] font-medium leading-relaxed text-[#64617A]">
        {item.description}
      </p>
    </article>
  );
}

function LibraryPreview() {
  return (
    <div className="relative h-full min-h-[150px] overflow-hidden rounded-[12px] bg-[#2A2744] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,33,24,0.95)_0_18%,rgba(148,102,56,0.95)_18%_22%,rgba(54,45,34,0.95)_22%_40%,rgba(164,117,67,0.95)_40%_44%,rgba(42,39,68,0.95)_44%_100%)]" />
      <div className="absolute inset-x-0 top-1/2 h-2 bg-black/25" />
      <div className="absolute inset-y-0 left-[23%] w-[34%] bg-[repeating-linear-gradient(90deg,#5D4933_0_7px,#B38656_7px_10px,#30291F_10px_15px)] opacity-95" />
      <div className="absolute inset-y-0 right-0 w-[43%] bg-[repeating-linear-gradient(90deg,#29263D_0_16px,#ECE6D8_16px_18px,#5B5578_18px_27px)] opacity-80" />
      <div className="absolute bottom-0 left-[36%] h-[58%] w-[22%] bg-[#D4C9B7]/80 blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,rgba(255,255,255,0.34),transparent_24%),linear-gradient(180deg,transparent,rgba(0,0,0,0.28))]" />
    </div>
  );
}

export default function QuickLinks() {
  return (
    <div className="flex min-h-screen bg-[#F5F5FA] font-sans text-left" dir="ltr">
      <SideBar />

      <main className="flex-1 overflow-y-auto">
        <section className="px-10 py-10">
          <div className="mb-9 max-w-[650px]">
            <div className="mb-4 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.32em] text-[#4E58CA]">
              <IoLinkOutline size={14} />
              Navigation Hub
            </div>
            <h1 className="text-[42px] font-extrabold leading-tight tracking-tight text-[#2A274D]">
              Quick <span className="text-[#4E58CA]">Links</span>
            </h1>
            <p className="mt-4 text-[15px] font-medium leading-relaxed text-[#64617A]">
              Instant access to essential university resources and administrative
              tools. Use these shortcuts to manage your academic journey
              efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {quickLinks.slice(0, 5).map((item) => (
              <QuickLinkCard key={item.title} item={item} />
            ))}

            <article className="relative overflow-hidden rounded-[10px] bg-[#4E58CA] p-7 text-white shadow-[0_18px_35px_rgba(78,88,202,0.24)] md:col-span-2">
              <div className="relative z-10 max-w-[70%]">
                <h3 className="text-[22px] font-bold leading-tight">
                  University Portal
                </h3>
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-white/75">
                  Access the central node for all institutional academic departments.
                </p>
                <button
                  type="button"
                  className="mt-7 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-white"
                >
                  Launch Portal <IoOpenOutline size={15} />
                </button>
              </div>
              <div className="absolute right-7 top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-center rounded-[20px] bg-white/16 text-white">
                <IoSchoolOutline size={42} />
              </div>
            </article>

            {quickLinks.slice(5).map((item) => (
              <QuickLinkCard key={item.title} item={item} />
            ))}
          </div>

          <section className="mt-12 grid grid-cols-1 gap-8 rounded-[14px] bg-[#EFEAFF] p-8 md:grid-cols-[220px_1fr]">
            <LibraryPreview />
            <div>
              <span className="inline-flex rounded-full bg-[#F6D778] px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#7B5A00]">
                New Resource
              </span>
              <h2 className="mt-5 text-[28px] font-extrabold leading-tight text-[#25264F]">
                Digital Dissertation Archives
              </h2>
              <p className="mt-4 max-w-[560px] text-[14px] font-medium leading-relaxed text-[#64617A]">
                Explore over 50,000 peer-reviewed papers and historical thesis
                documents from the university's collective history. A comprehensive
                repository for advanced academic research.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <button className="flex items-center gap-2 rounded-full bg-[#4E58CA] px-6 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#3f49b3]">
                  Explore Repository <IoArrowForward size={16} />
                </button>
                <button className="rounded-full border border-[#4E58CA] px-6 py-3 text-[13px] font-bold text-[#4E58CA] transition-colors hover:bg-white">
                  Learn More
                </button>
              </div>
            </div>
          </section>

          <footer className="mt-16 flex max-w-[900px] flex-wrap items-center justify-between gap-4 text-[11px] font-semibold text-[#7F78A8]">
            <span>© 2024 University Student Services. All rights reserved.</span>
            <div className="flex gap-8">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Contact Support</span>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}
