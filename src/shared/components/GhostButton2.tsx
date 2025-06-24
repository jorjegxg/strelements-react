const GhostButton2 = ({
  text,
  onClick,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      className="btn btn-outline btn-primary rounded-full px-6
                  focus:outline-3 text-text-primary"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default GhostButton2;
