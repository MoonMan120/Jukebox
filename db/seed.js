import db from "#db/client";
import { faker } from "@faker-js/faker";
import { createPlaylist } from "./queries/playlists.js";
import { createTrack } from "./queries/tracks.js";
import { createdPlaylistTracks } from "./queries/playlists_tracks.js";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // TODO
  for (let i = 0; i < 10; i++) {
    const playlist = await createPlaylist(
      faker.system.fileName(),
      faker.company.catchPhrase()
    );
  }

  for (let a = 0; a < 20; a++) {
    const track = await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 1, max: 7 })
    );
  }
  let number = 0;
  while (number < 15) {
    try {
      const playlists_tracks = await createdPlaylistTracks();
      number++;
    } catch (error) {
      continue;
    }
  }
}
