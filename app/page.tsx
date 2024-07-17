"use client";
import { useState } from "react";
import axios from "axios";
import InputForm from "@/components/custom/InputForm";
import usePostStore from "@/store/store";
import GeneratedPost from "@/components/custom/GeneratedPost";
const Homepage = () => {
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-4 px-7 gap-3 md:gap-24 py-12">
      <InputForm />
      <GeneratedPost />
    </div>
  );
};

export default Homepage;
