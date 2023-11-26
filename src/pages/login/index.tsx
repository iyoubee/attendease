"use client";
import React, { useState } from "react";
import FooterSmall from "~/components/FooterSmall";
import { useForm } from "@mantine/form";
import { Button, Group, LoadingOverlay, TextInput } from "@mantine/core";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

const Login: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "authenticated") {
    if (session.user.name == "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }

  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "Password must be more than 8 character" : null,
    },
  });

  const handleSubmit = async () => {
    if (form.isValid()) {
      setLoading(true);
      try {
        const res = await signIn("credentials", {
          email: form.values.email,
          password: form.values.password,
          redirect: false,
        });

        if (res?.ok) {
          toast.success("Successfully login!");
        } else {
          toast.error("Error, " + res?.error);
        }
      } catch (error) {
        toast.error("Error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <main>
        <section className="absolute h-full w-full">
          <div className="absolute top-0 h-full w-full bg-gray-900 bg-[url('/register_bg_2.png')] bg-cover bg-no-repeat"></div>
          <div className="container mx-auto h-full px-4">
            <div className="flex h-full content-center items-center justify-center">
              <div className="w-full px-4 lg:w-4/12">
                <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded-lg border-0 bg-gray-300 shadow-lg">
                  <div className="flex-auto px-4 py-10 lg:px-10">
                    <form
                      onSubmit={async (e) => {
                        form.validate();
                        e.preventDefault(); // Prevent the default form submission behavior
                        await handleSubmit();
                      }}
                      className="flex flex-col gap-3"
                    >
                      <LoadingOverlay
                        visible={loading}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                      />
                      <TextInput
                        withAsterisk
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        {...form.getInputProps("email")}
                      />
                      <TextInput
                        withAsterisk
                        label="Password"
                        placeholder="password"
                        type="password"
                        {...form.getInputProps("password")}
                      />

                      <Group justify="flex-end" mt="md">
                        <Button
                          variant="filled"
                          type="submit"
                          className="bg-black"
                        >
                          Submit
                        </Button>
                      </Group>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
};

export default Login;
