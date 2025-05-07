import { MoreOutlined } from "@ant-design/icons";
import { colors2 } from "../../../shared/utils/colors";

const IconButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      className="btn btn-ghost bg-transparent flex items-center p-4"
      style={{ color: colors2.text }}
      onClick={onClick}
    >
      <MoreOutlined />
    </button>
  );
};

export default IconButton;
