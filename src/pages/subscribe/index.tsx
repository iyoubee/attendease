import React, { useState } from "react";
import FooterSmall from "~/components/FooterSmall";
import { useForm, isNotEmpty, hasLength } from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  Combobox,
  useCombobox,
  Input,
  InputBase,
  LoadingOverlay,
} from "@mantine/core";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Subscribe: React.FC = () => {
  const { data: session, status } = useSession();

  const router = useRouter();

  if (status == "authenticated") {
    if (session.user.name == "admin") {
      router.replace("/admin");
    } else {
      router.replace("/dashboard");
    }
  }
  const packageList = api.package.getAll.useQuery();
  const register = api.subscribe.create.useMutation({
    onSuccess: async () => {
      const res = await signIn("credentials", {
        email: "admin@" + form.values.email_domain,
        password: form.values.password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Successfully subscribe!");
      } else {
        toast.error("Error, " + res?.error);
      }
    },
    onError: (error) => {
      toast.error("Error, " + error.message);
    },
  });

  const [value, setValue] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      company_name: "",
      email_domain: "",
      package: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      company_name: isNotEmpty("Please input company name."),
      email_domain: isNotEmpty("Please input domain."),
      package: isNotEmpty("Choose package."),
      password: hasLength(
        { min: 8 },
        "Password must be more than 8 characters long",
      ),
    },
  });

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = packageList.data?.map((item) => (
    <Combobox.Option value={item.id} key={item.id}>
      {item.name}, {item.Price}, max user: {item.maxUser}
    </Combobox.Option>
  ));

  const findPackageById = (id: string) => {
    return packageList.data?.find((item) => item.id === id);
  };

  const loading = packageList.isLoading || register.isLoading;
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
                      onSubmit={form.onSubmit((values) =>
                        register.mutate({
                          domain: values.email_domain,
                          name: values.company_name,
                          package: values.package,
                          password: values.password,
                        }),
                      )}
                      className="flex flex-col gap-3"
                    >
                      <LoadingOverlay
                        visible={loading}
                        zIndex={1000}
                        overlayProps={{ radius: "sm", blur: 2 }}
                      />

                      <TextInput
                        withAsterisk
                        label="Company Name"
                        type="text"
                        placeholder="JoCloud Corp"
                        {...form.getInputProps("company_name")}
                      />
                      <TextInput
                        withAsterisk
                        label="Email Domain"
                        type="text"
                        placeholder="aws.com"
                        {...form.getInputProps("email_domain")}
                      />
                      <div>
                        <Input.Label required>Choose Package</Input.Label>
                        <Combobox
                          store={combobox}
                          onOptionSubmit={(val) => {
                            form.setValues({ package: val });
                            setValue(val);
                            combobox.closeDropdown();
                          }}
                          {...form.getInputProps("package")}
                        >
                          <Combobox.Target>
                            <InputBase
                              component="button"
                              pointer
                              rightSection={<Combobox.Chevron />}
                              onClick={() => combobox.toggleDropdown()}
                            >
                              {value ? (
                                findPackageById(value)?.name
                              ) : (
                                <Input.Placeholder>
                                  Pick value
                                </Input.Placeholder>
                              )}
                            </InputBase>
                          </Combobox.Target>

                          <Combobox.Dropdown>
                            <Combobox.Options>{options}</Combobox.Options>
                          </Combobox.Dropdown>
                        </Combobox>
                      </div>

                      <TextInput
                        withAsterisk
                        type="password"
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

export default Subscribe;
