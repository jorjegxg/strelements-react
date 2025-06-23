function GhostButton({
  text,
  onClick,
}: {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={`btn btn-ghost text- hover:bg-transparent text-text-primary `}
      // style={{ color: colors2.kick, background: colors2.background }}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default GhostButton;
