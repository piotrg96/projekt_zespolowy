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

       
        // GET: api/FavoriteAds/addOrDelete
        [HttpGet("addOrDelete")]
        public async Task<ActionResult<FavoriteAds>> PostFavoriteAds(string username, int adId)
        {
            FavoriteAds favoriteAds = new FavoriteAds { AdvertisementId = adId, UserName = username };
            var exist = _context.FavoriteAds.FirstOrDefault(a => a.AdvertisementId == adId && a.UserName == username);
            if (exist == null)
            {
                _context.FavoriteAds.Add(favoriteAds);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFavoriteAds", new { id = favoriteAds.Id }, favoriteAds);
            }
            else
            {
                _context.FavoriteAds.Remove(exist);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

        // GET: api/FavoriteAds/userName
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

        // GET: api/FavoriteAds/exists
        [HttpGet("exists")]
        public async Task<ActionResult<FavoriteAds>> GetFavoriteAds(int advertisementId, string userName)
        {
            var favorites = from s in _context.FavoriteAds
                            select s;
            favorites = favorites.Where(a => a.AdvertisementId == advertisementId && a.UserName == userName);
            var favorite = await favorites.FirstOrDefaultAsync();

            if (favorite == null)
            {
                return NotFound();
            }

            return favorite;
        }
    }
}
