export type Item = {
  type: "Experience" | "Project";
  title: string;
  description: string;
  /** Daftar foto di folder public. Kosongkan untuk placeholder. */
  images?: string[];
  /** Durasi tiap foto dalam milidetik (default 4000 = 4 detik) */
  duration?: number;
  tech?: string[];
  link?: string;
};

export const projects: Item[] = [
  {
    type: "Experience",
    title: "Duta SPMB",
    description:
      "Sebagai Duta SPMB, saya mewakili sekolah dalam kegiatan roadshow untuk mempresentasikan program dan fasilitas unggulan kepada calon siswa baru. Pengalaman ini secara langsung melatih kepercayaan diri dan mengasah kemampuan public speaking saya di depan banyak orang.",
    images: ["/duta.jpg",],
    duration: 3000,
    tech: ["Communication"],
  },
  {
    type: "Experience",
    title: "Internship",
    description:
      "Menyelesaikan program magang sebagai DevOps Engineering Intern di PT Tata Sarana Mandiri dengan predikat Best Intern.",
    images: ["/BestIntern.jpeg", "/Meeting.jpeg"], // placeholder
    tech: ["DevOps", "Engineering"],
  },
  {
    type: "Project",
    title: "BeanFlow",
    description:
      "BeanFlow adalah sistem Point of Sale terintegrasi untuk coffee shop yang mengotomatisasi pencatatan penjualan sekaligus perhitungan gaji karyawan.",
    images: [],
    tech: ["Full Stack", "React", "Laravel", "MySQL"],
    link: "https://github.com/Chriss-Z/Bean-Flow",
  },
  {
    type: "Project",
    title: "CashFlow",
    description:
      "CashFlow adalah aplikasi manajemen keuangan pribadi untuk melacak pemasukan dan pengeluaran harian dengan mudah.",
    images: [],
    tech: ["Laravel", "MySQL"],
    link: "https://github.com/Chriss-Z/Cash.Flow",
  },
];
