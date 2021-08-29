using CodingChallenge.DataAccess.Interfaces;
using System.Web.Http;

namespace CodingChallenge.UI.Controllers
{
    [RoutePrefix("api/movieLibrary")]
    public class MovieLibraryController : ApiController
    {
        public ILibraryService LibraryService { get; private set; }

        public MovieLibraryController() { }

        public MovieLibraryController(ILibraryService libraryService)
        {
            LibraryService = libraryService;
        }

        [HttpGet]
        [Route("getAllMovies")]
        public IHttpActionResult GetAllMovies()
        {
            return Ok(LibraryService.SearchMovies(""));
        }

        [HttpGet]
        [Route("findByTitle/{title}")]
        public IHttpActionResult FindbyTitle(string title = "")
        {
            return Ok(LibraryService.SearchMovies(title));
        }
    }

}
