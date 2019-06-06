﻿using AppName.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public ProvincesController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/ProvinceModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            return await _context.Provinces.ToListAsync();
        }

        // GET: api/ProvinceModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Province>> GetProvinceModel(int id)
        {
            var provinceModel = await _context.Provinces.FindAsync(id);

            if (provinceModel == null)
            {
                return NotFound();
            }

            return provinceModel;
        }

        // PUT: api/ProvinceModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProvinceModel(int id, Province province)
        {
            if (id != province.Id)
            {
                return BadRequest();
            }

            _context.Entry(province).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinceModelExists(id))
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

        // POST: api/ProvinceModels
        [HttpPost]
        public async Task<ActionResult<Province>> PostProvinceModel(Province province)
        {
            _context.Provinces.Add(province);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ProvinceModelExists(province.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProvinceModel", new { id = province.Id }, province);
        }

        // DELETE: api/ProvinceModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Province>> DeleteProvinceModel(int id)
        {
            var provinceModel = await _context.Provinces.FindAsync(id);
            if (provinceModel == null)
            {
                return NotFound();
            }

            _context.Provinces.Remove(provinceModel);
            await _context.SaveChangesAsync();

            return provinceModel;
        }

        private bool ProvinceModelExists(int id)
        {
            return _context.Provinces.Any(e => e.Id == id);
        }
    }
}