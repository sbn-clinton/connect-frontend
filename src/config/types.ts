import { z } from "zod";

export const jobSchema = z.object({
  _id : z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  company: z.string().min(2, "Company name is required"),
  location: z.string().min(2, "Location is required"),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Freelance"]),
  employmentMode: z.enum(["Remote", "On-site", "Hybrid"]),
  description: z.string().min(10, "Description must be at least 10 characters"),
  responsibilities: z.array(z.string().min(3)).min(1, "At least one responsibility is required"),
  requirements: z.array(z.string().min(3)).min(1, "At least one requirement is required"),
  benefits: z.array(z.string().min(3)).optional(),
  status: z.enum(["Open", "Closed"]).default("Open"),
});



// export type Job = {
//   _id: string;
//   title: string;
//   company: string;
//   location: string;
//   description: string;
//   requirements: string[];
//   salary: string;
//   postedBy: {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//   };
//   applications: {
//     _id: string;
//     user: {
//       _id: string;
//       name: string;
//       email: string;
//       role: string;
//     };
//     job: {
//       _id: string;
//       title: string;
//       company: string;
//       location: string;
//       description: string;
//       requirements: string[];
//       salary: string;
//       postedBy: {
//         _id: string;
//         name: string;
//         email: string;
//         role: string;
//       };
//     };
//     resume: string;
//     coverLetter: string;
//     status: string;
//     appliedAt: Date;
//   }[];
// };

export type User = {
  _id: string;
 fullName: string;
 email: string;
 role: string;
 phoneNumber: string;
 bio: string;
 location: string;
 qualifications: string[];
 skills: string[];
 experience: Experience;
 socialLinks: {
   linkedIn: string;
   github: string;
   portfolio: string;
 };
 profilePicture: {
   fileName: string;
   fileType: string;
   fileSize: string;
   fileData: Buffer;
 };
 notifications: {
   message: string;
   type: string;
   read: boolean;
   createdAt: Date;
 }[];
 jobs: {
   _id: string;
   title: string;
   company: string;
   location: string;
   description: string;
   requirements: string[];
   salary: string;
   postedBy: {
     _id: string;
     name: string;
     email: string;
     role: string;
   };
 }[];
 applications: {
   _id: string;
   user: {
     _id: string;
     name: string;
     email: string;
     role: string;
   };
   job: {
     _id: string;
     title: string;
     company: string;
     location: string;
     description: string;
     requirements: string[];
     salary: string;
     postedBy: {
       _id: string;
       name: string;
       email: string;
       role: string;
     };
   };
   resume: string;
   coverLetter: string;
   status: string;
   appliedAt: Date;
 }[];
    
};

export type Job = {
  _id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  jobType: 'Full-Time' | 'Part-Time' | 'Freelance' | 'Contract' | string;
  employmentMode: 'Onsite' | 'Remote' | 'Hybrid' | string;
  benefits: string[];
  requirements: string[];
  responsibilities: string[];
  status: 'Open' | 'Closed' | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applications: any[]; // you can replace `any` with a specific type if available
  postedBy: {
    _id: string;
    email: string;
  };
  createdAt: string; // or Date if parsed
  updatedAt: string; // or Date if parsed
  __v: number;
};


export type Application = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    salary: string;
    postedBy: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  };
  resume: string;
  coverLetter: string;
  status: string;
  appliedAt: Date;
};

export type Experience = [{
  title: string;
  company: string;
  description: string;
  years: number;
}]


export type Skill = {
  _id: string;
  name: string;
  level: number;
};

export type Qualification = {
  _id: string;
  name: string;
  level: number;
};

export type SocialLink = {
  _id: string;
  linkedIn: string;
  github: string;
  portfolio: string;
};

export type ProfilePicture = {
  _id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  fileData: Buffer;
};