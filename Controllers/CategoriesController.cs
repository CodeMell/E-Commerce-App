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
            // Retrieve a list of all categories from the database and return them
            var categories = _context.Categories.ToList();
            return categories;
        }

        [HttpPost]
        public async Task<ActionResult> CreateCateagories(string name, string description)
        {
            // Create a new category object with the provided name and description
            Category category = new Category(name, description);

            // Add the new category to the database
            _context.Categories.Add(category);

            // Save changes to the database
            _context.SaveChanges();

            // Return a 200 OK response along with the newly created category
            return Ok(category);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category updatedCategory)
        {
            // Find the existing category in the database by its ID
            var existingCategory = await _context.Categories.FindAsync(id);

            // If the category with the specified ID does not exist, return a 404 Not Found response
            if (existingCategory == null)
            {
                return NotFound();
            }

            // Update the existing category's properties with the values from the updatedCategory object
            existingCategory.Name = updatedCategory.Name;
            existingCategory.Description = updatedCategory.Description;

            // Update the category in the database
            _context.Categories.Update(existingCategory);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return a 200 OK response along with the updated category
            return Ok(existingCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            // Find the category to delete in the database by its ID
            var categoryToDelete = await _context.Categories.FindAsync(id);

            // If the category with the specified ID does not exist, return a 404 Not Found response
            if (categoryToDelete == null)
            {
                return NotFound();
            }

            // Remove the category from the database
            _context.Categories.Remove(categoryToDelete);

            // Save changes to the database
            await _context.SaveChangesAsync();

            // Return a 204 No Content response to indicate successful deletion
            return NoContent();
        }



    }
}
