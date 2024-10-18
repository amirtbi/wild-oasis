import { useQuery } from "@tanstack/react-query";
import Row from "../ui/Row";
import { getSettings } from "../services/apiSettings";
import Spinner from "../ui/Spinner";
import Heading from "../ui/Heading";
import { UpdateSettingsForm } from "../features/settings/UpdateSettingsForm";

export const SettingsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  if (isLoading) {
    return <Spinner />;
  }
  console.log("data", data);
  return (
    <>
      <Row>
        <Heading type="h1">Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </>
  );
};
