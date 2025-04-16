"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

// ✅ Zod Schema for Validation
const profileSchema = z.object({
  profilePicture: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "Please select an image.")
    .refine(
      (files) =>
        ["image/png", "image/jpeg", "image/jpg"].includes(files[0]?.type),
      "Only PNG and JPG images are allowed."
    )
    .refine(
      (files) => files[0]?.size <= 2 * 1024 * 1024,
      "Max file size is 2MB."
    ),
});

const ProfilePictureUpload = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
  });

  // Watch profile picture file
  const file = watch("profilePicture");
  console.log(file);

  // Handle File Change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", e.target.files as FileList);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit Form
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("profilePicture", data.profilePicture[0]);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Profile picture uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">
        Upload Profile Picture
      </h2>

      {/* Image Preview */}
      {preview && (
        <div className="flex justify-center my-4">
          <Image
            src={preview}
            alt="Profile Preview"
            width={120}
            height={120}
            className="rounded-full object-cover border"
          />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          {...register("profilePicture")}
          onChange={handleFileChange}
        />
        {errors.profilePicture && (
          <p className="text-red-500 text-sm">
            {errors.profilePicture.message as string}
          </p>
        )}

        <Button
          type="submit"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Upload
        </Button>
      </form>
    </div>
  );
};

export default ProfilePictureUpload;
