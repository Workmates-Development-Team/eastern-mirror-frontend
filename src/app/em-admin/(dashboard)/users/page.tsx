"use client";
import { profileState } from "@/atoms/profileAtom";
import ChangePassword from "@/components/admin/ChangePassword";
import CreateUser from "@/components/admin/CreateUser";
import EditUser from "@/components/admin/EditUser";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axiosInstance from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

interface UserInterface {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  phoneNumber: string;
}

export default function UserPage() {
  const profile = useRecoilValue(profileState);

  const router = useRouter();
  const getUsers = async (): Promise<UserInterface[]> => {
    const { data } = await axiosInstance.get("/user/all");
    return data;
  };

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 300000,
  });

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (profile.userType !== "admin" && profile.userType !== "editor") {
      router.push("/em-admin/dashboard");
    }
  }, [profile.userType, router]);

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (isConfirmed) {
      try {
        await axiosInstance.delete("/user/" + id);
        refetch();
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl text-[#464255]">
            All User
          </h1>
          <p className="text-[#A3A3A3]">Manage and view all user.</p>
        </div>

        <div>
          <CreateUser refetch={refetch} />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[150px]">First Name</TableHead>
            <TableHead className="min-w-[150px]">Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={String(user._id)}>
              <TableCell className="font-medium capitalize">
                {user.firstName}
              </TableCell>
              <TableCell className="font-medium capitalize">
                {user.lastName}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell className="capitalize">{user.userType}</TableCell>
              <TableCell className="flex gap-2 justify-end">
                {profile?.userType === "admin" ||
                (profile?.userType === "editor" &&
                  user.userType === "publisher") ? (
                  <ChangePassword refetch={refetch} id={user._id} />
                ) : null}

                {profile?.userType === "admin" ? (
                  <>
                    <EditUser user={user} refetch={refetch} />

                    <Button
                      onClick={() => handleDelete(user._id)}
                      size="icon"
                      variant="destructive"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
