import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-[60px] text-white
      bg-[radial-gradient(circle_at_top,_#7c8cff_0%,_#667eea_35%,_#764ba2_100%)]">
      
      {/* subtle overlay for depth */}
      <div className="pointer-events-none absolute inset-0 bg-black/10" />

      <div className="relative mx-auto max-w-[900px] text-center">
        {/* Title */}
        <h1 className="mb-5 text-[3.2rem] font-extrabold leading-tight">
          Welcome to 🚀 TaskFlow 👋
        </h1>

        {/* Tagline */}
        <p className="mb-7 text-[1.4rem] leading-relaxed opacity-95">
          A simple and secure{" "}
          <strong>Personal Task Management System</strong>
        </p>

        {/* Main Description */}
        <p className="mb-10 text-[1.1rem] leading-[1.8] opacity-90">
          <strong>TaskFlow</strong> is a personal task management application that
          helps users organize their daily work efficiently. It allows users to
          create, update, delete, and track tasks using clear progress statuses
          such as <strong>Pending</strong>,{" "}
          <strong>In Progress</strong>,{" "}
          <strong>Completed</strong>, and{" "}
          <strong>Not Done</strong>.
          <br />
          <br />
          This application is developed as a{" "}
          <strong>college full-stack project</strong> using{" "}
          <strong>Next.js</strong> for the frontend and{" "}
          <strong>Supabase</strong> for authentication and database management.
          It uses <strong>Row Level Security (RLS)</strong> to ensure that users
          can only access their own data, providing a secure and reliable
          experience.
        </p>

        {/* Features */}
        <div className="mb-11 flex flex-wrap justify-center gap-5">
          {[
            "🔐 Secure Authentication",
            "📝 Task Management",
            "📊 Status Tracking",
            "🛡️ Data Privacy with RLS",
          ].map((item) => (
            <div
              key={item}
              className="rounded-full bg-white/15 px-[18px] py-3 text-[0.95rem] font-medium backdrop-blur-md"
            >
              {item}
            </div>
          ))}
        </div>

        {/* CTA */}
        <p className="mb-7 text-[1.2rem] opacity-95">
          Get started by signing in or creating a new account
        </p>

        <Link
          href="/login"
          className="inline-block rounded-lg bg-white px-[45px] py-4 text-[1.15rem] font-semibold text-[#667eea] shadow-lg transition hover:scale-105 active:scale-95"
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}
