using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using AppName.Models;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly AdvertisementContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        
        public UserProfileController(UserManager<ApplicationUser> userManager, AdvertisementContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet]
        [Authorize]
        //GET : /api/UserProfile/id
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                 user.FirstName,
                 user.LastName,
                 user.Email,
                 user.UserName
            };
        }

        [HttpPut]
        [Authorize]
        [Route("Update")]
        //POST : /api/UserProfile/Update
        public async Task<Object> Update(UpdateUserModel model)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            
            
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
                
            var result = await _userManager.UpdateAsync(user);
            return Ok(result);
        }


        [HttpDelete]
        [Authorize]
        [Route("Delete")]
        //POST : /api/UserProfile/Delete
        public async Task<Object> Delete()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var ads = from s in _context.Advertisment
                      select s;

            ads = ads.Where(a => a.username == user.UserName);
            foreach (var ad in ads)
            {
                _context.Advertisment.Remove(ad);
            }
            await _context.SaveChangesAsync();
            var result = _userManager.DeleteAsync(user);
            return Ok(result);
        }

        [HttpPost]
        [Route("ChangePassword")]
        //POST : /api/UserProfile/ChangePassword
        public async Task<ActionResult> ChangePassword(ChangePasswordModel model)
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            
            return Ok(result);
        }


    }
}