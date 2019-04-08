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
    public class AdvertisementModelController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public AdvertisementModelController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/AdvertisementModel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> GetAdvertisment()
        {
            return await _context.Advertisment.ToListAsync();
        }

        // GET: api/AdvertisementModel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertisementModel>> GetAdvertisementModel(Guid id)
        {
            var advertisementModel = await _context.Advertisment.FindAsync(id);

            if (advertisementModel == null)
            {
                return NotFound();
            }

            return advertisementModel;
        }

        // PUT: api/AdvertisementModel/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvertisementModel(Guid id, AdvertisementModel advertisementModel)
        {
            if (id != advertisementModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(advertisementModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdvertisementModelExists(id))
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

        // POST: api/AdvertisementModel
        [HttpPost]
        public async Task<ActionResult<AdvertisementModel>> PostAdvertisementModel(AdvertisementModel advertisementModel)
        {
            _context.Advertisment.Add(advertisementModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdvertisementModel", new { id = advertisementModel.Id }, advertisementModel);
        }

        // DELETE: api/AdvertisementModel/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdvertisementModel>> DeleteAdvertisementModel(Guid id)
        {
            var advertisementModel = await _context.Advertisment.FindAsync(id);
            if (advertisementModel == null)
            {
                return NotFound();
            }

            _context.Advertisment.Remove(advertisementModel);
            await _context.SaveChangesAsync();

            return advertisementModel;
        }

        private bool AdvertisementModelExists(Guid id)
        {
            return _context.Advertisment.Any(e => e.Id == id);
        }
    }
}
