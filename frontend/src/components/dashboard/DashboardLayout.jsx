import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import {
  IconHome,
  IconCpu,
  IconShieldCheck,
  IconPhoto,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import GenerationPipeline from "./GenerationPipeline";
import DetectionPipeline from "./DetectionPipeline";
import AssetsView from "@/components/assets/AssetsView";

const NAV = [
  { slug: "home", label: "Home", icon: IconHome },
  { slug: "generation", label: "Generation Engine", icon: IconCpu },
  { slug: "detection", label: "Detection Engine", icon: IconShieldCheck },
  { slug: "assets", label: "Assets", icon: IconPhoto },
  { slug: "profile", label: "Profile", icon: IconUser },
  { slug: "settings", label: "Settings", icon: IconSettings },
];

const USER = {
  name: "Student Admin",
  email: "admin@mdave.edu",
  role: "Administrator",
  avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=MDAVEAdmin",
};

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);
  const { tab } = useParams();
  const navigate = useNavigate();

  // The URL is the source of truth for the active tab
  const activeTab = NAV.find((n) => n.slug === tab)?.label ?? "Home";

  const goTo = (label) => {
    const item = NAV.find((n) => n.label === label);
    if (item) navigate(`/dashboard/${item.slug}`);
    if (window.innerWidth < 768) setOpen(false);
  };

  return (
    <div className="flex h-screen w-full flex-1 flex-col overflow-hidden md:flex-row">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <nav className="mt-8 flex flex-col gap-2">
              {NAV.map(({ slug, label, icon: Icon }) => {
                const active = activeTab === label;
                return (
                  <SidebarLink
                    key={slug}
                    active={active}
                    onClick={() => goTo(label)}
                    link={{
                      label,
                      href: `/dashboard/${slug}`,
                      icon: (
                        <Icon
                          className={cn(
                            "h-5 w-5 shrink-0",
                            active ? "text-red-500" : "text-zinc-300"
                          )}
                        />
                      ),
                    }}
                  />
                );
              })}
            </nav>
          </div>

          <div>
            <SidebarLink
              onClick={() => goTo("Profile")}
              link={{
                label: USER.name,
                href: "/dashboard/profile",
                icon: (
                  <img
                    src={USER.avatar}
                    className="h-7 w-7 shrink-0 rounded-full bg-zinc-700"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>

      <Dashboard activeTab={activeTab} setActiveTab={goTo} />
    </div>
  );
}

/* ---------------- Branding ---------------- */

const ShieldMark = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M12 3 4 6v6c0 4.5 3.2 7.8 8 9 4.8-1.2 8-4.5 8-9V6l-8-3Z" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M12 7v2M12 15v2M7 12h2M15 12h2" />
  </svg>
);

export const Logo = () => (
  <Link to="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal">
    <ShieldMark className="h-6 w-6 shrink-0 text-red-500" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-semibold whitespace-pre text-zinc-200"
    >
      M-DAVE
    </motion.span>
  </Link>
);

export const LogoIcon = () => (
  <Link to="/" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal">
    <ShieldMark className="h-6 w-6 shrink-0 text-red-500" />
  </Link>
);

/* ---------------- Dynamic content area ---------------- */

const Dashboard = ({ activeTab, setActiveTab }) => {
  const views = {
    Home: <HomeView onNavigate={setActiveTab} />,
    "Generation Engine": <GenerationPipeline />,
    "Detection Engine": <DetectionPipeline />,
    Assets: <AssetsView embedded />,
    Profile: <ProfileView />,
    Settings: <SettingsView />,
  };

  return (
    <div className="flex min-h-0 flex-1">
      <div className="h-full w-full overflow-y-auto rounded-tl-2xl border border-white/10 bg-zinc-950/40 p-4 md:p-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mx-auto w-full max-w-5xl"
        >
          {views[activeTab]}
        </motion.div>
      </div>
    </div>
  );
};

/* ---------------- Views ---------------- */

const STATS = [
  { label: "Images generated", value: "12" },
  { label: "Images verified", value: "34" },
  { label: "Raw images stored", value: "0" },
];

const HomeView = ({ onNavigate }) => (
  <div className="space-y-8">
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-red-500">Welcome back</p>
      <h1 className="mt-1 text-2xl font-bold text-zinc-200 sm:text-3xl">M-DAVE Control Center</h1>
      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
        Generate watermarked, signed synthetic media or verify whether an image is real. All
        uploads are processed in memory and purged after inference.
      </p>
    </div>

    <div className="grid gap-4 sm:grid-cols-3">
      {STATS.map((s) => (
        <div key={s.label} className="rounded-xl border border-white/10 bg-zinc-900/60 p-5">
          <p className="text-3xl font-bold text-zinc-200">{s.value}</p>
          <p className="mt-1 text-sm text-zinc-400">{s.label}</p>
        </div>
      ))}
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <button
        onClick={() => onNavigate("Generation Engine")}
        className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 text-left transition hover:border-cyan-500/40"
      >
        <IconCpu className="h-6 w-6 text-cyan-400" />
        <h3 className="mt-3 font-semibold text-zinc-200">Generation Engine</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Promptless identity transfer with watermark and C2PA signing.
        </p>
      </button>
      <button
        onClick={() => onNavigate("Detection Engine")}
        className="rounded-xl border border-white/10 bg-zinc-900/60 p-6 text-left transition hover:border-rose-500/40"
      >
        <IconShieldCheck className="h-6 w-6 text-rose-400" />
        <h3 className="mt-3 font-semibold text-zinc-200">Detection Engine</h3>
        <p className="mt-1 text-sm text-zinc-400">
          Multimodal CV + NLP check with a real-vs-synthetic score.
        </p>
      </button>
    </div>
  </div>
);

const ProfileView = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-zinc-200 sm:text-3xl">Profile</h1>
    <div className="flex items-center gap-5 rounded-xl border border-white/10 bg-zinc-900/60 p-6">
      <img src={USER.avatar} alt="Avatar" className="h-20 w-20 rounded-full bg-zinc-700" />
      <div>
        <p className="text-lg font-semibold text-zinc-200">{USER.name}</p>
        <p className="text-sm text-zinc-400">{USER.email}</p>
        <span className="mt-2 inline-block rounded-full border border-red-500/40 bg-red-500/10 px-3 py-0.5 text-xs font-medium text-red-400">
          {USER.role}
        </span>
      </div>
    </div>
  </div>
);

const POLICIES = [
  { title: "Visible watermark", desc: "Applied to every generated image." },
  { title: "C2PA signature", desc: "Cryptographic provenance manifest embedded in output." },
  { title: "Ephemeral processing", desc: "Uploads live in RAM only and are purged after inference." },
];

const SettingsView = () => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold text-zinc-200 sm:text-3xl">Settings</h1>
    <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-zinc-900/60">
      {POLICIES.map((p) => (
        <div key={p.title} className="flex items-center justify-between gap-4 p-5">
          <div>
            <p className="font-medium text-zinc-200">{p.title}</p>
            <p className="text-sm text-zinc-400">{p.desc}</p>
          </div>
          <span className="shrink-0 rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-400">
            Always on
          </span>
        </div>
      ))}
    </div>
  </div>
);