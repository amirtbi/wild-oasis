import Row from "../ui/Row";
import Heading from "../ui/Heading";
import { UpdateSettings } from "../features/settings/UpdateSettingsForm";

export const SettingsPage = () => {
  return (
    <>
      <Row>
        <Heading type="h1">Update hotel settings</Heading>
        <UpdateSettings />
      </Row>
    </>
  );
};
