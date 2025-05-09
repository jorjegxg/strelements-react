import React from "react";
import { colors2 } from "../../../shared/utils/colors";
import { useCharacterStore } from "../../little_humans/characterStore";
import Character from "../../little_humans/components/Character";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CharacterSettingsModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const setNameBackgroundColor = useCharacterStore(
    (state) => state.setNameBackgroundColor
  );
  const setMessageBackgroundColor = useCharacterStore(
    (state) => state.setMessageBackgroundColor
  );
  const setMessageColor = useCharacterStore((state) => state.setMessageColor);
  const setSize = useCharacterStore((state) => state.setSize);
  const setMessageSize = useCharacterStore((state) => state.setMessageSize);
  const setNameSize = useCharacterStore((state) => state.setNameSize);

  const messageBackgroundColor = useCharacterStore(
    (state) => state.messageBackgroundColor
  );
  const messageColor = useCharacterStore((state) => state.messageColor);
  const nameBackgroundColor = useCharacterStore(
    (state) => state.nameBackgroundColor
  );
  const size = useCharacterStore((state) => state.size);
  const messageSize = useCharacterStore((state) => state.messageSize);
  const nameSize = useCharacterStore((state) => state.nameSize);

  return (
    <>
      <input
        type="checkbox"
        checked={isOpen}
        onChange={onClose}
        className="modal-toggle"
        readOnly
      />

      <div className="modal">
        <div
          className="modal-box max-w-xl space-y-4"
          style={{ background: colors2.secondary }}
        >
          <h3 className="font-bold text-lg">🎨 Character Settings</h3>
          <div className="w-full ring-1 ring-gray-200">
            {Character({
              id: 1,
              name: "Streamer123",
              zIndex: 2,
              x: 300,
              message: "Thanks for the sub!",
              emoji: "🎉",
            })}
          </div>

          <div>
            <label className="label">📛 Name Background Color</label>
            <input
              type="color"
              className="input input-bordered w-full"
              onChange={(e) => setNameBackgroundColor(e.target.value)}
              defaultValue={nameBackgroundColor}
            />
          </div>

          <div>
            <label className="label">💬 Message Background Color</label>
            <input
              type="color"
              className="input input-bordered w-full"
              onChange={(e) => setMessageBackgroundColor(e.target.value)}
              defaultValue={messageBackgroundColor}
            />
          </div>

          <div>
            <label className="label">📝 Message Text Color</label>
            <input
              type="color"
              className="input input-bordered w-full"
              onChange={(e) => setMessageColor(e.target.value)}
              defaultValue={messageColor}
            />
          </div>

          <div>
            <label className="label">🔠 Overall Size (scale)</label>
            <input
              type="range"
              min={0.5}
              max={2}
              step={0.1}
              className="range"
              onChange={(e) => setSize(Number(e.target.value))}
              defaultValue={size}
            />
          </div>

          <div>
            <label className="label">🔤 Message Text Size</label>
            <input
              type="range"
              min={1}
              max={2}
              step={0.1}
              className="range"
              onChange={(e) => setMessageSize(Number(e.target.value))}
              defaultValue={messageSize}
            />
          </div>

          <div>
            <label className="label">👤 Name Text Size</label>
            <input
              type="range"
              min={1}
              max={2}
              step={0.1}
              className="range"
              onChange={(e) => setNameSize(Number(e.target.value))}
              defaultValue={nameSize}
            />
          </div>

          <div className="modal-action">
            <button onClick={onClose} className="btn btn-primary">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CharacterSettingsModal;
