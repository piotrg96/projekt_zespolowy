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
    public class AdvertisementModelsController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public AdvertisementModelsController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/AdvertisementModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> GetAdvertisment()
        {
            return await _context.Advertisment.ToListAsync();
        }

        // GET: api/AdvertisementModels/sort
        [HttpGet("sort")]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> SortAdvertisment(string sortOrder, string city, string province, string search, float minprice = 0, float maxprice = 99999999, float minyar = 0, float maxyar = 99999999)
        {
            var ads = from s in _context.Advertisment
                      select s;
            ///miasto
            if (city != null)
                ads = ads.Where(a => a.CityName == city);
            //wojewodztwo
            if (province != null)
                ads = ads.Where(a => a.ProvinceName == province);
            //cena
            ads = ads.Where(a => a.Price > minprice || a.Price < maxprice);
            //metraz
            ads = ads.Where(a => a.Yardage > minyar || a.Price < maxyar);
            //wpisana fraza
            ads = ads.Where(a => a.Title.Contains(search));

            switch (sortOrder)
            {
                case "name_desc":
                    ads = ads.OrderByDescending(s => s.Title);
                    break;
                case "price_asc":
                    ads = ads.OrderBy(s => s.Price);
                    break;
                case "price_desc":
                    ads = ads.OrderByDescending(s => s.Price);
                    break;
                case "yar_asc":
                    ads = ads.OrderBy(s => s.Yardage);
                    break;
                case "yar_desc":
                    ads = ads.OrderByDescending(s => s.Yardage);
                    break;
                case "date_asc":
                    ads = ads.OrderBy(s => s.CreationDate);
                    break;
                case "date_desc":
                    ads = ads.OrderByDescending(s => s.CreationDate);
                    break;
                default:
                    ads = ads.OrderBy(s => s.Title);
                    break;
            }

            return await ads.ToListAsync();

        }

        // GET: api/AdvertisementModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertisementModel>> GetAdvertisementModel(int id)
        {
            var advertisementModel = await _context.Advertisment.FindAsync(id);

            if (advertisementModel == null)
            {
                return NotFound();
            }

            return advertisementModel;
        }

        // PUT: api/AdvertisementModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdvertisementModel(int id, AdvertisementModel advertisementModel)
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

        // POST: api/AdvertisementModels
        [HttpPost]
        public async Task<ActionResult<AdvertisementModel>> PostAdvertisementModel(AdvertisementModel advertisementModel)
        {
            _context.Advertisment.Add(advertisementModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdvertisementModel", new { id = advertisementModel.Id }, advertisementModel);
        }

        // DELETE: api/AdvertisementModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdvertisementModel>> DeleteAdvertisementModel(int id)
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

        private bool AdvertisementModelExists(int id)
        {
            return _context.Advertisment.Any(e => e.Id == id);
        }

    }
}