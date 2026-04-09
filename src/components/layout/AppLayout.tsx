// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import TopNav from "./TopNav";
// import MobileSidebar from "./MobileSidebar";
// import { motion } from "framer-motion";

// export default function AppLayout() {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block">
//         <Sidebar
//           collapsed={collapsed}
//           onToggle={() => setCollapsed(!collapsed)}
//         />
//       </div>

//       {/* Mobile Sidebar */}
//       <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

//       {/* Main Content */}
//       <motion.div
//         animate={{
//           marginLeft:
//             typeof window !== "undefined" && window.innerWidth >= 1024
//               ? collapsed
//                 ? 72
//                 : 256
//               : 0,
//         }}
//         transition={{ duration: 0.2, ease: "easeInOut" }}
//         className="min-h-screen flex flex-col"
//       >
//         <TopNav onMobileMenuToggle={() => setMobileOpen(true)} />
//         <main className="flex-1 p-4 sm:p-6 lg:p-8">
//           <Outlet />
//         </main>
//       </motion.div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";
import MobileSidebar from "./MobileSidebar";
import { motion } from "framer-motion";
import { useIsMobile } from "../../hooks/use-mobile";

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  // Close mobile sidebar when switching to desktop
  useEffect(() => {
    if (!isMobile && mobileOpen) {
      setMobileOpen(false);
    }
  }, [isMobile, mobileOpen]);

  // Load saved collapsed state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved !== null && !isMobile) {
      setCollapsed(JSON.parse(saved));
    }
  }, [isMobile]);

  const handleToggleCollapsed = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsed={collapsed} onToggle={handleToggleCollapsed} />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* Main Content */}
      <div
        className="min-h-screen flex flex-col transition-all duration-200 ease-in-out"
        style={{
          marginLeft:
            !isMobile &&
            typeof window !== "undefined" &&
            window.innerWidth >= 1024
              ? collapsed
                ? "72px"
                : "256px"
              : "0px",
        }}
      >
        <TopNav onMobileMenuToggle={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
