"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "./context";
import { Spinner, Center } from "@chakra-ui/react";

export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  allowedRoles?: string[]
) {
  return function WithAuthComponent(props: P) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push("/");
        } else if (allowedRoles && !allowedRoles.includes(user.role)) {
          router.push("/unauthorised");
        }
      }
    }, [user, loading, router]);

    if (loading) {
      return (
        <Center h="100vh">
          <Spinner size="xl" color="blue.500" />
        </Center>
      );
    }

    if (!user) {
      return null;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}
