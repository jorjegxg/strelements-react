import { create } from "zustand";
import { api } from "../../shared/utils/autoRefresh";
import { CONFIG } from "../../shared/utils/constants";
import { channelSchema } from "../../shared/utils/schemas";

interface Dashboard {
  isLive: boolean;
  setIsLive: (isLive: boolean) => void;
  getIsLive: () => Promise<void>;
}

const useDasboardStore = create<Dashboard>((set) => ({
  isLive: false,
  setIsLive: (isLive) => set((state) => ({ ...state, isLive })),
  getIsLive: async () => {
    try {
      const url = `${process.env.BACKEND_URL}/kick/channel`;
      const response = await api.get(url, {
        headers: {
          Authorization: `${localStorage.getItem(
            CONFIG.localStorage.kickAcessToken
          )}`,
        },
      });

      const parsedChannelInfo = channelSchema.parse(response.data);

      const isLive = parsedChannelInfo.data[0].stream.is_live;

      console.log(isLive);

      set({ isLive: isLive });
    } catch {
      set({ isLive: false });
    }
  },
}));

export { Dashboard, useDasboardStore };
