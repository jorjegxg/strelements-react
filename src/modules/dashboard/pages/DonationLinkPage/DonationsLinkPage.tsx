import CopyableInput from "@/shared/components/CopyableInput";
import GhostButton2 from "@/shared/components/GhostButton2";
import { useEffect } from "react";
import { useStripeStore } from "./stripeStore";

export default function DonationsLinkPage() {
  // Hook-urile din Zustand ar trebui extrase doar o dată per componentă.
  // Le poți extrage aici pentru a fi disponibile în `DashboardPage`
  // dar le vei pasa ca props-uri unde este necesar.
  const isLoading = useStripeStore((state) => state.isLoading);
  const connection = useStripeStore((state) => state.connection);
  const getConnectionState = useStripeStore(
    (state) => state.getConnectionState
  );
  const disconnectFromStripe = useStripeStore(
    (state) => state.disconnectFromStripe
  );

  // Acest useEffect este corect aici, la nivelul superior al componentei DashboardPage
  useEffect(() => {
    getConnectionState();
  }, [getConnectionState]); // Adaugă getConnectionState la dependențe pentru linter, deși nu se va schimba

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
              // onClick={() => disconnectFromStripe()}
              onClick={async () => {
                disconnectFromStripe();
              }}
            />
            <CopyableInput text="http://localhost:5173/donate/nectarian" />
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
