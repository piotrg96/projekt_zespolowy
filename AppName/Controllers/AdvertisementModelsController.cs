using System;
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
        private readonly IHostingEnvironment _env;

        public AdvertisementModelsController(AdvertisementContext context, IHostingEnvironment env)
        {
            _context = context;
            _contentRoot = env.ContentRootPath;
            _env = env;
        }

        // GET: api/AdvertisementModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GetAdvertisementModel>>> GetAdvertisment()
        {
            List<GetAdvertisementModel> AdvertisementList = new List<GetAdvertisementModel>();
            var ads = await _context.Advertisment.ToListAsync();

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisementModel();
                var images = from s in _context.Images
                             select s;
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
                getad.username = ad.username;
                getad.CategoryName = ad.CategoryName;
                getad.CategoryId = ad.CategoryId;
                getad.ProvinceName = ad.ProvinceName;
                getad.ProvinceId = ad.ProvinceId;
                getad.CityName = ad.CityName;
                getad.CityId = ad.CityId;
                getad.CreationDate = ad.CreationDate;
                getad.AdvertisementImages = await images.ToListAsync();
                AdvertisementList.Add(getad);
            }

            return AdvertisementList;
        }

        [HttpGet("MyAds")]
        public async Task<ActionResult<IEnumerable<GetAdvertisementModel>>> GetAdvertismentUsername(string _username)
        {
            List<GetAdvertisementModel> AdvertisementList = new List<GetAdvertisementModel>();
            var ads = from s in _context.Advertisment
                      select s;

            ads = ads.Where(a => a.username == _username);

            foreach (var ad in ads)
            {
                var getad = new GetAdvertisementModel();
                var images = from s in _context.Images
                             select s;
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
                getad.username = ad.username;
                getad.CategoryName = ad.CategoryName;
                getad.CategoryId = ad.CategoryId;
                getad.ProvinceName = ad.ProvinceName;
                getad.ProvinceId = ad.ProvinceId;
                getad.CityName = ad.CityName;
                getad.CityId = ad.CityId;
                getad.CreationDate = ad.CreationDate;
                getad.AdvertisementImages = await images.ToListAsync();
                AdvertisementList.Add(getad);
            }

            return AdvertisementList;
        }

        // GET: api/AdvertisementModels/sort
        [HttpGet("sort")]
        public async Task<ActionResult<IEnumerable<GetAdvertisementModel>>> SortAdvertisment(string category, string city, string province, string search, string sort, string order, float? maxprice, float? minprice, float? maxyar, float? minyar)
        {
            List<GetAdvertisementModel> AdvertisementList = new List<GetAdvertisementModel>();
            var ads = from s in _context.Advertisment
                      select s;
            string sortOrder = "test";
            ///miasto
            if (!string.IsNullOrEmpty(city))
                ads = ads.Where(a => a.CityName == city);
            //wojewodztwo
            if (!string.IsNullOrEmpty(province))
                ads = ads.Where(a => a.ProvinceName == province);
            //wojewodztwo
            if (!string.IsNullOrEmpty(category))
                ads = ads.Where(a => a.CategoryName == category);
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
            if (!string.IsNullOrEmpty(search))
                ads = ads.Where(a => a.Title.Contains(search));

            if (sort == "price" && order == "ascending")
                sortOrder = "price_asc";
            else if (sort == "price" && order == "descending")
                sortOrder = "price_desc";

            else if (sort == "date" && order == "ascending")
                sortOrder = "date_asc";
            else if (sort == "date" && order == "descending")
                sortOrder = "date_desc";
            else if (sort == "yardage" && order == "ascending")

                sortOrder = "yar_asc";
            else if (sort == "yardage" && order == "descending")
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
                var getad = new GetAdvertisementModel();
                var images = from s in _context.Images
                             select s;
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
                getad.username = ad.username;
                getad.CategoryName = ad.CategoryName;
                getad.CategoryId = ad.CategoryId;
                getad.ProvinceName = ad.ProvinceName;
                getad.ProvinceId = ad.ProvinceId;
                getad.CityName = ad.CityName;
                getad.CityId = ad.CityId;
                getad.CreationDate = ad.CreationDate;
                getad.AdvertisementImages = await images.ToListAsync();
                AdvertisementList.Add(getad);
            }

            return AdvertisementList;

        }

        // GET: api/AdvertisementModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<GetAdvertisementModel>> GetAdvertisementModel(int id)
        {
            var ad = await _context.Advertisment.FindAsync(id);

            if (ad == null)
            {
                return NotFound();
            }

            var getad = new GetAdvertisementModel();
            var images = from s in _context.Images
                         select s;
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
            getad.username = ad.username;
            getad.CategoryName = ad.CategoryName;
            getad.CategoryId = ad.CategoryId;
            getad.ProvinceName = ad.ProvinceName;
            getad.ProvinceId = ad.ProvinceId;
            getad.CityName = ad.CityName;
            getad.CityId = ad.CityId;
            getad.CreationDate = ad.CreationDate;
            getad.AdvertisementImages = await images.ToListAsync();

            return getad;
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
        [HttpPost("Uploader")]
        //public async Task<ActionResult<AdvertisementModel>> PostAdvertisementModel(AdvertisementModelCreate _advertisementModel)
        public async Task<ActionResult<AdvertisementModel>> PostAdvertisementModel(IFormCollection form)
        {
            DateTime date1 = DateTime.Now;
            var cat = _context.Categories.FirstOrDefault(c => c.Name == form["categoryName"]);
            var prov = _context.Provinces.FirstOrDefault(c => c.ProvinceName == form["provinceName"]);
            var city = _context.Cities.FirstOrDefault(c => c.CityName == form["cityName"] /* && c.ProvinceId == prov.Id */);
            //List<string> paths = new List<string>();

            AdvertisementModel ad = new AdvertisementModel();
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
                    ad.username = form["userName"];

                if (form.Keys.Contains("categoryName"))
                    ad.CategoryName = form["categoryName"];

                if (form.Keys.Contains("provinceName"))
                    ad.ProvinceName = form["provinceName"];

                if (form.Keys.Contains("cityName"))
                    ad.CityName = form["cityName"];
            }
            ad.CategoryId = cat.Id;
            ad.ProvinceId = prov.Id;
            ad.CityId = city.Id;
            ad.CreationDate = date1;

            //ad.Title = form.title;
            //ad.Description = form.description;
            //ad.Price = form.price;
            //ad.Yardage = form.yardage;
            //ad.PhoneNumber = form.phone;
            //ad.username = form.userName;
            //ad.CategoryName = form.categoryName;
            //ad.CategoryId = cat.Id;
            //ad.ProvinceName = form.provinceName;
            //ad.ProvinceId = prov.Id;
            //ad.CityName = form.cityName;
            //ad.CityId = city.Id;
            //ad.CreationDate = date1;
            //ad.FrontId = form.FrontId;


            _context.Advertisment.Add(ad);
            await _context.SaveChangesAsync();

            string path = Path.Combine(_contentRoot.ToString(), "wwwroot", "images");
            string newFileName;

            Directory.CreateDirectory(path);
            string filePath;

            foreach (var file in form.Files)
            {
                //UploadFile(file);


                newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                filePath = Path.Combine(path, newFileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
                var img = new ImageModel();
                img.Path = newFileName;
               
                img.AdvertisementId = ad.Id;

                _context.Images.Add(img);
                await _context.SaveChangesAsync();
            }


            return CreatedAtAction("GetAdvertisementModel", new { id = ad.Id }, ad);
        }

        


        /// /////////////////////////////////////////////////////////////////////////////////////////////////////



        //[HttpPost("Uploader")]
        //public dynamic Upload(IFormCollection form)
        //{
        //    try
        //    {
        //        Person person = MapFormCollectionToPerson(form);


        //        string path = Path.Combine(_contentRoot.ToString(), "images");
        //        string newFileName;

        //        Directory.CreateDirectory(path);
        //        string filePath;

        //        foreach (var file in form.Files)
        //        {
        //            //UploadFile(file);

                    
        //            newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        //            filePath = Path.Combine(path, newFileName);
        //            using (var stream = new FileStream(filePath, FileMode.Create))
        //            {
        //                file.CopyToAsync(stream);
        //            }
        //            var img = new ImageModel();
        //            img.Path = filePath;
        //            img.AdvertisementId = 1234;

        //            _context.Images.Add(img);
        //            _context.SaveChangesAsync();
        //        }

        //        return new { Success = true };
        //    }
        //    catch (Exception ex)
        //    {
        //        return new { Success = false, ex.Message };
        //    }
        //}

        //private static void UploadFile(IFormFile file)
        //{
        //    if (file == null || file.Length == 0)
        //        throw new Exception("File is empty!");

        //    byte[] fileArray;
        //    using (var stream = file.OpenReadStream())
        //    using (var memoryStream = new MemoryStream())
        //    {
        //        stream.CopyTo(memoryStream);
        //        fileArray = memoryStream.ToArray();
        //    }

        //    //TODO: You can do it what you want with you file, I just skip this step
        //}

        //private static Person MapFormCollectionToPerson(IFormCollection form)
        //{
        //    var person = new Person();
        //    string firstNameKey = "firstName";
        //    string lastNameKey = "lastName";
        //    string phoneNumberKey = "phoneNumber";
        //    if (form.Any())
        //    {
        //        if (form.Keys.Contains(firstNameKey))
        //            person.FirstName = form[firstNameKey];
        //        if (form.Keys.Contains(lastNameKey))
        //            person.LastName = form[lastNameKey];
        //        if (form.Keys.Contains(phoneNumberKey))
        //            person.PhoneNumber = form[phoneNumberKey];
        //    }
        //    return person;
        //}


        ////////////////////////////////////////////////////////////////////////////////////////////


        // POST: api/AdvertisementModels/PostImages
        [HttpPost("PostImages")]
        public async Task<ActionResult<ImageModel>> PostAdvertisementImages(IFormFile file)
        {
            //string FrontId = "12345-43-21-2-3-45";
            //var ad = _context.Advertisment.FirstOrDefault(a => a.FrontId == FrontId);

            string path = Path.Combine(_contentRoot.ToString(), "images");
            string newFileName;

            Directory.CreateDirectory(path);
            string filePath;

            //foreach (var file in model.AdvertisementImages)
            //{
            //newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + file.FileName;
            newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
            filePath = Path.Combine(path, newFileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            //}
            var img = new ImageModel();
            img.Path = filePath;
            img.AdvertisementId = 1234;

            _context.Images.Add(img);
            await _context.SaveChangesAsync();

            return Ok();
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