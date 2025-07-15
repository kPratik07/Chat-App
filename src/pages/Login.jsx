import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  setPhoneNumber,
  sendOTP,
  verifyOTP,
  setCountryCode,
} from "../features/auth/authSlice";
import CountryDropdown from "../components/CountryDropDown";
import OTPInput from "../components/OtpInput";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const phoneSchema = z.object({
  phone: z.string().min(7, "Phone number is too short"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { countryCode, isOTPSent, isVerified } = useSelector(
    (state) => state.auth
  );
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [userOTP, setUserOTP] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneSchema),
  });

  const onSubmit = (data) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    toast.success(`OTP sent: ${otp}`);
    dispatch(setPhoneNumber(countryCode + data.phone));
    dispatch(sendOTP());

    setTimeout(() => {
      toast.info("Gemini is waiting for your OTP...");
    }, 1000);
  };

  const handleResendOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp);
    toast.success(`OTP resent: ${otp}`);
    dispatch(sendOTP());
    setTimeout(() => {
      toast.info("Gemini is waiting for your OTP...");
    }, 1000);
  };

  const handleVerify = () => {
    if (userOTP === generatedOTP) {
      dispatch(verifyOTP());
      toast.success("OTP Verified! Welcome.");
    } else {
      toast.error("Incorrect OTP");
    }
  };

  // Redirect to dashboard after verification
  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 800); // short delay for user to see the message
      return () => clearTimeout(timer);
    }
  }, [isVerified, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center dark:text-white">
          OTP Login
        </h2>

        {!isOTPSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 dark:text-white">Country Code</label>
              <CountryDropdown
                onChange={(code) => dispatch(setCountryCode(code))}
              />
            </div>
            <div>
              <label className="block mb-1 dark:text-white">Phone Number</label>
              <input
                {...register("phone")}
                className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                placeholder="Enter your phone number"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
            >
              Send OTP
            </button>
          </form>
        ) : !isVerified ? (
          <div className="space-y-4">
            <OTPInput value={userOTP} onChange={setUserOTP} />
            <button
              onClick={handleVerify}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Verify OTP
            </button>
            <button
              type="button"
              onClick={handleResendOTP}
              className="w-full bg-indigo-500 text-white py-2 rounded hover:bg-indigo-700 mt-2"
            >
              Resend OTP
            </button>
          </div>
        ) : (
          <p className="text-green-600 font-medium text-center">
            ✅ You’re verified!
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
