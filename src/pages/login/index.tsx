import React from "react";
import FooterSmall from "~/components/FooterSmall";
import { useForm } from "@mantine/form";
import { Button, Group, TextInput } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
                      onSubmit={form.onSubmit((values) => console.log(values))}
                      className="flex flex-col gap-3"
                    >
                      <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        {...form.getInputProps("email")}
                      />
                      <TextInput
                        withAsterisk
                        label="Password"
                        placeholder="password"
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
