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
    public class FavoriteAdsController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public FavoriteAdsController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/FavoriteAds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FavoriteAds>>> GetFavoriteAds()
        {
            return await _context.FavoriteAds.ToListAsync();
        }

        // GET: api/FavoriteAds/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteAds>> GetFavoriteAds(int id)
        {
            var favoriteAds = await _context.FavoriteAds.FindAsync(id);

            if (favoriteAds == null)
            {
                return NotFound();
            }

            return favoriteAds;
        }

        // PUT: api/FavoriteAds/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFavoriteAds(int id, FavoriteAds favoriteAds)
        {
            if (id != favoriteAds.Id)
            {
                return BadRequest();
            }

            _context.Entry(favoriteAds).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FavoriteAdsExists(id))
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

        // POST: api/FavoriteAds
        [HttpPost]
        public async Task<ActionResult<FavoriteAds>> PostFavoriteAds(FavoriteAds favoriteAds)
        {
            _context.FavoriteAds.Add(favoriteAds);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFavoriteAds", new { id = favoriteAds.Id }, favoriteAds);
        }

        // DELETE: api/FavoriteAds/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FavoriteAds>> DeleteFavoriteAds(int id)
        {
            var favoriteAds = await _context.FavoriteAds.FindAsync(id);
            if (favoriteAds == null)
            {
                return NotFound();
            }

            _context.FavoriteAds.Remove(favoriteAds);
            await _context.SaveChangesAsync();

            return favoriteAds;
        }

        private bool FavoriteAdsExists(int id)
        {
            return _context.FavoriteAds.Any(e => e.Id == id);
        }
    }
}
