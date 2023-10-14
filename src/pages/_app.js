import DashboardLayout from "@/layout/DashboardLayout";
import GeneralLayout from "@/layout/GeneralLayout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "./login";
const queryClient = new QueryClient();

const App = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    console.log("Logging out");
    setIsLoggedIn(false);
    router.push('/login');
  };
  

  return (
    <QueryClientProvider client={queryClient}>
      {isLoggedIn ? ( 
        <DashboardLayout role="user" handleLogout={handleLogout}>
          <Component {...pageProps} />
        </DashboardLayout>
      ) : (
        <GeneralLayout>
          <Login onLogin={handleLogin} />
        </GeneralLayout>
      )}
    </QueryClientProvider>
  );
};

export default App;
