import { Outlet } from "react-router-dom";
import DarkModeToggle from "../components/DarkModeToggle";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors">
      <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow">
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Gemini Chat
        </h1>
        <DarkModeToggle />
      </header>

      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
