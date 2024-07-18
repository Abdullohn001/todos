import { Outlet } from "react-router-dom";
import { Navbar } from "../components";

function MainLayout() {
  return (
    <div className="bg-base-300 h-full py-1">
      <header className="m-2 mb-10 sticky top-0 z-20 shadow-lg rounded-2xl">
        {" "}
        <Navbar />
      </header>

      <main className="px-10 h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
