using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Commy.Models
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        [ForeignKey("id")]
        public int CategoryID { get; set; }
        public Products(string name, string description, double price, int categoryID) 
        { 
            Name = name;
            Description = description;
            Price = price;
            CategoryID = categoryID;
        }
    }
}
