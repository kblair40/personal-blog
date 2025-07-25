"use client";

import React, { useState, type FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { signup, type SignupInput } from "@/actions/signup";

const Signup = () => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<SignupInput>({
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
    setSaving(true);

    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const result = await signup(formData);
    console.log("\nSignup result:", result);
    if (result) {
      console.log("errors:", result.error);
      if (result.success === false) {
        console.log("Error:", result.error);
        return;
      } else {
        console.log("Success:", result.data);
      }
    }

    setSaving(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="page-wrapper max-w-xs sm:max-w-3xl mx-auto"
    >
      <div className="flex flex-col gap-y-5">
        <section className="flex flex-col gap-y-6 sm:gap-x-6 sm:gap-y-0 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Label className="mb-1" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <Label className="mb-1" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName || ""}
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
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="flex flex-col gap-y-6 sm:gap-x-6 sm:gap-y-0 sm:flex-row">
          <div className="w-full sm:w-1/2">
            <Label className="mb-1" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="w-full sm:w-1/2">
            <Label className="mb-1" htmlFor="confirmPassword">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="w-full sm:w-1/2 mx-auto pt-4">
          <Button disabled={saving} size="lg" className="w-full">
            Signup
          </Button>
        </section>
      </div>
    </form>
  );
};

export default Signup;
