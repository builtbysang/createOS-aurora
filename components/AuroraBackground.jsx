import Aurora from "./Aurora";

export default function AuroraBackground({
  mode = "dark",
  className = "",
  showFooter = true,
  children = null,
}) {
  const isDark = mode === "dark";

  return (
    <main
      className={`relative min-h-screen overflow-hidden ${
        isDark ? "bg-[#050505] text-[#f5f5f5]" : "bg-[#f7f7f7] text-[#0d0d0d]"
      } ${className}`}
    >
      <TopBackground isDark={isDark} />
      {showFooter ? <BottomGlow /> : null}
      <section className="relative z-10 min-h-screen w-full">{children}</section>
    </main>
  );
}

function TopBackground({ isDark }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-[620px] overflow-visible">
      <div
        className={`absolute inset-x-0 top-0 h-[260px] ${
          isDark
            ? "bg-[linear-gradient(to_bottom,rgba(8,8,24,0.74)_0%,rgba(8,8,24,0.48)_34%,rgba(8,8,24,0.20)_62%,rgba(8,8,24,0.06)_82%,rgba(8,8,24,0)_100%)]"
            : "bg-[linear-gradient(to_bottom,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.24)_52%,rgba(255,255,255,0)_100%)]"
        }`}
      />

      <div className="absolute inset-x-0 top-0 h-[500px]">
        <div className="absolute -left-[170px] -top-[300px] h-[620px] w-[820px] rotate-[-6deg] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,91,214,0.30)_0%,rgba(56,91,214,0.13)_42%,rgba(56,91,214,0)_82%)] blur-[34px] animate-[auroraLayerFloatA_18s_ease-in-out_infinite_alternate]" />
        <div className="absolute left-1/2 top-[-72px] h-[620px] w-[980px] -translate-x-1/2 rotate-[2deg] rounded-full bg-[radial-gradient(circle_at_center,rgba(74,124,255,0.34)_0%,rgba(74,124,255,0.14)_45%,rgba(74,124,255,0)_84%)] blur-[38px] animate-[auroraLayerFloatB_22s_ease-in-out_infinite_alternate-reverse]" />
        <div className="absolute -right-[170px] -top-[350px] h-[620px] w-[830px] rotate-[7deg] rounded-full bg-[radial-gradient(circle_at_center,rgba(109,96,255,0.30)_0%,rgba(109,96,255,0.12)_42%,rgba(109,96,255,0)_82%)] blur-[34px] animate-[auroraLayerFloatC_20s_ease-in-out_infinite_alternate]" />
      </div>

      <div className="absolute -top-[690px] inset-x-0 h-[930px] opacity-100 blur-[8px] [mask-image:linear-gradient(to_bottom,black_62%,rgba(0,0,0,0.92)_74%,rgba(0,0,0,0.60)_86%,rgba(0,0,0,0.22)_95%,transparent_100%)] animate-[auroraLayerFloatA_16s_ease-in-out_infinite_alternate]">
        <Aurora
          colorStops={["#fff35a", "#1d4ed8", isDark ? "#7ea2ff" : "#f0f9ff"]}
          amplitude={2.0}
          blend={0.68}
          speed={1.1}
          intensity={1.42}
        />
      </div>

      <div className="absolute -top-[300px] inset-x-0 h-[830px] opacity-84 blur-[10px] [mask-image:linear-gradient(to_bottom,black_56%,rgba(0,0,0,0.88)_72%,rgba(0,0,0,0.56)_86%,rgba(0,0,0,0.20)_95%,transparent_100%)] animate-[auroraLayerFloatB_24s_ease-in-out_infinite_alternate-reverse]">
        <Aurora
          colorStops={[isDark ? "#7ea2ff" : "#f0f9ff", "#1d4ed8", "#fff35a"]}
          amplitude={1.72}
          blend={0.66}
          speed={0.78}
          intensity={1.28}
        />
      </div>
    </div>
  );
}

function BottomGlow() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute -bottom-[64px] left-0 h-[440px] w-full overflow-visible [mask-image:radial-gradient(140%_95%_at_50%_100%,black_56%,rgba(0,0,0,0.78)_74%,transparent_100%)]"
    >
      <div
        className="absolute -bottom-[6%] left-1/2 h-[320px] w-[122%] -translate-x-1/2 rounded-[100%] opacity-24 animate-[footerMistDriftA_16s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(94,141,255,0.46) 0%, rgba(60,104,228,0.24) 42%, rgba(30,56,140,0) 80%)",
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute -bottom-[12%] left-[14%] h-[270px] w-[58%] rounded-[100%] opacity-20 animate-[footerMistDriftB_22s_ease-in-out_infinite_alternate-reverse]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(74,123,255,0.38) 0%, rgba(74,123,255,0.16) 44%, rgba(74,123,255,0) 84%)",
          filter: "blur(26px)",
        }}
      />
      <div
        className="absolute -bottom-[14%] right-[12%] h-[260px] w-[54%] rounded-[100%] opacity-18 animate-[footerMistDriftC_18s_ease-in-out_infinite_alternate]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(122,160,255,0.34) 0%, rgba(122,160,255,0.14) 40%, rgba(122,160,255,0) 84%)",
          filter: "blur(30px)",
        }}
      />
    </div>
  );
}
