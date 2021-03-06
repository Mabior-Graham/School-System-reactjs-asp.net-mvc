#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrimarySchool.Data;
using Schsystem.Models;

namespace Schsystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentsApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/StudentsApi
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Students>>> Getstudents()
        {
            return await _context.students.ToListAsync();
        }

        // GET: api/StudentsApi/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Students>> GetStudents(int id)
        {
            var students = await _context.students.FindAsync(id);

            if (students == null)
            {
                return NotFound();
            }

            return students;
        }

        // PUT: api/StudentsApi/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudents(int id, Students students)
        {
            if (id != students.Id)
            {
                return BadRequest();
            }

            _context.Entry(students).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsExists(id))
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

        // POST: api/StudentsApi
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Students>> PostStudents(Students students)
        {
            _context.students.Add(students);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStudents", new { id = students.Id }, students);
        }

        // DELETE: api/StudentsApi/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudents(int id)
        {
            var students = await _context.students.FindAsync(id);
            if (students == null)
            {
                return NotFound();
            }

            _context.students.Remove(students);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StudentsExists(int id)
        {
            return _context.students.Any(e => e.Id == id);
        }
    }
}
