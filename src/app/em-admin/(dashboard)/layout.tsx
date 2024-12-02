"use client";
import { authState } from "@/atoms/authAtom";
import { categoryState } from "@/atoms/categoryAtom";
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
        const { data } = await axiosInstance.get("/user/profile");
        setAuth({
          isAuthenticated: true,
          token: "",
        });

        setProfile(data);
      } catch (error) {
        router.push("/em-admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const setCategories = useSetRecoilState(categoryState);

  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/category/all");

      setCategories(data);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getCategories();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/em-admin/login");
    }
  }, [isAuthenticated, loading]);

  if (loading) return <Spinner />;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <div className="flex flex-col">
        <AdminNavbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
