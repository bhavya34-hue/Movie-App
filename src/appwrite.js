import { Client, ID, Query, TablesDB } from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

const tables = new TablesDB(client);
export { client };

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    const result = await tables.listRows(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.rows.length > 0) {
      const row = result.rows[0];

      await tables.updateRow(DATABASE_ID, COLLECTION_ID, row.$id, {
        count: row.count + 1,
      });
    } else {
    //   await tables.createRow(DATABASE_ID, COLLECTION_ID, ID.unique(), {
    //     searchTerm,
    //     count: 1,
    //     movie_id: movie.id,
    //     poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    //   });
    await tables.createRow(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,               // ADD THIS
        release_date: movie.release_date // optional
});

    }
  } catch (error) {
    console.error(error);
  }
  console.log("Updating search count for:", searchTerm);
  console.log("Movie used:", movie);

};

// GET TRENDING MOVIES
// export const getTrendingMovies = async () => {
//   try {
//     const result = await tables.listRows(DATABASE_ID, COLLECTION_ID, [
//       Query.limit(5),
//       Query.orderDesc("count"),
//     ]);
//     console.log("Fetched trending rows:", result);

//     return result.rows; // Use rows!
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
  
// };

// appwrite.js

// export const getTrendingMovies = async () => {
//   try {
//     const res = await fetch(
//       `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
//     );

//     const data = await res.json();
//     console.log("Movie List:", data.results); // add here

//     return data.results || [];
//   } catch (error) {
//     console.error("TMDB Error:", error);
//     return [];
//   }
// };

export const getTrendingMovies = async () => {
  try {
    const result = await tables.listRows(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5)
    ]);

    console.log("Trending from Appwrite:", result.rows);

    return result.rows;       // IMPORTANT
  } catch (error) {
    console.error(error);
    return [];
  }
};

