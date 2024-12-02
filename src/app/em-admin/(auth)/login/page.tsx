"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { authState } from "@/atoms/authAtom";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import axiosInstance from "@/utils/axios";
import { profileState } from "@/atoms/profileAtom";
import { Loader2 } from "lucide-react";
import OTP from "./OTP";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false); // To track if OTP was sent
  const [otpVerified, setOtpVerified] = useState(false); // To track if OTP is verified
  const [phoneNumber, setPhoneNumber] = useState(""); // Store phone number after login
  const [otp, setOtp] = useState(""); // Store OTP entered by the user

  const setAuth = useSetRecoilState(authState);
  const setProfile = useSetRecoilState(profileState);
  const router = useRouter();

  // Formik for login form validation
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
      password: Yup.string().required("Password is Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);

        // Send login request to server
        const response = await axiosInstance.post("/user/login", values);
        // const { phoneNumber, message } = response.data;
        const { token, admin } = response.data;

        setProfile(admin);
        sessionStorage.setItem("token", response.data.token);

        // if (phoneNumber) {
        //   setPhoneNumber(phoneNumber); // Store phone number for OTP verification
        //   setOtpSent(true); // OTP was sent successfully
        // }

        router.push("/em-admin/dashboard");
        setLoading(false);
      } catch (error) {
        setError("Login failed: Invalid credentials");
        setLoading(false);
      }
    },
  });

  // Function to handle OTP submission and verification
  const handleOtpSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/user/verify-otp", {
        phoneNumber,
        otp,
      });

      setOtpVerified(true);
      setAuth({ isAuthenticated: true, token: response.data.token });
      setProfile(response.data.admin); // Assuming you get the profile in the response
      sessionStorage.setItem("token", response.data.token);
      router.push("/em-admin/dashboard");

      setLoading(false);
    } catch (error) {
      setError("OTP verification failed");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F0F0F1]">
      <div className="flex flex-col h-screen justify-center container px-4 md:px-6 gap-4">
        <div className="flex justify-center mb-4">
          <Image width={250} height={100} src="/images/logo.webp" alt="logo" />
        </div>

        <Card className="mx-auto w-[400px]">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login</CardTitle>
          </CardHeader>
          <CardContent>
            {!otpSent ? (
              <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      className={
                        formik.touched.email && formik.errors.email
                          ? "border-red-600"
                          : ""
                      }
                      id="email"
                      type="email"
                      {...formik.getFieldProps("email")}
                      placeholder="m@example.com"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-600 text-sm">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <button
                        type="button"
                        className="text-sm text-blue-600 underline"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <Input
                      id="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? "border-red-600"
                          : ""
                      }
                      placeholder="********"
                      type={showPassword ? "text" : "password"}
                      {...formik.getFieldProps("password")}
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-600 text-sm">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <Button disabled={loading} type="submit" className="w-full">
                    {loading ? (
                      <span>
                        <Loader2 className="animate-spin w-4 h-4 mr-2" />{" "}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                    Login
                  </Button>
                </div>
              </form>
            ) : (
              <div className="grid gap-4">
                <Label htmlFor="otp">Enter OTP sent to {phoneNumber}</Label>
                <Input
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
                {error && (
                  <div className="text-red-600 text-sm text-center">
                    {error}
                  </div>
                )}
                <Button
                  disabled={loading || otpVerified}
                  onClick={handleOtpSubmit}
                  className="w-full"
                >
                  {loading ? (
                    <span>
                      <Loader2 className="animate-spin w-4 h-4 mr-2" />{" "}
                    </span>
                  ) : (
                    "Verify OTP"
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
