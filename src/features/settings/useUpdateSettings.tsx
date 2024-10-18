import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { updateSettingType } from "./settings.model";
import toast from "react-hot-toast";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { mutate: onUpdateSetting, error } = useMutation({
    mutationFn: (data: { settings: updateSettingType }) =>
      updateSetting(data.settings),
    onSuccess: () => {
      toast.success("Settings updated!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: () => {
      toast.error("Updating failed!");
    },
  });

  if (error) {
    throw new Error("Error happened during updating settings");
  }

  return {
    onUpdateSetting,
  };
};
