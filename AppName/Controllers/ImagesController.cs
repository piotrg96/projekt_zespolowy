using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AppName.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase
    {
        private readonly AdvertisementContext _context;
        private readonly object _contentRoot;

        public ImagesController(AdvertisementContext context, IHostingEnvironment env)
        {
            _context = context;
            _contentRoot = env.ContentRootPath;
        }

        [HttpPost]
        public async Task<IActionResult> Upload(IFormFile file, int id)
        {
            string path = Path.Combine(_contentRoot.ToString(), "images");
            string newFileName = DateTime.Now.Ticks + "_" + Guid.NewGuid().ToString() + file.FileName;
            //string newFileName = file.FileName;

            Directory.CreateDirectory(path);
            var filePath = Path.Combine(path, newFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var image = new ImageModel();
            image.AdvertisementId = id;
            image.Path = filePath;
            _context.Images.Add(image);
            await _context.SaveChangesAsync();

            return Ok(filePath);
        }


    }
}