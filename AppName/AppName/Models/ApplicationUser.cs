using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace AppName.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName="nvarchar(50)")]
        public string FirstName { get; set; }

    }
}
