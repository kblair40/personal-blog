"use client";

import React, { useState } from "react";

import { blogData } from "@/oneblog/utils/blogs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {};

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Signup = (props: Props) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { name, value },
    } = e;
    console.log("change:", { name, value });

    setFormData((cur) => {
      return { ...cur, [name]: value };
    });
  }

  function handleSubmit() {
    console.log("submit");
  }

  return (
    <div className="flex flex-col gap-y-5">
      <section className="flex gap-x-6">
        <div className="w-1/2">
          <Label className="mb-1" htmlFor="firstName">
            First Name
          </Label>
          <Input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="w-1/2">
          <Label className="mb-1" htmlFor="lastName">
            Last Name
          </Label>
          <Input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
      </section>

      <section>
        <div>
          <Label className="mb-1" htmlFor="email">
            Email
          </Label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </div>
      </section>

      <section className="flex gap-x-6">
        <div className="w-1/2">
          <Label className="mb-1" htmlFor="password">
            Password
          </Label>
          <Input
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="w-1/2">
          <Label className="mb-1" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <Input
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
      </section>

      <section className="border w-fit ml-auto">
        <Button onClick={handleSubmit}>
          Signup
        </Button>
      </section>
    </div>
  );
};

export default Signup;
