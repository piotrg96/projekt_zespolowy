using AppName.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementsController : ControllerBase
    {
        private readonly AdvertisementContext _context;
        private readonly string _contentRoot;

        public AdvertisementsController(AdvertisementContext context, IHostingEnvironment env)
        {
            _context = context;
            _contentRoot = env.ContentRootPath;
        }

        // GET: api/AdvertisementModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAdvertisement>>> GetAdvertisment()
        {
            List<GetAdvertisement> advertisementList = new List<GetAdvertisement>();
            var ads = await _context.Advertisment.ToListAsync();

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisement(ad.Id, ad.Title, ad.Description, ad.Price, ad.Yardage, ad.PhoneNumber, ad.Username, ad.CategoryName, ad.CategoryId, ad.ProvinceName, ad.ProvinceId, ad.CityName, ad.CityId);
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

            return advertisementList;
        }

        [HttpGet("MyAds")]
        public async Task<ActionResult<IEnumerable<GetAdvertisement>>> GetAdvertisementUsername(string username)
        {
            List<GetAdvertisement> advertisementList = new List<GetAdvertisement>();
            var ads = from s in _context.Advertisment
                      select s;

            ads = ads.Where(a => a.Username == username);

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisement(ad.Id, ad.Title, ad.Description, ad.Price, ad.Yardage, ad.PhoneNumber, ad.Username, ad.CategoryName, ad.CategoryId, ad.ProvinceName, ad.ProvinceId, ad.CityName, ad.CityId);
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

            return advertisementList;
        }

        // GET: api/AdvertisementModels/sort
        [HttpGet("sort")]
        public async Task<ActionResult<IEnumerable<GetAdvertisement>>> SortAdvertisment(string category, string city, string province, string search, string sort, string order, float? maxprice, float? minprice, float? maxyar, float? minyar)
        {
            List<GetAdvertisement> advertisementList = new List<GetAdvertisement>();
            var ads = from s in _context.Advertisment
                      select s;
            string sortOrder = "test";
            if (!string.IsNullOrEmpty(city))
            {
                ads = ads.Where(a => a.CityName == city);
            }

            if (!string.IsNullOrEmpty(province))
            {
                ads = ads.Where(a => a.ProvinceName == province);
            }

            if (!string.IsNullOrEmpty(category))
            {
                ads = ads.Where(a => a.CategoryName == category);
            }

            if (minprice != null)
            {
                ads = ads.Where(a => a.Price > minprice);
            }

            if (maxprice != null)
            {
                ads = ads.Where(a => a.Price < maxprice);
            }

            if (minyar != null)
            {
                ads = ads.Where(a => a.Yardage > minyar);
            }

            if (maxyar != null)
            {
                ads = ads.Where(a => a.Yardage < maxyar);
            }

            if (!string.IsNullOrEmpty(search))
            {
                ads = ads.Where(a => a.Title.Contains(search));
            }


            if (sort == "price" && order == "ascending")
            {
                sortOrder = "price_asc";
            }
            else if (sort == "price" && order == "descending")
            {
                sortOrder = "price_desc";
            }
            else if (sort == "date" && order == "ascending")
            {
                sortOrder = "date_asc";
            }
            else if (sort == "date" && order == "descending")
            {
                sortOrder = "date_desc";
            }
            else if (sort == "yardage" && order == "ascending")
            {
                sortOrder = "yar_asc";
            }
            else if (sort == "yardage" && order == "descending")
            {
                sortOrder = "yar_desc";
            }

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
            foreach (var ad in ads)
            {
                var getad = new GetAdvertisement(ad.Id, ad.Title, ad.Description, ad.Price, ad.Yardage, ad.PhoneNumber, ad.Username, ad.CategoryName, ad.CategoryId, ad.ProvinceName, ad.ProvinceId, ad.CityName, ad.CityId);
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

            return advertisementList;

        }

        // GET: api/AdvertisementModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetAdvertisement>> GetAdvertisementModel(int id)
        {
            var ad = await _context.Advertisment.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            var getad = new GetAdvertisement(ad.Id, ad.Title, ad.Description, ad.Price, ad.Yardage, ad.PhoneNumber, ad.Username, ad.CategoryName, ad.CategoryId, ad.ProvinceName, ad.ProvinceId, ad.CityName, ad.CityId);
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

            return getad;
        }

        // PUT: api/AdvertisementModels
        [HttpPut]
        public async Task<ActionResult<Advertisement>> PutAdvertisementModel(IFormCollection form)
        {
            var id = form["Id"];
            var ad = await _context.Advertisment.FindAsync(id);

            DateTime date1 = DateTime.Now;
            var cat = _context.Categories.FirstOrDefault(c => c.Name == form["categoryName"]);
            var prov = _context.Provinces.FirstOrDefault(c => c.ProvinceName == form["provinceName"]);
            var city = _context.Cities.FirstOrDefault(c => c.CityName == form["cityName"] /* && c.ProvinceId == prov.Id */);

            if (form.Any())
            {
                if (form.Keys.Contains("title"))
                    ad.Title = form["title"];

                if (form.Keys.Contains("description"))
                    ad.Description = form["description"];

                if (form.Keys.Contains("price"))
                    ad.Price = float.Parse(form["price"]);

                if (form.Keys.Contains("yardage"))
                    ad.Yardage = float.Parse(form["yardage"]);

                if (form.Keys.Contains("phone"))
                    ad.PhoneNumber = form["phone"];

                if (form.Keys.Contains("userName"))
                    ad.Username = form["userName"];

                if (form.Keys.Contains("categoryName"))
                    ad.CategoryName = form["categoryName"];

                if (form.Keys.Contains("provinceName"))
                    ad.ProvinceName = form["provinceName"];

                if (form.Keys.Contains("cityName"))
                    ad.CityName = form["cityName"];
            }

            if (cat != null) ad.CategoryId = cat.Id;
            if (prov != null) ad.ProvinceId = prov.Id;
            if (city != null) ad.CityId = city.Id;
            ad.CreationDate = date1;

            _context.Advertisment.Update(ad);
            await _context.SaveChangesAsync();

            var images = _context.Images.Where(a => a.AdvertisementId == id);
            var imagesToDelete = images.ToList();

            foreach (var image in imagesToDelete)
            {
                _context.Images.Remove(image);
            }

            await _context.SaveChangesAsync();

            string path = Path.Combine(_contentRoot.ToString(), "wwwroot", "images");
            Directory.CreateDirectory(path);

            foreach (var file in form.Files)
            {
                var newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(path, newFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var img = new Image { Path = newFileName, AdvertisementId = ad.Id };

                _context.Images.Add(img);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction("GetAdvertisementModel", new { id = ad.Id }, ad);
        }


        // POST: api/AdvertisementModels
        [HttpPost("Uploader")]
        public async Task<ActionResult<Advertisement>> PostAdvertisementModel(IFormCollection form)
        {
            DateTime date1 = DateTime.Now;
            var cat = _context.Categories.FirstOrDefault(c => c.Name == form["categoryName"]);
            var prov = _context.Provinces.FirstOrDefault(c => c.ProvinceName == form["provinceName"]);
            var city = _context.Cities.FirstOrDefault(c => c.CityName == form["cityName"] /* && c.ProvinceId == prov.Id */);

            Advertisement ad = new Advertisement();
            if (form.Any())
            {
                if (form.Keys.Contains("title"))
                    ad.Title = form["title"];

                if (form.Keys.Contains("description"))
                    ad.Description = form["description"];

                if (form.Keys.Contains("price"))
                    ad.Price = float.Parse(form["price"]);

                if (form.Keys.Contains("yardage"))
                    ad.Yardage = float.Parse(form["yardage"]);

                if (form.Keys.Contains("phone"))
                    ad.PhoneNumber = form["phone"];

                if (form.Keys.Contains("userName"))
                    ad.Username = form["userName"];

                if (form.Keys.Contains("categoryName"))
                    ad.CategoryName = form["categoryName"];

                if (form.Keys.Contains("provinceName"))
                    ad.ProvinceName = form["provinceName"];

                if (form.Keys.Contains("cityName"))
                    ad.CityName = form["cityName"];
            }

            if (cat != null) ad.CategoryId = cat.Id;
            if (prov != null) ad.ProvinceId = prov.Id;
            if (city != null) ad.CityId = city.Id;
            ad.CreationDate = date1;

            _context.Advertisment.Add(ad);
            await _context.SaveChangesAsync();

            string path = Path.Combine(_contentRoot.ToString(), "wwwroot", "images");

            Directory.CreateDirectory(path);

            foreach (var file in form.Files)
            {
                var newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(path, newFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var img = new Image { Path = newFileName, AdvertisementId = ad.Id };


                _context.Images.Add(img);
                await _context.SaveChangesAsync();
            }


            return CreatedAtAction("GetAdvertisementModel", new { id = ad.Id }, ad);
        }


        // POST: api/AdvertisementModels/PostImages
        [HttpPost("PostImages")]
        public async Task<ActionResult<Image>> PostAdvertisementImages(IFormFile file)
        {
            string path = Path.Combine(_contentRoot.ToString(), "images");

            Directory.CreateDirectory(path);

            var newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            var filePath = Path.Combine(path, newFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            //}
            var img = new Image { Path = filePath, AdvertisementId = 1234 };

            _context.Images.Add(img);
            await _context.SaveChangesAsync();

            return Ok();
        }


        // DELETE: api/AdvertisementModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Advertisement>> DeleteAdvertisementModel(int id)
        {
            var advertisementModel = await _context.Advertisment.FindAsync(id);
            var favAd = _context.FavoriteAds.Where(a => a.AdvertisementId == id);
            if (advertisementModel == null)
            {
                return NotFound();
            }

            foreach (var ad in favAd)
            {
                _context.FavoriteAds.Remove(ad);
            }

            var images = _context.Images.Where(a => a.AdvertisementId == advertisementModel.Id);
            var imagesToDelete = images.ToList();

            foreach (var image in imagesToDelete)
            {
                _context.Images.Remove(image);
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