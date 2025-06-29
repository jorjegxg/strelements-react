import CopyableInput from "@/shared/components/CopyableInput";
import GhostButton2 from "@/shared/components/GhostButton2";

export default function DonationsLinkPage(
  isLoading: boolean,
  connection: boolean
) {
  return (
    <div className="md:w-fullflex items-center justify-center ">
      <div className="w-full">
        mama
        {isLoading ? (
          <div>
            <span className="loading loading-spinner loading-xl text-text-primary"></span>
            <div>
              <p>Checking connection...</p>
            </div>
          </div>
        ) : connection ? (
          <div>
            <GhostButton2
              text={"Dissconect from stripe"}
              onClick={() =>
                (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.STRIPE_REDIRECT_URL}&state=dashboard`)
              }
            />
            <CopyableInput text="https://strelements.com/donate/nectarian" />
          </div>
        ) : (
          <div>
            <GhostButton2
              text={"Connect with stripe"}
              onClick={() =>
                (window.location.href = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.STRIPE_REDIRECT_URL}&state=dashboard`)
              }
            />

            <p className="pt-4">
              Conect your stripe account to recieve donations
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
