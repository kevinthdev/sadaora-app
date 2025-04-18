import { useEffect, useState } from "react";
import api from "../api/axios";
import { IUser } from "../types";

export const useProfiles = (initialPage: number = 1) => {
  const [profiles, setProfiles] = useState<IUser[]>([]);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchProfiles = (page: number, search: string = "") => {
    setLoading(true);
    api.get(`users/public-feed?page=${page}&search=${search}`).then((res) => {
      setProfiles(res.data.feed);
      setTotal(res.data.total);
      setLoading(false);
    }).catch(err => {
      setLoading(false);
      console.log("Error: Fetching profiles")
    });
  };

  useEffect(() => {
    fetchProfiles(page);
  }, [page]);

  return {
    profiles,
    setProfiles,
    loading,
    total,
    page,
    setPage,
    fetchProfiles,
  };
};
