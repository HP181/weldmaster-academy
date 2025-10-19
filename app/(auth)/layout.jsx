export const metadata = {
  title: "Admin Dashboard | SkillWorks Welding Institute",
  description: "Admin panel for managing welding programs, students, and institutional data at SkillWorks Welding Institute.",
  icons: {
    icon: '/welding.png'
  },
  openGraph: {
    title: "Meet Platform - Admin Dashboard | SkillWorks Welding Institute",
    description: "Admin panel for managing welding programs, students, and institutional data at SkillWorks Welding Institute.",
    url: "https://www.skillworksweld.ca/admin/dashboard",
    siteName: "SkillWorks Welding Institute",
    images: [
      {
        url: "/welding.png",
        width: 800,
        height: 600,
        alt: "SkillWorks Welding Institute Logo"
      }
    ],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard | SkillWorks Welding Institute",
    description: "Admin panel for managing welding programs, students, and institutional data at SkillWorks Welding Institute.",
    images: ["/welding.png"],
    site: "@SkillWorksWeld",
  }
};

const AuthLayout = ({ children }) => {
  return (
    <div className="flex justify-center items-center relative min-h-screen md:mt-14">
      {children}
    </div>
  );
};

export default AuthLayout;
