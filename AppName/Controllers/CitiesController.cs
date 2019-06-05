using AppName.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public CitiesController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/CityModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<City>>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }

        // GET: api/CityModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<City>> GetCityModel(int id)
        {
            var cityModel = await _context.Cities.FindAsync(id);

            if (cityModel == null)
            {
                return NotFound();
            }

            return cityModel;
        }

        // PUT: api/CityModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCityModel(int id, City city)
        {
            if (id != city.Id)
            {
                return BadRequest();
            }

            _context.Entry(city).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CityModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CityModels
        [HttpPost]
        public async Task<ActionResult<City>> PostCityModel(City city)
        {
            _context.Cities.Add(city);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CityModelExists(city.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCityModel", new { id = city.Id }, city);
        }

        // DELETE: api/CityModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<City>> DeleteCityModel(int id)
        {
            var cityModel = await _context.Cities.FindAsync(id);
            if (cityModel == null)
            {
                return NotFound();
            }

            _context.Cities.Remove(cityModel);
            await _context.SaveChangesAsync();

            return cityModel;
        }

        private bool CityModelExists(int id)
        {
            return _context.Cities.Any(e => e.Id == id);
        }
    }
}
