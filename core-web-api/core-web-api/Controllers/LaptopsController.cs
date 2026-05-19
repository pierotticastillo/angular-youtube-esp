using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using core_web_api.Dtos;
using core_web_api.Entities;

namespace core_web_api.Controllers
{
    [Route("api/laptops")]
    [ApiController]
    public class LaptopsController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public LaptopsController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<List<Laptop>> Get()
        {
            return await context.Laptops.AsNoTracking().ToListAsync();
        }

        [HttpGet("{id:int}", Name = "GetLaptopById")]
        public async Task<ActionResult<Laptop>> Get(int id)
        {
            var laptop = await context.Laptops.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id);
            if (laptop == null)
            {
                return NotFound();
            }

            return laptop;
        }

        [HttpPost]
        public async Task<CreatedAtRouteResult> Post([FromBody] LaptopRequest request)
        {
            var laptop = new Laptop { Name = request.Name.Trim() };

            context.Add(laptop);
            await context.SaveChangesAsync();
            return CreatedAtRoute("GetLaptopById", new { id = laptop.Id }, laptop);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] LaptopRequest request)
        {
            var existingLaptop = await context.Laptops.FirstOrDefaultAsync(x => x.Id == id);
            if (existingLaptop == null)
            {
                return NotFound();
            }

            existingLaptop.Name = request.Name.Trim();
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            var deletedRows = await context.Laptops.Where(x => x.Id == id).ExecuteDeleteAsync();
            if (deletedRows == 0)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
