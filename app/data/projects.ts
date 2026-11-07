export type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
};

// Tambah / ubah project kamu di sini
export const projects: Project[] = [
  {
    title: "Project Satu",
    description: "Deskripsi singkat project.",
    tech: ["Next.js", "TypeScript"],
    link: "https://github.com/username/project-satu",
  },
  {
    title: "Project Dua",
    description: "Deskripsi singkat project.",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Project Tiga",
    description: "Deskripsi singkat project.",
    tech: ["JavaScript", "Node.js"],
  },
];
