import { useState } from "react";
import { useProfiles } from "../hooks/useProfiles";
import { IUser } from "../types";
import NoImage from "../assets/no_image.jpg";
import UserModal from "../components/UserModal";
import Pagination from "../components/lib/Pagination";
import Input from "../components/lib/Input";

const Feed = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [search, setSearch] = useState("");

  const { profiles, loading, total, page, setPage, fetchProfiles } =
    useProfiles();

  const handleOpenUserModal = (profile: IUser) => {
    setProfile(profile);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    fetchProfiles(page, value);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <Input placeholder="Search" onChange={handleChange} value={search} />
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No profiles found.
        </div>
      ) : (
        <>
          <Pagination setPage={setPage} page={page} total={total} />
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="border rounded-lg p-4 mb-6 shadow-sm hover:shadow-md transition cursor-pointer"
              onClick={() => handleOpenUserModal(profile)}
            >
              <div className="flex gap-4 items-start">
                <img
                  src={profile.photo || NoImage}
                  alt={profile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold">{profile.name}</h2>
                  <p className="text-sm text-gray-600 italic">
                    {profile.headline}
                  </p>
                  <p className="mt-2 text-gray-700 truncate max-w-48 md:max-w-md">
                    {profile.bio}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {profile.interests?.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-primary text-gray-800 text-xs px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
      <Pagination setPage={setPage} page={page} total={total} />
      <UserModal
        isOpen={isOpen}
        profile={profile}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default Feed;
