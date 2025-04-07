export interface Movie {
  // Basic movie info (unchanged)
  showId: string;
  type: string;
  title: string;
  director?: string;
  cast?: string;
  country?: string;
  dateAdded?: string;
  releaseYear?: number;
  rating?: string;
  duration?: string;
  listedIn?: string;
  description?: string;

  // Updated genre/category columns (all optional integers)
  action?: number;
  adventure?: number;
  animeSeriesInternationalTvShows?: number;
  britishTvShowsDocuseriesInternationalTvShows?: number;
  children?: number;
  comedies?: number;
  comediesDramasInternationalMovies?: number;
  comediesInternationalMovies?: number;
  comediesRomanticMovies?: number;
  crimeTvShowsDocuseries?: number;
  documentaries?: number;
  documentariesInternationalMovies?: number;
  docuseries?: number;
  dramas?: number;
  dramasInternationalMovies?: number;
  dramasRomanticMovies?: number;
  familyMovies?: number;
  fantasy?: number;
  horrorMovies?: number;
  internationalMoviesThrillers?: number;
  internationalTvShowsRomanticTvShows?: number;
  kidsTV?: number;
  languageTvShows?: number;
  musicals?: number;
  natureTv?: number;
  realityTv?: number;
  spirituality?: number;
  tvAction?: number;
  tvComedies?: number;
  tvDramas?: number;
  talkShowsTvComedies?: number;
  thrillers?: number;
}
