import { CONFIG } from "@/shared/utils/constants";
import axios from "axios";
import { useEffect } from "react";

const StripeCallbackPage = () => {
  useEffect(() => {
    const check = async () => {
      const app_user_id: number = Number(
        localStorage.getItem(CONFIG.localStorage.appUserId)
      );

      //get fron url
      const url = new URL(window.location.href);
      const code = url.searchParams.get("code")!;

      axios.get(`${process.env.BACKEND_URL}/stripe/callback`, {
        params: {
          code: code,
          app_user_id: app_user_id,
        },
      });
    };
    check().then(() => {
      window.location.href = "/dashboard";
    });
  });
  return <div>StripeCallback</div>;
};

export default StripeCallbackPage;
