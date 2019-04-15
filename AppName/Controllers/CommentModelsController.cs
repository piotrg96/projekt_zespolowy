using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AppName.Models;

namespace AppName.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentModelsController : ControllerBase
    {
        private readonly AdvertisementContext _context;

        public CommentModelsController(AdvertisementContext context)
        {
            _context = context;
        }

        // GET: api/CommentModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CommentModel>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/CommentModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CommentModel>> GetCommentModel(int id)
        {
            var commentModel = await _context.Comments.FindAsync(id);

            if (commentModel == null)
            {
                return NotFound();
            }

            return commentModel;
        }

        // PUT: api/CommentModels/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCommentModel(int id, CommentModel commentModel)
        {
            if (id != commentModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(commentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentModelExists(id))
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

        // POST: api/CommentModels
        [HttpPost]
        public async Task<ActionResult<CommentModel>> PostCommentModel(CommentModel commentModel)
        {
            _context.Comments.Add(commentModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentModel", new { id = commentModel.Id }, commentModel);
        }

        // DELETE: api/CommentModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<CommentModel>> DeleteCommentModel(int id)
        {
            var commentModel = await _context.Comments.FindAsync(id);
            if (commentModel == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        private bool CommentModelExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
