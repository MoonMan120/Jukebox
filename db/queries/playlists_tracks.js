import db from "#db/client";

export async function createdPlaylistsSeed() {
  const SQL = `
    INSERT INTO playlists_tracks (playlist_id, track_id)
    VALUES((SELECT id FROM playlists ORDER BY RANDOM() LIMIT 1),
(SELECT id FROM tracks ORDER BY RANDOM() LIMIT 1)) 
    RETURNING *
    `;
  const result = await db.query(SQL);
  return result.rows;
}

export async function createdPlaylistTracks(playlist_id, track_id) {
  const SQL = `
    INSERT INTO playlists_tracks(playlist_id, track_id)
    VALUES ($1, $2)
    RETURNING *
    `;
  const {
    rows: [playlistTrack],
  } = await db.query(SQL, [playlist_id, track_id]);
  return playlistTrack;
}
