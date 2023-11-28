"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { Button, Table } from "@mantine/core";

const AdminShowUser: React.FC = () => {
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
  
  const getAllUser = api.admin.getAllUser.useQuery({
    companyId: session?.user.companyId != null ? session.user.companyId : "",
  })

  const deleteUser = api.admin.deleteUser.useMutation({
    onSuccess: (res) => {
      toast.success("Success Delete User with name, " + res.name)
    },
    onError: (error) => {
        toast.error("Error," + error.message)
    }
  })

  const listUser = () => {

    if (getAllUser.data != null){
    const rows = getAllUser?.data.map((element) => (
        <Table.Tr key={element.id}>
          <Table.Td>{element.name}</Table.Td>
          <Table.Td>{element.email}</Table.Td>
          <Table.Td>
            <Button onClick={() => { 
              deleteUser.mutate({
                userId: element.id,
              })
              getAllUser.refetch
            }}>
              Delete User
            </Button>
          </Table.Td>
        </Table.Tr>
      ));
      return rows
  }
    return;
  }

  console.log(getAllUser.data)
  return (
    <>
      <main>
        <section className="flex h-screen w-full items-center justify-center bg-red-300">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Delete User</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{listUser()}</Table.Tbody>
          </Table>
        </section>
      </main>
    </>
  );
};

export default AdminShowUser;
