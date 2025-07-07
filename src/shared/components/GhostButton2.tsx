import { MySpinner } from "./Spinner";

const GhostButton2 = ({
  text,
  onClick,
  isLoading = false,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
}) => {
  return (
    <button
      disabled={isLoading}
      className="btn btn-outline btn-primary rounded-full px-6
                  focus:outline-3 text-text-primary"
      onClick={onClick}
    >
      {isLoading ? <MySpinner /> : text}
    </button>
  );
};

export default GhostButton2;
