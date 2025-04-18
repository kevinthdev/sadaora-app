import { IUser } from "../types";
import Modal from "./lib/Modal";
import NoImage from "../assets/no_image.jpg";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: IUser | null;
}

const UserModal = ({ isOpen, onClose, profile }: UserModalProps) => {
  if (!profile) return null;

  const { name, photo, bio, headline, interests } = profile;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center text-center">
        <img
          src={photo || NoImage}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mb-4 shadow"
        />

        <h2 className="text-xl font-semibold">{name}</h2>
        {headline && <p className="text-sm text-gray-500 mt-1">{headline}</p>}

        {bio && (
          <p className="mt-3 text-gray-700 text-sm leading-relaxed">{bio}</p>
        )}

        {interests && interests.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {interests.split(',')?.map((tag, i) => (
              <span
                key={i}
                className="bg-primary text-gray-800 text-xs px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UserModal;
