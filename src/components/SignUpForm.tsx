"use client";
import { countries } from "countries-list";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { qualifications, skills } from "@/lib/constants";
import { Textarea } from "./ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Email is required.",
  }),
  phoneNumber: z.string().optional(),
  role: z.enum(["jobseeker", "employer"]),
  bio: z
    .string()
    .max(160, {
      message: "Bio must not be longer than 160 characters.",
    })
    .optional(),
  location: z.string(),
  qualifications: z.array(z.string()),
  skills: z.array(z.string()),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  experience: z.array(
    z.object({
      jobTitle: z.string().min(1, "Job title is required"),
      company: z.string().min(1, "Company name is required"),
      location: z.string().min(1, "Location is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().nullable(),
      description: z
        .string()
        .max(1000, "Description must be under 1000 characters"),
    })
  ),
  socialLinks: z.object({
    linkedIn: z.string().url().optional(),
    github: z.string().url().optional(),
    portfolio: z.string().url().optional(),
  }),
});

const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      bio: "",
      password: "",
      experience: [
        {
          jobTitle: "",
          company: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      socialLinks: {
        linkedIn: "",
        github: "",
        portfolio: "",
      },
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          fullName: values.fullName,
          email: values.email,
          password: values.password,
          role: values.role,
          phoneNumber: values.phoneNumber,
          bio: values.bio,
          location: values.location,
          qualifications: values.qualifications,
          skills: values.skills,
          experience: values.experience,
          socialLinks: values.socialLinks,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 201) {
        toast.success("User registered successfully!");
        router.push("/sign-in");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Information Section */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Personal Information
            </h3>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mb-4 rounded-full"></div>
          </div>
        </div>

        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="John Doe"
                  className="border-gray-300 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@email.com"
                  className="border-gray-300 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1 234 567 8900"
                  className="border-gray-300 focus:border-blue-500"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="jobseeker">Jobseeker</SelectItem>
                  <SelectItem value="employer">Employer</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Location */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-700">Location</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="Choose your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-60">
                  {Object.values(countries).map((country) => (
                    <SelectItem key={country.name} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-700">Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none border-gray-300 focus:border-blue-500 min-h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Professional Details Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Professional Details
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mb-4 rounded-full"></div>
        </div>

        {/* Qualifications */}
        <FormField
          control={form.control}
          name="qualifications"
          render={({ field }) => {
            const selectedValues = field.value || [];

            const handleSelect = (value: string) => {
              const newSelected = selectedValues.includes(value)
                ? selectedValues.filter((item) => item !== value)
                : [...selectedValues, value];

              field.onChange(newSelected);
            };

            return (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-700">Qualifications</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-gray-300 hover:bg-gray-50"
                    >
                      {selectedValues.length > 0
                        ? `${selectedValues.length} selected`
                        : "Select Qualifications"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-2 max-h-60 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                      {qualifications.map((qualification) => (
                        <div
                          key={qualification}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                        >
                          <Checkbox
                            id={qualification}
                            checked={selectedValues.includes(qualification)}
                            onCheckedChange={() => handleSelect(qualification)}
                          />
                          <label
                            htmlFor={qualification}
                            className="cursor-pointer text-sm"
                          >
                            {qualification}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedValues.length > 0 && (
                      <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                        <span className="text-sm text-gray-600">
                          {selectedValues.length} selected
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => field.onChange([])}
                        >
                          Clear all
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        {/* Skills */}
        <FormField
          control={form.control}
          name="skills"
          render={({ field }) => {
            const selectedValues = Array.isArray(field.value)
              ? field.value
              : [];

            const handleSelect = (skill: string) => {
              const newSelected = selectedValues.includes(skill)
                ? selectedValues.filter((item) => item !== skill)
                : [...selectedValues, skill];

              field.onChange(newSelected);
            };

            return (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-gray-700">Skills</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between border-gray-300 hover:bg-gray-50"
                    >
                      {selectedValues.length > 0
                        ? `${selectedValues.length} selected`
                        : "Select Skills"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="p-2 max-h-60 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-2">
                      {skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
                        >
                          <Checkbox
                            id={skill}
                            checked={selectedValues.includes(skill)}
                            onCheckedChange={() => handleSelect(skill)}
                          />
                          <label
                            htmlFor={skill}
                            className="cursor-pointer text-sm"
                          >
                            {skill}
                          </label>
                        </div>
                      ))}
                    </div>
                    {selectedValues.length > 0 && (
                      <div className="border-t p-2 flex justify-between items-center bg-gray-50">
                        <span className="text-sm text-gray-600">
                          {selectedValues.length} selected
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => field.onChange([])}
                        >
                          Clear all
                        </Button>
                      </div>
                    )}
                  </PopoverContent>
                </Popover>
                <FormMessage className="text-red-500" />
              </FormItem>
            );
          }}
        />

        {/* Experience Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Work Experience
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mb-4 rounded-full"></div>
        </div>

        {/* Experience Fields */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="md:col-span-2 space-y-4 border border-gray-200 p-5 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-gray-700">
                Experience {index + 1}
              </h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Remove
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`experience.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Software Engineer"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`experience.${index}.company`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Company</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Acme Inc."
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`experience.${index}.location`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="San Francisco, CA"
                        className="border-gray-300 focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-1">
                {/* Start Date */}
                <FormField
                  control={form.control}
                  name={`experience.${index}.startDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-300 hover:bg-gray-50"
                          >
                            {field.value
                              ? format(new Date(field.value), "MMM yyyy")
                              : "Pick a date"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString() ?? "")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* End Date */}
                <FormField
                  control={form.control}
                  name={`experience.${index}.endDate`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between border-gray-300 hover:bg-gray-50"
                          >
                            {field.value
                              ? format(new Date(field.value), "MMM yyyy")
                              : "Present"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 ml-2"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) =>
                              field.onChange(date?.toISOString() ?? "")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={`experience.${index}.description`}
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel className="text-gray-700">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements"
                        className="resize-none border-gray-300 focus:border-blue-500 min-h-24"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        <div className="md:col-span-2">
          <Button
            type="button"
            onClick={() =>
              append({
                jobTitle: "",
                company: "",
                location: "",
                startDate: "",
                endDate: "",
                description: "",
              })
            }
            className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100"
            variant="outline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Experience
          </Button>
        </div>

        {/* Social Links Section */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            Social Links
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 mb-4 rounded-full"></div>
        </div>

        <FormField
          control={form.control}
          name="socialLinks.linkedIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">LinkedIn</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    placeholder="https://linkedin.com/in/your-profile"
                    className="pl-10 border-gray-300 focus:border-blue-500"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialLinks.github"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">GitHub</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Input
                    placeholder="https://github.com/your-profile"
                    className="pl-10 border-gray-300 focus:border-blue-500"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="socialLinks.portfolio"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-gray-700">Portfolio</FormLabel>
              <FormControl>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm6.2 4.2L8.9 11.5 5.8 8.4a1 1 0 0 0-1.4 1.4l4 4a1 1 0 0 0 1.4 0l8-8a1 1 0 0 0-1.4-1.4z" />
                    </svg>
                  </div>
                  <Input
                    placeholder="https://your-portfolio.com"
                    className="pl-10 border-gray-300 focus:border-blue-500"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4 pt-4">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignUpForm;
