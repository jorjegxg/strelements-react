function GhostButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={`btn btn-ghost text-[var(--kick)] hover:bg-transparent `}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default GhostButton;
