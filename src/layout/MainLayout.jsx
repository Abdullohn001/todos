import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="bg-base-300 border w-full md:w-[1500px] bg-[url('./assets/photo_2024.jpg')] h-full mx-auto min-h-[963px] rounded-lg container ">
      <main className="px-10 w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
