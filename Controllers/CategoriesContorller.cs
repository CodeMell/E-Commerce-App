using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Commy;
using Commy.Models;

namespace Commy.Controllers
{
    public class CategoriesContorller : Controller
    {
        private readonly CommyDBContext _context;

        public CategoriesContorller(CommyDBContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<IEnumerable<Category>> GetCateagories(string name, string description)
        { 
            Category category = null;
        }
        
    }
}
