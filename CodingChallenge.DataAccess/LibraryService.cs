using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using CodingChallenge.DataAccess.Interfaces;
using CodingChallenge.DataAccess.Models;
using CodingChallenge.Utilities;

namespace CodingChallenge.DataAccess
{
    public class LibraryService : ILibraryService
    {
        public LibraryService() { }

        private IEnumerable<Movie> GetMovies()
        {
            return _movies ?? (_movies = ConfigurationManager.AppSettings["LibraryPath"].FromFileInExecutingDirectory().DeserializeFromXml<Library>().Movies);
        }
        private IEnumerable<Movie> _movies { get; set; }

        public int SearchMoviesCount(string title)
        {
            return SearchMovies(title).Count();
        }

        public IEnumerable<Movie> SearchMovies(string title, int? skip = null, int? take = null,
            string sortColumn = null, SortDirection sortDirection = SortDirection.Ascending)
        {
            var movies = GetMovies().Where(s => s.Title.Contains(title));
            switch (sortColumn)
            {
                case "ID":
                    movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.ID) : movies.OrderByDescending(m => m.ID);
                    break;
                case "Rating":
                    movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.Rating) : movies.OrderByDescending(m => m.Rating);
                    break;
                case "Year":
                    movies = sortDirection == SortDirection.Ascending ? movies.OrderBy(m => m.Year) : movies.OrderByDescending(m => m.Year);
                    break;
                case "Title":
                    movies = sortDirection == SortDirection.Ascending ?
                                        movies.OrderBy(m => replaceTitle(m.Title)) :
                                        movies.OrderByDescending(m => replaceTitle(m.Title));
                    break;
            }
            if (skip.HasValue && take.HasValue)
            {
                movies = movies.Skip(skip.Value).Take(take.Value);
            }
            return new HashSet<Movie>(movies).ToList();
        }

        private string replaceTitle(string Title)
        {
            return Title.StartsWith("A ", StringComparison.OrdinalIgnoreCase)
                    || Title.StartsWith("An ", StringComparison.OrdinalIgnoreCase)
                    || Title.StartsWith("The ", StringComparison.OrdinalIgnoreCase) ?
                    Title.Substring(Title.IndexOf(" ") + 1) : Title;
        }
    }

}
