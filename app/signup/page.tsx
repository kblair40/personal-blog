"use client";

import React, { useState, type FormEvent } from "react";

import { blogData } from "@/oneblog/utils/blogs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signup } from "@/actions/signup";

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    console.log("submit");
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const response = await signup(formData);
    console.log("\nSignup response:", response);
    // const response = await fetch("/api/oneblog/signup", {
    //   method: "POST",
    //   body: formData,
    // });

    // Handle response if necessary
    // const data = await response.json();
    // ...
  }

  return (
    <form onSubmit={handleSubmit}>
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
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
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
          <Button>Signup</Button>
        </section>
      </div>
    </form>
  );
};

export default Signup;
