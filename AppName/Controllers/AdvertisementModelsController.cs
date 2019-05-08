using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppName.Models;
using System.IO;

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

        [HttpGet("MyAds")]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> GetAdvertismentUsername(string _username)
        {
            var ads = from s in _context.Advertisment
                      select s;

            ads = ads.Where(a => a.username == _username);

            return await ads.ToListAsync();
        }

        // GET: api/AdvertisementModels/sort
        [HttpPost("sort")]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> SortAdvertisment(Searcher searcher)
        {
            var ads = from s in _context.Advertisment
                      select s;
            string sortOrder = "test";
<<<<<<< HEAD


            ///miasto
            if (!string.IsNullOrEmpty(searcher.city))
                ads = ads.Where(a => a.CityName == searcher.city);
            //wojewodztwo
            if (!string.IsNullOrEmpty(searcher.province))
                ads = ads.Where(a => a.ProvinceName == searcher.province);
            //wojewodztwo
=======
            
            
            ///miasto
            if (!string.IsNullOrEmpty(searcher.city))
                ads = ads.Where(a => a.CityName == searcher.city);
            //wojewodztwo
            if (!string.IsNullOrEmpty(searcher.province))
                ads = ads.Where(a => a.ProvinceName == searcher.province);
            //wojewodztwo
>>>>>>> bc8943b15ab43ad8f2541b6d4ca6e0c5a0351369
            if (!string.IsNullOrEmpty(searcher.category))
                ads = ads.Where(a => a.CategoryName == searcher.category);
            //cena
            if (searcher.minprice != null)
                ads = ads.Where(a => a.Price > searcher.minprice);
            if (searcher.maxprice != null)
                ads = ads.Where(a => a.Price < searcher.maxprice);
            //metraz
            if (searcher.minyar != null)
                ads = ads.Where(a => a.Yardage > searcher.minyar);
            if (searcher.maxyar != null)
                ads = ads.Where(a => a.Yardage < searcher.maxyar);
            //wpisana fraza
            if (!string.IsNullOrEmpty(searcher.search))
                ads = ads.Where(a => a.Title.Contains(searcher.search));
<<<<<<< HEAD

=======
            
>>>>>>> bc8943b15ab43ad8f2541b6d4ca6e0c5a0351369
            if (searcher.sort == "price" && searcher.order == "ascending")
                sortOrder = "price_asc";
            else if (searcher.sort == "price" && searcher.order == "descending")
                sortOrder = "price_desc";
<<<<<<< HEAD
            else if (searcher.sort == "date" && searcher.order == "ascending")
                sortOrder = "date_asc";
            else if (searcher.sort == "date" && searcher.order == "descending")
                sortOrder = "date_desc";
            else if (searcher.sort == "yardage" && searcher.order == "ascending")
=======
            else if(searcher.sort == "date" && searcher.order == "ascending")
                sortOrder = "date_asc";
            else if(searcher.sort == "date" && searcher.order == "descending")
                sortOrder = "date_desc";
            else if(searcher.sort == "yardage" && searcher.order == "ascending")
>>>>>>> bc8943b15ab43ad8f2541b6d4ca6e0c5a0351369
                sortOrder = "yar_asc";
            else if (searcher.sort == "yardage" && searcher.order == "descending")
                sortOrder = "yar_desc";

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
<<<<<<< HEAD
                case "date_asc":
                    ads = ads.OrderBy(s => s.CreationDate);
                    break;
                case "date_desc":
                    ads = ads.OrderByDescending(s => s.CreationDate);
                    break;
=======
               case "date_asc":
                   ads = ads.OrderBy(s => s.CreationDate);
                   break;
               case "date_desc":
                   ads = ads.OrderByDescending(s => s.CreationDate);
                   break;
>>>>>>> bc8943b15ab43ad8f2541b6d4ca6e0c5a0351369
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
        public async Task<IActionResult> PutAdvertisementModel(int id, AdvertisementModelCreate _advertisementModel)
        {
            var ad = await _context.Advertisment.FindAsync(id);

            DateTime date1 = DateTime.Now;
            var cat = _context.Categories.FirstOrDefault(c => c.Name == _advertisementModel.categoryName);
            var prov = _context.Provinces.FirstOrDefault(c => c.ProvinceName == _advertisementModel.provinceName);
            var city = _context.Cities.FirstOrDefault(c => c.CityName == _advertisementModel.cityName && c.ProvinceId == prov.Id);

            ad.Title = _advertisementModel.title;
            ad.Description = _advertisementModel.description;
            ad.Price = _advertisementModel.price;
            ad.Yardage = _advertisementModel.yardage;
            ad.PhoneNumber = _advertisementModel.phone;
            ad.username = _advertisementModel.userName;
            ad.CategoryName = _advertisementModel.categoryName;
            ad.CategoryId = cat.Id;
            ad.ProvinceName = _advertisementModel.provinceName;
            ad.ProvinceId = prov.Id;
            ad.CityName = _advertisementModel.cityName;
            ad.CityId = city.Id;
            ad.CreationDate = date1;

            _context.Update(ad);

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
        public async Task<ActionResult<AdvertisementModel>> PostAdvertisementModel(AdvertisementModelCreate _advertisementModel)
        {
            DateTime date1 = DateTime.Now;
            var cat = _context.Categories.FirstOrDefault(c => c.Name == _advertisementModel.categoryName);
            var prov = _context.Provinces.FirstOrDefault(c => c.ProvinceName == _advertisementModel.provinceName);
            var city = _context.Cities.FirstOrDefault(c => c.CityName == _advertisementModel.cityName /* && c.ProvinceId == prov.Id */);

            AdvertisementModel ad = new AdvertisementModel();
            ad.Title = _advertisementModel.title;
            ad.Description = _advertisementModel.description;
            ad.Price = _advertisementModel.price;
            ad.Yardage = _advertisementModel.yardage;
            ad.PhoneNumber = _advertisementModel.phone;
            ad.username = _advertisementModel.userName;
            ad.CategoryName = _advertisementModel.categoryName;
            ad.CategoryId = cat.Id;
            ad.ProvinceName = _advertisementModel.provinceName;
            ad.ProvinceId = prov.Id;
            ad.CityName = _advertisementModel.cityName;
            ad.CityId = city.Id;
            ad.CreationDate = date1;


            _context.Advertisment.Add(ad);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdvertisementModel", new { id = ad.Id }, ad);
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
        
        //[HttpPost("UploadFiles")]
        //public async Task<IActionResult> Post(List<IFormFile> files)
        //{
        //    long size = files.Sum(f => f.Length);

        //    // full path to file in temp location
        //    var filePath = Path.GetTempFileName();

        //    foreach (var formFile in files)
        //    {
        //        if (formFile.Length > 0)
        //        {
        //            using (var stream = new FileStream(filePath, FileMode.Create))
        //            {
        //                await formFile.CopyToAsync(stream);
        //            }
        //        }
        //    }

        //    // process uploaded files
        //    // Don't rely on or trust the FileName property without validation.

        //    return Ok(new { count = files.Count, size, filePath });
        //}

    }


}