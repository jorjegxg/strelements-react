import Layout from "../layout/Layout";

const FrontPage = () => {
  // const status = useAppAuthStore((state) => state.status);
  // const setStatus = useAppAuthStore((state) => state.setStatus);

  // useEffect(() => {
  //   if (status.name === "error") {
  //     toast.error(status.message);
  //     setStatus("idle", "");
  //   } else if (status.name === "success") {
  //     toast.success(status.message);
  //     setStatus("idle", "");
  //   }
  // }, [status]);

  return (
    <Layout>
      <p>Click the button below to go to the game.</p>
    </Layout>
  );
};

export default FrontPage;
