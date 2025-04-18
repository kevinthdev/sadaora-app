import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import Input from "./Input";
import Modal from "./Modal";
import Button from "./Button";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmModal = ({ onClose, isOpen }: ConfirmModalProps) => {
  const { logout } = useAuth();
  const [str, setStr] = useState("");

  const handleDeactive = async () => {
    await api.delete("users/profile");
    logout();
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <h2 className="font-bold text-2xl mb-3">Delete Account</h2>
      <p className="font-medium text-lg">
        Are you sure you want to delete your account? You will permanently lose
        your account
      </p>
      <p className="text-lg py-2">
        Type <strong>delete account</strong>
      </p>
      <Input
        placeholder="Type delete account"
        onChange={(e) => setStr(e.target.value)}
      />
      <Button onClick={handleDeactive} disabled={str !== "delete account"}>
        Delete
      </Button>
    </Modal>
  );
};

export default ConfirmModal;
