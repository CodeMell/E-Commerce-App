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
    [ApiController]
    [Route("[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly CommyDBContext _context;

        public CategoriesController(CommyDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<IEnumerable<Category>> Get()
        { 
            var categories = _context.Categories.ToList();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCateagories(string name, string description) 
        {
            Category category = new Category(name, description);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return Ok(category);
        }

        /*[HttpPut]
        public async Task<AcceptedResult> UpdateCategories()
        {

        }

        [HttpDelete]
        public async Task<AcceptedResult> DeleteCategories()
        {

        }*/

    }
}
