import { useEffect } from "react";

const StripeCallback = () => {
  useEffect(() => {
    //get fron url
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    console.log("eadfe");

    fetch(`${process.env.BACKEND_URL}/stripe/callback`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: code, state: state }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
  return <div>StripeCallback</div>;
};

export default StripeCallback;
