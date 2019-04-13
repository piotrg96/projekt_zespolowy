using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppName.Models;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CityModelsController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public CityModelsController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/CityModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CityModel>>> GetCities()
        {
            return await _context.Cities.ToListAsync();
        }

        // GET: api/CityModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CityModel>> GetCityModel(int id)
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
        public async Task<IActionResult> PutCityModel(int id, CityModel cityModel)
        {
            if (id != cityModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(cityModel).State = EntityState.Modified;

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
        public async Task<ActionResult<CityModel>> PostCityModel(CityModel cityModel)
        {
            _context.Cities.Add(cityModel);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CityModelExists(cityModel.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCityModel", new { id = cityModel.Id }, cityModel);
        }

        // DELETE: api/CityModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CityModel>> DeleteCityModel(int id)
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
