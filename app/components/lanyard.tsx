type LanyardProps = {
  photo?: string;
  name?: string;
  role?: string;
};

export default function Lanyard({
  photo,
  name = "Chriss",
  role = "Web Developer",
}: LanyardProps) {
  return (
    // overflow-hidden: lanyard terlihat "turun" dari tepi atas section
    <div className="-mt-32 overflow-hidden px-6 pb-6">
      <div className="lanyard-drop mx-auto w-64">
        <div className="lanyard-swing flex flex-col items-center">
          {/* Tali */}
          <div
            className="h-56 w-9 bg-indigo-500"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 12px)",
            }}
          />

          {/* Pengait logam */}
          <div className="-mt-1 h-5 w-6 rounded-b-md bg-gradient-to-b from-gray-300 to-gray-500" />
          <div className="-mt-1 h-4 w-4 rounded-full border-[3px] border-gray-400" />

          {/* Kartu */}
          <div className="-mt-2 w-full rounded-2xl border border-white/10 bg-[#1a1a22] p-4 shadow-xl shadow-black/40">
            <div className="mx-auto mb-4 h-2 w-14 rounded-full bg-[#0f0f14]" />

            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-[#2a2a36]">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={`Foto ${name}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-gray-500"
                  role="img"
                  aria-label="Tempat foto"
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
                  </svg>
                </div>
              )}
            </div>

            <div className="mt-4 text-center">
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm text-gray-400">{role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
