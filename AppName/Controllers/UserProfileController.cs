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
        private UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        [Route("GetUserProfile/{id}")]
        //GET : /api/UserProfile/id
        public async Task<Object> GetUserProfile(string id)
        {
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(id);
            return new
            {
                 user.FirstName,
                 user.LastName,
                 user.Email,
                 user.UserName
            };
        }

        [HttpPost]
        [Authorize]
        [Route("Update/{id}")]
        //POST : /api/UserProfile/Update/{id}
        public async Task<Object> Update(ApplicationUserModel model, string id)
        {
            //string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(id);
            
            
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.UserName = model.UserName;
            user.Email = model.Email;
                
            var result = _userManager.UpdateAsync(user);
            return Ok(result);
        }


    }
}