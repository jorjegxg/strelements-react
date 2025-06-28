import CopyableInput from "@/shared/components/CopyableInput";
import GhostButton2 from "@/shared/components/GhostButton2";

export default function DonationsLinkPage() {
  return (
    <div className="md:w-1/2">
      <GhostButton2
        text={"Dessconect from stripe"}
        onClick={() =>
          (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.STRIPE_REDIRECT_URL}&state=dashboard`)
        }
      />
      {/* <GhostButton2
        text={"Connect with stripe"}
        onClick={() =>
          (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.STRIPE_REDIRECT_URL}&state=dashboard`)
        }
      /> */}

      {/* <p className="pt-4">Conect your stripe account to recieve donations</p> */}
      <CopyableInput text="https://strelements.com/donate/nectarian" />
    </div>
  );
}
