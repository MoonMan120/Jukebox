import express from "express";
const router = express.Router();
export default router;

import {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
} from "#db/queries/playlists";
import { pl } from "@faker-js/faker";

router
  .route("/")
  .get(async (req, res) => {
    const playlists = await getPlaylists();
    res.send(playlists);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body is required.");

    const { name, description } = req.body;
    if (!name || !description)
      return res
        .status(400)
        .send("Request body requires a name, and description");

    const playlist = await createPlaylist(name, description);
    res.status(201).send(playlist);
  });

router.route("/:id").get(async (req, res) => {
  const playlist = await getPlaylistById(req.params.id);
  if (!playlist) return res.status(400).send("Playlist not found.");
  res.send(playlist);
});
