"use client";
import { authState } from "@/atoms/authAtom";
import { profileState } from "@/atoms/profileAtom";
import AdminNavbar from "@/components/admin/Navbar";
import AdminSidebar from "@/components/admin/Sidebar";
import Spinner from "@/components/Spinner";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isAuthenticated } = useRecoilValue(authState);
  const setProfile = useSetRecoilState(profileState);
  const setAuth = useSetRecoilState(authState);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/admin/profile");
        setAuth({
          isAuthenticated: true,
          token: "",
        });

        setProfile(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/em-admin/dashboard");
    }
  }, [isAuthenticated, router]);

  if (loading) return <Spinner />;

  return <>{children}</>;
};

export default DashboardLayout;
