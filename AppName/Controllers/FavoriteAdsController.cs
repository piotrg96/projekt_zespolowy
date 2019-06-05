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

       
        // GET: api/FavoriteAd/addOrDelete
        [HttpGet("addOrDelete")]
        public async Task<ActionResult<FavoriteAd>> PostFavoriteAds(string username, int adId)
        {
            FavoriteAd favoriteAd = new FavoriteAd { AdvertisementId = adId, UserName = username };
            var exist = _context.FavoriteAds.FirstOrDefault(a => a.AdvertisementId == adId && a.UserName == username);
            if (exist == null)
            {
                _context.FavoriteAds.Add(favoriteAd);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetFavoriteAds", new { id = favoriteAd.Id }, favoriteAd);
            }
            else
            {
                _context.FavoriteAds.Remove(exist);
                await _context.SaveChangesAsync();

                return Ok();
            }
        }

        // GET: api/FavoriteAd/userName
        [HttpGet("user")]
        public async Task<ActionResult<IEnumerable<GetAdvertisement>>> GetFavoriteAds(string userName)
        {
            List<GetAdvertisement> advertisementList = new List<GetAdvertisement>();
            List<Advertisement> ads = new List<Advertisement>();
            var favoriteAds = _context.FavoriteAds.Where(a => a.UserName == userName);

            foreach(var ad in favoriteAds)
            {
                var favAd = _context.Advertisment.Single(a => a.Id == ad.AdvertisementId);

                ads.Add(favAd);
            }

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisement(ad.Id, ad.Title, ad.Description,  ad.Price, ad.Yardage, ad.PhoneNumber, ad.Username, ad.CategoryName, ad.CategoryId,ad.ProvinceName,ad.ProvinceId, ad.CityName, ad.CityId);
                var images = from s in _context.Images
                             select s;
                var empty = new Image { Path = "placeholder.png", AdvertisementId = 999999 };
                images = images.Where(a => a.AdvertisementId == ad.Id);

                getad.Category = ad.Category;
                getad.Province = ad.Province;
                getad.City = ad.City;
                getad.CreationDate = ad.CreationDate;
                getad.AdvertisementImages = await images.ToListAsync();
                if (getad.AdvertisementImages == null || getad.AdvertisementImages.Count == 0)
                {
                    getad.AdvertisementImages.Add(empty);
                }
                advertisementList.Add(getad);
            }
          
            return  advertisementList;
        }

        // GET: api/FavoriteAd/exists
        [HttpGet("exists")]
        public async Task<ActionResult<FavoriteAd>> GetFavoriteAds(int advertisementId, string userName)
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
