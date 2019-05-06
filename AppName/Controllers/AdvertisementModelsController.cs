﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppName.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementModelsController : ControllerBase
    {
        private readonly AdvertisementContext _context;
        private readonly string _contentRoot;

        public AdvertisementModelsController(AdvertisementContext context, IHostingEnvironment env)
        {
            _context = context;
            _contentRoot = env.ContentRootPath;
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
        [HttpGet("sort")]
        public async Task<ActionResult<IEnumerable<AdvertisementModel>>> SortAdvertisment(string sortOrder, string city, string province, string search, float? minprice, float? maxprice, float? minyar, float? maxyar)
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
            if (minprice != null)
                ads = ads.Where(a => a.Price > minprice);
            if (maxprice != null)
                ads = ads.Where(a => a.Price < maxprice);
            //metraz
            if (minyar != null)
                ads = ads.Where(a => a.Yardage > minyar);
            if (maxyar != null)
                ads = ads.Where(a => a.Yardage < maxyar);
            //wpisana fraza
            if (search != null)
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
               // case "date_asc":
                   // ads = ads.OrderBy(s => s.CreationDate);
                   // break;
               // case "date_desc":
                   // ads = ads.OrderByDescending(s => s.CreationDate);
                   // break;
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