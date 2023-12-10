"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { useForm, isNotEmpty } from "@mantine/form";
import toast from "react-hot-toast";
import { LoadingOverlay, TextInput, Group, Button } from "@mantine/core";

const AdminCreateUser: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "unauthenticated") {
    router.replace("/");
  }

  if (status == "authenticated") {
    if (session.user.role != "admin") {
      router.replace("/");
    }
  }

  const registerUser = api.admin.createUser.useMutation({
    onSuccess: (res) => {
      router.replace("/admin");
      toast.success("Success Create User with password, " + res);
    },
    onError: (error) => {
      toast.error("Error," + error.message);
    },
  });

  const form = useForm({
    initialValues: {
      username: "",
      termsOfService: false,
    },

    validate: {
      username: isNotEmpty("Please input username."),
    },
  });

  const loading = registerUser.isLoading || session != null;

  console.log(session?.user.email?.split("@")[1]);
  return (
    <>
      <main>
        <section className="flex h-screen w-full items-center justify-center bg-red-300">
          {session != null ? (
            <form
              onSubmit={form.onSubmit((values) => {
                registerUser.mutate({
                  name: values.username,
                  email:
                    values.username + "@" + session?.user.email?.split("@")[1],
                  companyId: session.user.companyId!,
                });
              })}
            >
              <TextInput
                withAsterisk
                label="Username"
                type="text"
                placeholder="Foo"
                {...form.getInputProps("username")}
              />
              <Group justify="flex-end" mt="md">
                <Button variant="filled" type="submit" className="bg-black">
                  Submit
                </Button>
              </Group>
            </form>
          ) : (
            <>
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default AdminCreateUser;
