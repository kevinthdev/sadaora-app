import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { IProfile } from "../types";
import NoImage from "../assets/no_image.jpg";
import Input from "../components/lib/Input";
import { toBase64 } from "../utils";
import Button from "../components/lib/Button";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [form, setForm] = useState<IProfile>();

  useEffect(() => {
    if (user) {
      setForm({
        name: user?.name || "",
        bio: user?.bio || "",
        headline: user?.headline || "",
        photo: user?.photo || "",
        interests: user?.interests || "",
      });
      setPreviewUrl(user?.photo || null);
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const base64 = await toBase64(file);
      setForm({ ...form, photo: base64 });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.put("/users/profile", form);
    if (res.data) {
      setUser({ ...res.data.profile });
      setPreviewUrl(res.data.profile.photo);
    }
    alert("Profile updated");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-5 py-10 max-w-lg mx-auto flex flex-col items-center"
    >
      <div className="w-32 h-32 relative mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          className="absolute opacity-0 w-32 h-32 left-0 top-0 cursor-pointer"
        />
        {
          <img
            src={previewUrl || NoImage}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        }
      </div>
      <Input
        name="name"
        value={form?.name || ""}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <Input
        name="headline"
        value={form?.headline || ""}
        onChange={handleChange}
        placeholder="Headline"
      />
      <textarea
        name="bio"
        value={form?.bio}
        onChange={handleChange}
        rows={3}
        placeholder="Bio"
        className="w-full px-4 py-2 my-2 rounded shadow-sm border border-yellow-200 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition"
      />
      <Input
        name="interests"
        value={form?.interests || ""}
        onChange={handleChange}
        placeholder="Interests (comma-separated)"
      />
      <div className="flex flex-wrap gap-2 w-full">
        {form?.interests &&
          form.interests?.split(",").map((tag, idx) =>
            tag.trim() !== "" ? (
              <span
                key={idx}
                className="px-2 py-1 bg-primary text-black-700 rounded text-sm"
              >
                {tag}
              </span>
            ) : null
          )}
      </div>
      <Button type="submit" disabled={!form?.name}>
        Save
      </Button>
    </form>
  );
};

export default Profile;
