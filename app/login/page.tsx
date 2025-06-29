"use client";

import React, { useState, type FormEvent } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { login, type LoginInput } from "@/actions/login";

const Login = () => {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
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
    const result = await login(formData);
    console.log("\nLogin result:", result);
    console.log("errors:", result.error);
    if (result.success === false) {
      console.log("Error:", result.error);
      return;
    } else {
      console.log("Success:", result.data);
    }

    setSaving(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-y-5">
        <section className="flex gap-x-6">
          <div className="w-1/2">
            <Label className="mb-1" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

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
        </section>

        <section className="w-1/2 mx-auto pt-4">
          <Button disabled={saving} size="lg" className="w-full">
            Login
          </Button>
        </section>
      </div>
    </form>
  );
};

export default Login;
