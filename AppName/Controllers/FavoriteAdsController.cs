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

        // GET: api/FavoriteAds/5
        [HttpGet("{UserName}")]
        public async Task<ActionResult<IEnumerable<GetAdvertisementModel>>> GetFavoriteAds(string userName)
        {
            List<GetAdvertisementModel> advertisementList = new List<GetAdvertisementModel>();
            List<AdvertisementModel> ads = new List<AdvertisementModel>();
            var favoriteAds = _context.FavoriteAds.Where(a => a.UserName == userName);

            foreach(var ad in favoriteAds)
            {
                var favAd = _context.Advertisment.Single(a => a.Id == ad.AdvertisementId);

                ads.Add(favAd);
            }

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisementModel();
                var images = from s in _context.Images
                             select s;
                var empty = images.Where(a => a.Path.Contains("placeholder"));
                images = images.Where(a => a.AdvertisementId == ad.Id);

                getad.Category = ad.Category;
                getad.Province = ad.Province;
                getad.City = ad.City;
                getad.Id = ad.Id;
                getad.Title = ad.Title;
                getad.Description = ad.Description;
                getad.Price = ad.Price;
                getad.Yardage = ad.Yardage;
                getad.PhoneNumber = ad.PhoneNumber;
                getad.Username = ad.Username;
                getad.CategoryName = ad.CategoryName;
                getad.CategoryId = ad.CategoryId;
                getad.ProvinceName = ad.ProvinceName;
                getad.ProvinceId = ad.ProvinceId;
                getad.CityName = ad.CityName;
                getad.CityId = ad.CityId;
                getad.CreationDate = ad.CreationDate;
                getad.AdvertisementImages = await images.ToListAsync();
                if (getad.AdvertisementImages == null || getad.AdvertisementImages.Count == 0)
                {
                    getad.AdvertisementImages = await empty.ToListAsync();
                }
                advertisementList.Add(getad);
            }
          
            return  advertisementList;
        }
    }
}
